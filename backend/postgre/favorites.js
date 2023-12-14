const pgPool = require('./connection');

const sql = {
    GET_FAVORITES_BY_USER: ' SELECT * from favorites WHERE user_id= ($1) ',
    INSERT_FAVORITES_BY_USER: 'INSERT INTO favorites (user_id, movie_id) values ($1, $2)',
}

async function getFavoritesByUser(user_id) {
    const result = await pgPool.query(sql.GET_FAVORITES_BY_USER, [user_id]);
    const rows = result.rows;
    return rows;
}

async function insertFavoritesUser(user_id, movie_id){
    await pgPool.query(sql.INSERT_FAVORITES_BY_USER, [user_id, movie_id])
}

module.exports = { getFavoritesByUser, insertFavoritesUser };