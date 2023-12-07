const router = require('express').Router();

const {addGroup, getGroups, getUserGroups, addUserToGroup} = require('../postgre/group');

router.get('/Groups', async (req,res) => {
    try{
        res.json(await getGroups());
    } catch (error){
        res.status(500).json({error: error.message})
    }
});

router.post('/Groups', async (req,res) => {
    const gname = req.body.name;
    const desc = req.body.description;
    const owner = req.body.ownerid;

    try {
        const groupid = await addGroup(gname, desc, owner);
        await addUserToGroup(owner,groupid);
        res.status(201).json({ message: 'Group added successfully'});
      } catch (error) {
        res.status(500).json({ error: 'Failed to add group' });
      }
});

router.get('/Groups/:id', async (req,res) => {
    try{
        res.json(await getUserGroups(req.params.id));
    } catch (error){
        res.status(500).json({error: error.message})
    }
});

module.exports = router;