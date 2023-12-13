const router = require('express').Router();

const {addGroup, getGroups, getUserGroups, addUserToGroup, getGroupById, getUsersFromGroup, getUsernamesFromGroup, removeUserFromGroup, getOwnerName, joinRequest, getUsernameFromID, requestAssessed, getRequests} = require('../postgre/group');

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
        await addUserToGroup(owner,groupid,true);
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

router.post('/joinRequest', async (req,res) => {
    const userid = req.body.userid;
    const groupid = req.body.groupid;

    await joinRequest(userid,groupid,false);
    res.status(200).json();
});

router.put('/joinRequest', async (req,res) =>{
    const userid = req.body.userid;
    const groupid = req.body.groupid;
    const value = req.body.value;
    const username = await getUsernameFromID(userid);
    console.log(value);

    if(value === true){
            requestAssessed(value, userid, groupid, username);
            res.status(200).json();
      }
      else{
            removeUserFromGroup(username,groupid);
            res.status(200).json();
      }
});

router.get('/getUsername', async (req,res) => {
    const userid = req.body.userid;
    console.log(req.body.userid);
    const rows = await getUsernameFromID(userid);
    res.status(200).json({userid:rows});
});

router.get('/getRequests/:groupid', async (req,res) => {
    const groupid = req.params.groupid;
    const rows = await getRequests(groupid);
    res.status(200).json({rows});
})
module.exports = router;