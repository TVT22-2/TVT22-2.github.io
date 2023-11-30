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

router.get('/getownreview', async (req,res) => {
    try{
        res.json(await getOwnReview());
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
    const gname = req.body.name;
    const desc = req.body.description;

    try {
        await addReview();
        res.status(201).json({ message: 'Review added successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to add review' });
      }
});

module.exports = router;