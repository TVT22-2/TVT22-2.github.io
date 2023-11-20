const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'upload/' });
const bcrypt = require('bcrypt');
const jwebtoken = require('jsonwebtoken');
const { createToken } = require('../auth');
const { addenduser, getUsers, getNamedUsers } = require('../postgre/login');


router.get('/', async (req, res) => {
    try {
        res.json(await getUsers());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/register', async (req, res) => {
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
router.post('/login', upload.none(), async (req, res) => {
    const name = req.body.username;
    const pw = req.body.password;
    console.log(req.body.username + " / " + req.body.password);
    const pwCheck = await getNamedUsers(name);
    if (pwCheck) {
        const boolcorrect = await bcrypt.compare(pw, pwCheck);
        if (boolcorrect) {
            const token = createToken(name);
            res.status(200).json({ jwtToken: token });
        } else {
            res.status(401).json({ error: 'Password or Username incorrect' })
        }
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

module.exports = router;