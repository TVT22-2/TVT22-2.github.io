const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

const {addenduser, getUsers, getNamedUsers} = require('../postgre/login');

router.get('/', async (req, res) => {
    try {
        res.json(await getUsers());    
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
router.post('/register', async (req, res) => {
   
});

module.exports = router;