const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'upload/' });
const { Removeuser, RemoveReview, RemovePost } = require('../postgre/delete.js');

router.delete('/delete',async (req, res) => {
    let id = req.body.userid;
  if(id){
    await Removeuser(id);
    res.status(200).json({status: 200});
 } else {
    res.status(500);
}
});

router.delete('/deleteReview', async (req, res) => {
    let id = req.body.userid;
    let reviewid = req.body.reviewid;
    let response = await RemoveReview(id, reviewid);
    if(response){
        res.status(200).json({rows: response});
    } else {
        res.status(500);
    }
});

router.delete('/deletePost', async (req, res) => {
    let id = req.body.userid;
    let postid = req.body.postid;
    let response = await RemovePost(id, postid);
    if(response){
        res.status(200).json({rows: response});
    } else {
        res.status(500);
    }
});

module.exports = router;