const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'upload/' });

const {getRecentReview, addReview, getMovieReview, getOwnReview, getOwnReviewByDate, addFavorite, deleteFavorite, checkFavorites, getMovieReviewByRating} = require('../postgre/review');

router.get('/getrecentreview', async (req,res) => {
    try{
        res.json(await getRecentReview());
    } catch (error){
        res.status(500).json({error: error.message})
    }
});

router.get('/getownreview/:id', async (req,res) => {
    try{
        res.json(await getOwnReview(req.params.id));
    } catch (error){
        res.status(500).json({error: error.message})
    }
});

router.get('/getownreviewbydate/:id', async (req,res) => {
    try{
        res.json(await getOwnReviewByDate(req.params.id));
    } catch (error){
        res.status(500).json({error: error.message})
    }
});


router.get('/getmoviereview/:idmovie', async (req,res) => {
    try{
        res.json(await getMovieReview(req.params.idmovie));
    } catch (error){
        res.status(500).json({error: error.message})
    }
});

router.get('/getmoviereviewbyrating/:idmovie', async (req,res) => {
    try{
        res.json(await getMovieReviewByRating(req.params.idmovie));
    } catch (error){
        res.status(500).json({error: error.message})
    }
});


router.post('/addReview', async (req,res) => {
    const content = req.body.content;
    const date = req.body.date;
    const review = req.body.review;
    const iduser = req.body.iduser;
    const idmovie = req.body.idmovie;

    try {
        await addReview(content, date, review, iduser, idmovie);
        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        // Log the error for debugging
        console.error('Error adding review:', error);
        // Send an error response
        res.status(500).json({ error: 'Failed to add review' });
    }
});


router.post('/addFavorite', async (req,res) => {
    const user_id = req.body.user_id;
    const movie_id = req.body.movie_id;

    try {
        await addFavorite(user_id,movie_id);
        res.status(201).json({ message: 'Favorite added successfully' });
    } catch (error) {
        // Log the error for debugging
        console.error('Error adding favorite:', error);

        // Send an error response
        res.status(500).json({ error: 'Failed to add favorite' });
    }
});

router.delete('/deleteFavorite', async (req, res) => {
    const user_id = req.query.user_id;
    const movie_id = req.query.movie_id;

    try {
        await deleteFavorite(user_id, movie_id);
        res.status(201).json({ message: 'Favorite deleted successfully' });
    } catch (error) {
        // Log the error for debugging
        console.error('Error deleting favorite:', error);

        // Send an error response
        res.status(500).json({ error: 'Failed to delete favorite' });
    }
});

router.get('/checkFavorites', async (req, res) => {
    const user_id = req.query.user_id;
    const movie_id = req.query.movie_id;

    try {
        const isFavorite = await checkFavorites(user_id, movie_id);
        res.json({ isFavorite });
    } catch (error) {
        console.error('Error checking favorites:', error);
        res.status(500).json({ error: 'Failed to check favorites' });
    }
});

module.exports = router;