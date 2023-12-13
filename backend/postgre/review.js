const pgPool = require('./connection.js');

const sql = {
    INSERT_REVIEW: 'INSERT INTO review (content,date,review,iduser,idmovie) VALUES ($1,$2,$3,$4,$5)',
    INSERT_FAVORITE: 'INSERT INTO favorites (user_id,movie_id) VALUES ($1,$2)',
    DELETE_FAVORITE: 'DELETE FROM favorites WHERE user_id = ($1) and movie_id = ($2)',
    CHECK_FAVORITE: 'SELECT * FROM favorites WHERE user_id = ($1) and movie_id = ($2)',
    GET_RECENT_REVIEW: 'SELECT * FROM review ORDER BY date DESC LIMIT 5',
    GET_OWN_REVIEWS: 'SELECT * FROM review WHERE iduser = ($1)',
    GET_MOVIE_REVIEW: 'SELECT * FROM review where idmovie = ($1) ORDER BY date DESC',
    GET_MOVIE_REVIEW_BY_RATING: 'SELECT * FROM review where idmovie = ($1) ORDER BY review DESC'
    GET_OWN_REVIEWS_BY_DATE: 'SELECT * FROM review WHERE iduser = ($1) ORDER BY date DESC',
    GET_MOVIE_REVIEW: 'SELECT * FROM review where idmovie = ($1) ORDER BY date DESC'
}

async function addReview(content,date,review,iduser,idmovie){
    await pgPool.query(sql.INSERT_REVIEW, [content,date,review,iduser,idmovie])
}

async function addFavorite(user_id,movie_id){
    await pgPool.query(sql.INSERT_FAVORITE, [user_id,movie_id])
}

async function deleteFavorite(user_id,movie_id){
    await pgPool.query(sql.DELETE_FAVORITE, [user_id,movie_id])
}

async function checkFavorites(user_id, movie_id) {
    const result = await pgPool.query(sql.CHECK_FAVORITE, [user_id, movie_id]);
    return result.rows.length > 0;
}

async function getRecentReview(){
    const result = await pgPool.query(sql.GET_RECENT_REVIEW);
    const rows = result.rows;
    return rows;
}

async function getOwnReview(iduser){
    const result = await pgPool.query(sql.GET_OWN_REVIEWS, [iduser]);
    const rows = result.rows;
    return rows;

}

async function getOwnReviewByDate(iduser){
    const result = await pgPool.query(sql.GET_OWN_REVIEWS_BY_DATE, [iduser]);
    const rows = result.rows;
    return rows;

}

async function getMovieReview(idmovie){
    const result = await pgPool.query(sql.GET_MOVIE_REVIEW, [idmovie]);
    const rows = result.rows;
    return rows;
}

async function getMovieReviewByRating(idmovie){
    const result = await pgPool.query(sql.GET_MOVIE_REVIEW_BY_RATING, [idmovie]);
    const rows = result.rows;
    return rows;
}


module.exports = {addReview, addFavorite, getRecentReview, getOwnReview, getMovieReview, deleteFavorite, checkFavorites, getMovieReviewByRating};