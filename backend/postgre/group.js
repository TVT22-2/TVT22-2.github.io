const pgPool = require("./connection.js")

const sql = {
    INSERT_GROUP: 'INSERT INTO groups (name,description,ownerid) values ($1, $2, $3) RETURNING id',
    INSERT_USER_HAS_GROUP: 'INSERT INTO user_has_groups (user_iduser,groups_idgroups) values ($1, $2)',
    GET_GROUPS: 'SELECT * from groups ORDER BY name ASC',
    GET_USER_GROUPS: 'SELECT name,description from groups g INNER JOIN user_has_groups uhg ON g.id = uhg.groups_idgroups WHERE user_iduser = ($1) ORDER BY name ASC'
}

async function addGroup(gname, desc, owner){
    const result = await pgPool.query(sql.INSERT_GROUP, [gname,desc,owner]);
    const groupid = result.rows[0].id;
    return groupid;
}

async function getGroups(){
    const result = await pgPool.query(sql.GET_GROUPS);
    const rows =  result.rows;
    return rows;
}
async function getUserGroups(end_user_id){
    const result = await pgPool.query(sql.GET_USER_GROUPS,[end_user_id]);     
    const rows =  result.rows;
    return rows;
}

async function addUserToGroup(userid, groupid){
    await pgPool.query(sql.INSERT_USER_HAS_GROUP, [userid, groupid])
}

module.exports = {addGroup,getGroups, getUserGroups, addUserToGroup};