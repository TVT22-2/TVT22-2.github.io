const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'upload/' });

const {addGroup, getGroups, getUserGroups} = require('../postgre/group');

router.get('/getGroups', async (req,res) => {
    try{
        res.json(await getGroups());
    } catch (error){
        res.status(500).json({error: error.message})
    }
});

router.post('/addGroup', async (req,res) => {
    const gname = req.body.name;
    const desc = req.body.description;

    try {
        await addGroup(gname, desc);
        res.status(201).json({ message: 'Group added successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to add group' });
      }
});

router.get('/getUserGroups', async (req,res) => {
    try{
        res.json(await getUserGroups());
    } catch (error){
        res.status(500).json({error: error.message})
    }
});

module.exports = router;