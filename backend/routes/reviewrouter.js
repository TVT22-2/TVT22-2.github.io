const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'upload/' });

const {getRecentReview, addReview, getMovieReview, getOwnReview} = require('../postgre/review');

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

router.get('/getmoviereview/:idmovie', async (req,res) => {
    try{
        res.json(await getMovieReview(req.params.idmovie));
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

module.exports = router;