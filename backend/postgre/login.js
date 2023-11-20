const pgPool = require("./connection.js")

const sql = {
    INSERT_USER: 'INSERT INTO end_user (username,password) values ($1, $2)',
    GET_USERS: 'SELECT * from end_user',
    GET_NUSERS: 'SELECT password from end_user WHERE username=($1)'
}
async function addenduser(uname, pw){
    await pgPool.query(sql.INSERT_USER, [uname,pw]);
}
async function getUsers(){
    const result = await pgPool.query(sql.GET_USERS);
    const rows =  result.rows;
    return rows;
}
async function getNamedUsers(name){
    const result = await pgPool.query(sql.GET_NUSERS,[name]);     
    if(result.rows.length > 0){
       return result.rows[0].password;
    } else {
       return null;
    }
}

module.exports = {addenduser, getUsers,getNamedUsers};