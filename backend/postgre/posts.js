const pgPool = require("./connection")

const sql = {
    GET_POST: 'SELECT * from posts',
    GET_POST_BY_USER: 'SELECT * from posts WHERE end_user_id=($1)',
    GET_POST_BY_GROUP: 'SELECT * from posts WHERE group_id=($1)',
    GET_POSTS_BY_DATE_USER: 'SELECT * from posts WHERE end_user_id=($1) order by date DESC',
    GET_POSTS_BY_DATE_GROUP: 'SELECT * from posts WHERE group_id=($1) order by date DESC',
    INSERT_POST_USER: 'INSERT INTO posts (title, posttext, date, end_user_id) values ($1, $2, $3, $4)',
    INSERT_POST_GROUP: 'INSERT INTO posts (title, posttext, date, group_id) values ($1, $2, $3, $4)',
}

//TESTING
//getPost();
//getPostByUser();
//getPostByGroup();
//getPostsByDateUser();
//getPostsByDateGroup();
//insertPostUser("test", "test", "2019-04-01", 1);
//insertPostGroup("test", "test", "2019-04-01", 1);

async function getPost(){
    const result = await pgPool.query(sql.GET_POST);
    const rows = result.rows;
    console.log(rows);
    return rows;
}

async function getPostByUser(end_user_id){
    const result = await pgPool.query(sql.GET_POST_BY_USER, [end_user_id]);
    const rows = result.rows;
    console.log(rows);
    return rows;
}

async function getPostByGroup(group_id){
    const result = await pgPool.query(sql.GET_POST_BY_GROUP, [group_id]);
    const rows = result.rows;
    console.log(rows);
    return rows;
}

async function getPostsByDateUser(end_user_id){
    const result = await pgPool.query(sql.GET_POSTS_BY_DATE_USER, [end_user_id]);
    const rows = result.rows;
    console.log(rows);
    return rows;
}

async function getPostsByDateGroup(group_id){
    const result = await pgPool.query(sql.GET_POSTS_BY_DATE_GROUP, [group_id]);
    const rows = result.rows;
    console.log(rows);
    return rows;
}

async function insertPostUser(title, posttext, date, end_user_id){
    await pgPool.query(sql.INSERT_POST_USER, [title, posttext, date, end_user_id])
}

async function insertPostGroup(title, posttext, date, group_id){
    await pgPool.query(sql.INSERT_POST_GROUP, [title, posttext, date, group_id])
}

module.exports = {getPost, getPostByUser, getPostByGroup, getPostsByDateUser, getPostsByDateGroup, insertPostUser, insertPostGroup};
