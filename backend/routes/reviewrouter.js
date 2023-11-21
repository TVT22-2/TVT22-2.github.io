const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'upload/' });

const {getRecentReview, addReview} = require('../postgre/review');

router.get('/', async (req,res) => {
    try{
        res.json(await getRecentReview());
    } catch (error){
        res.status(500).json({error: error.message})
    }
});

router.post('/addReview', async (req,res) => {
    const gname = req.body.name;
    const desc = req.body.description;

    try {
        await addReview(content,date,review,iduser,idmovie);
        res.status(201).json({ message: 'Review added successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to add review' });
      }
});

module.exports = router;