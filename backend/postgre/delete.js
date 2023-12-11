const pgPool = require("./connection.js")

const sql = {
    REMOVE_POST:'DELETE FROM posts WHERE end_user_id=$1',
    REMOVE_USERHAS:'DELETE FROM user_has_groups WHERE user_iduser=$1',
    REMOVE_FAVORITES:'DELETE FROM favorites WHERE user_id=$1',
    REMOVE_REVIEW:'DELETE FROM review WHERE iduser=$1',
    REMOVE_USER: 'DELETE FROM end_user WHERE id=$1'
}
async function Removeuser(id){
    response = await pgPool.query(sql.REMOVE_POST, [id]);
    response = await pgPool.query(sql.REMOVE_USERHAS, [id]);
    response = await pgPool.query(sql.REMOVE_FAVORITES, [id]);
    response = await pgPool.query(sql.REMOVE_REVIEW, [id]); 
    response = await pgPool.query(sql.REMOVE_USER, [id]);
    return results;
}

module.exports = {Removeuser};