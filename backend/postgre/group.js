const pgPool = require("./connection.js")

const sql = {
    INSERT_GROUP: 'INSERT INTO groups (name,description) values ($1, $2)',
    GET_GROUPS: 'SELECT * from groups',
    GET_USER_GROUPS: 'SELECT name,description from groups g INNER JOIN user_has_groups uhg ON g.id = uhg.groups_idgroups WHERE user_iduser = ($1);'
}

async function addGroup(gname, desc){
    await pgPool.query(sql.INSERT_GROUP, [gname,desc]);
}
async function getGroups(){
    const result = await pgPool.query(sql.GET_GROUPS);
    const rows =  result.rows;
    //console.log('groups:',rows);
    return rows;
}
async function getUserGroups(end_user_id){
    const result = await pgPool.query(sql.GET_USER_GROUPS,[end_user_id]);     
    const rows =  result.rows;
    //console.log('groups:',rows);
    return rows;
}

module.exports = {addGroup,getGroups, getUserGroups};