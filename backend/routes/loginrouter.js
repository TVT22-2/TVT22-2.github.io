const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'upload/' });
const bcrypt = require('bcrypt');
const jwebtoken = require('jsonwebtoken');
const { createToken } = require('../auth');
const { addenduser, getUsers, getNamedUsers, getNamedRecoverykey,passput } = require('../postgre/login');


router.get('/', async (req, res) => {
    try {
        res.status(200).json(await getUsers());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/register', upload.none(), async (req, res) => {
    const name = req.body.username;
    let pw = req.body.password;
    const rec = req.body.recovery;
    const pwCheck = await getNamedUsers(name);
    if (!pwCheck) {
        const passHash = await bcrypt.hash(pw, 10)
        const recHash = await bcrypt.hash(rec, 10)
        await addenduser(name, passHash, recHash);
        const token = createToken(name);
        res.status(200).json({ jwtToken: token });
    } else {
        res.status(404).json({ error: 'Username already taken' });
    }
});
router.post('/forgot', upload.none(), async (req, res) => {
    const name = req.body.username;
    const rec = req.body.recovery;
    const pwCheck = await getNamedRecoverykey(name);
    if (pwCheck) {
        const boolcorrect = await bcrypt.compare(rec, pwCheck);
        if (boolcorrect) {
            res.status(200).json({ Success: true });
        } else {
            res.status(401).json({ error: 'Recoverykey or Username incorrect' })
        }
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});
router.put('/change', upload.none(), async (req, res) => {
    let pw = req.body.password;
    let name = req.body.username;
    console.log(name   + "/" + pw)
    const passHash = await bcrypt.hash(pw, 10)
    const check = await getNamedUsers(name);
    const passCheck = await bcrypt.compare(pw, check)
    console.log(passCheck);
    if(!passCheck){
        passput(passHash,name);
        res.status(200).json({ Success: true });
    }else{
        res.status(404).json({ error: 'Password same as new password' });
    }

})
router.post('/login', upload.none(), async (req, res) => {
    const name = req.body.username;
    const pw = req.body.password;
    console.log(name + " / " +pw)
    const array = await getNamedUsers(name);
    if(array != null){
    const pwCheck = array[0].password;
    const userId = array[0].id;
    if (pwCheck) {
        const boolcorrect = await bcrypt.compare(pw, pwCheck);
        if (boolcorrect) {
            const token = createToken(name);
            res.status(200).json({ jwtToken: token , UserID: userId });
        } else {
            res.status(401).json({ error: 'Password or Username incorrect' })
        }
    } 
}else {
    res.status(404).json({ error: 'User not found' });
}
});

module.exports = router;