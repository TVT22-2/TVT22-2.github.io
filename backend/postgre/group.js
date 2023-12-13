const pgPool = require("./connection.js")

const sql = {
  INSERT_GROUP: 'INSERT INTO groups (name,description,ownerid) values ($1, $2, $3) RETURNING id',
  INSERT_USER_HAS_GROUP: 'INSERT INTO user_has_groups (user_iduser,groups_idgroups,request) values ($1, $2, $3)',
  GET_GROUPS: 'SELECT * from groups ORDER BY name ASC',
  GET_USER_GROUPS: 'SELECT g.id,name,description,ownerid from groups g INNER JOIN user_has_groups uhg ON g.id = uhg.groups_idgroups WHERE user_iduser = ($1) and request = true ORDER BY name ASC',
  GET_GROUP_BY_ID: 'SELECT * from groups where id=($1)',
  GET_USERS_FROM_GROUP: 'SELECT * FROM user_has_groups WHERE groups_idgroups =($1) AND request = true',
  GET_USERNAMES_FROM_GROUP: 'SELECT username FROM end_user e JOIN user_has_groups u ON e.id = u.user_iduser WHERE u.groups_idgroups = ($1) AND request = true',
  REMOVE_USER_FROM_GROUP: 'DELETE FROM user_has_groups WHERE user_iduser IN ( SELECT id FROM end_user WHERE username = $1 ) AND groups_idgroups = $2',
  GET_USERNAMES_FROM_GROUP_TEST: 'SELECT e.username, u.user_iduser FROM end_user e JOIN user_has_groups u ON e.id = u.user_iduser WHERE u.groups_idgroups = ($1)',
  GET_OWNER_USERNAME: 'SELECT end_user.username FROM end_user JOIN groups ON end_user.id = groups.ownerid WHERE groups.id = $1',
  INSERT_JOIN_REQUEST: 'INSERT INTO user_has_groups (user_iduser,groups_idgroups,request) values ($1, $2, $3)',
  REQUEST_ASSESSED: 'UPDATE user_has_groups SET request = ($1) WHERE user_iduser = ($2) and groups_idgroups = ($3)',
  GET_USER_FROM_ID: 'SELECT username from end_user WHERE id = ($1)',
  GET_REQUESTS: 'SELECT * FROM user_has_groups uhg JOIN end_user eu ON uhg.user_iduser = eu.id WHERE groups_idgroups = ($1) AND request = false'
}

async function addGroup(gname, desc, owner) {
  const result = await pgPool.query(sql.INSERT_GROUP, [gname, desc, owner]);
  const groupid = result.rows[0].id;
  return groupid;
}

async function getGroups() {
  const result = await pgPool.query(sql.GET_GROUPS);
  const rows = result.rows;
  return rows;
}
async function getUserGroups(end_user_id) {
  const result = await pgPool.query(sql.GET_USER_GROUPS, [end_user_id]);
  const rows = result.rows;
  return rows;
}

async function addUserToGroup(userid, groupid, value) {
  await pgPool.query(sql.INSERT_USER_HAS_GROUP, [userid, groupid, value])
}

async function joinRequest(userid, groupid, value) {
  await pgPool.query(sql.INSERT_USER_HAS_GROUP, [userid, groupid, value])
}

async function getGroupById(groupid) {
  const result = await pgPool.query(sql.GET_GROUP_BY_ID, [groupid])
  const rows = result.rows;
  return rows;
}

async function getUsersFromGroup(groupid) {
  const result = await pgPool.query(sql.GET_USERS_FROM_GROUP, [groupid])
  const rows = result.rows;
  return rows;
}

async function getUsernamesFromGroup(groupid) {
  const result = await pgPool.query(sql.GET_USERNAMES_FROM_GROUP, [groupid])
  const rows = result.rows;
  return rows;
}

async function removeUserFromGroup(username, groupid) {
  try {
    const result = await pgPool.query(sql.REMOVE_USER_FROM_GROUP, [username, groupid]);
    return result.rowCount;
  } catch (error) {
    console.error('Error removing user from group:', error);
    throw new Error('Failed to remove user from group');
  }
}

async function getOwnerName(groupid) {
  try {
    const result = await pgPool.query(sql.GET_OWNER_USERNAME, [groupid]);
    return result.rows[0].username;
  } catch (error) {
    console.error('Error fetching owner username:', error);
    throw new Error('Failed to fetch owner username');
  }
}

async function requestAssessed(value, userid, groupid, username) {
  console.log(value);
  await pgPool.query(sql.REQUEST_ASSESSED, [value, userid, groupid]);

}

async function getUsernameFromID(userid){
  const result = await pgPool.query(sql.GET_USER_FROM_ID, [userid]);
  const rows = result.rows[0];
  return rows.username;
}

async function getRequests(groupid){
  const result = await pgPool.query(sql.GET_REQUESTS, [groupid]);
  const rows = result.rows;
  return rows;
}
module.exports = { addGroup, getGroups, getUserGroups, addUserToGroup, getGroupById, getUsersFromGroup, getUsernamesFromGroup, removeUserFromGroup, getOwnerName, joinRequest, requestAssessed, getUsernameFromID, getRequests};