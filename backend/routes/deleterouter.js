const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'upload/' });
const { Removeuser, RemoveReview } = require('../postgre/delete.js');

router.delete('/delete', async (req, res) => {
    let id = req.body.userid;
    let response = await Removeuser(id);
    console.log(req.body)
    if(response){
        res.status(200).json({rows: response});
    } else {
        res.status(500);
    }
});

router.delete('/deleteReview', async (req, res) => {
    let id = req.body.userid;
    let reviewid = req.body.reviewid;
    let response = await RemoveReview(id, reviewid);
    console.log(req.body)
    if(response){
        res.status(200).json({rows: response});
    } else {
        res.status(500);
    }
});

module.exports = router;