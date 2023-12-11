const router = require('express').Router();

const {addGroup, getGroups, getUserGroups, addUserToGroup, getGroupById, getUsersFromGroup, getUsernamesFromGroup, removeUserFromGroup, getOwnerName} = require('../postgre/group');

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

router.get('/Groupspage/:id', async (req,res) => {
    try{
        res.json(await getGroupById(req.params.id));
    } catch (error){
        res.status(500).json({error: error.message})
    }

});

router.get('/Groupuser/:id', async (req,res) => {
    try{
        const usersFromGroup = await getUsersFromGroup(req.params.id);
        const userIDsInGroup = usersFromGroup.map(user => user.user_iduser);
        res.json(userIDsInGroup);
    }catch (error){
        res.status(500).json({error: error.message})
    }

});

router.get('/GetUsers/:id', async (req,res) => {
    try{
        const usernamesFromGroup = await getUsernamesFromGroup(req.params.id);
        const usernamesInGroup = usernamesFromGroup.map(end_user => end_user.username);
        res.json(usernamesInGroup);
    } catch (error){
        res.status(500).json({error: error.message})
    }
});

router.delete('/removeUserFromGroup/:username/:groups_idgroups', async (req, res) => {
    const { username, groups_idgroups } = req.params;
  
    try {
      const rowsDeleted = await removeUserFromGroup(username, groups_idgroups);
      res.status(200).json({ message: `Deleted ${rowsDeleted} row(s)` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/GetUsernames/:id', async (req,res) => {
    try{
        const usernamesFromGroup = await getUsernamesFromGroup(req.params.id);
        const usernamesInGroup = usernamesFromGroup.map(user => user.username);
        res.json(usernamesInGroup);
    } catch (error){
        res.status(500).json({error: error.message})
    }
});

router.get('/ownerUsername/:groupid', async (req, res) => {
    const { groupid } = req.params;
  
    try {
      const ownerUsername = await getOwnerName(groupid);
      res.status(200).json({ ownerUsername });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;