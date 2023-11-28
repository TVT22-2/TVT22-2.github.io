const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'upload/' });

const { getPost, getPostByUser, getPostByGroup, getPostsByDateUser, getPostsByDateGroup, insertPostUser, insertPostGroup } = require('../postgre/posts');

router.get('/', async (req, res) => {
    try {
        res.json(await getPost());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        res.json(await getPostByUser(req.params.id));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/group/:id', async (req, res) => {
    try {
        res.json(await getPostByGroup(req.params.id));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/userByDate/:id', async (req, res) => {
    try {
        res.json(await getPostsByDateUser(req.params.id));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/groupBydate/:id', async (req, res) => {
    try {
        res.json(await getPostsByDateGroup(req.params.id));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/insertPostUser', async (req, res) => {
    const { title, posttext, date, end_user_id } = req.body;

    try {
        await insertPostUser(title, posttext, date, end_user_id);
        res.status(200).send('PostUser added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('PostUser failed to add');
    }
});

router.post('/insertPostGroup', async (req, res) => {
    const { title, posttext, date, group_id } = req.body;

    try {
        await insertPostGroup(title, posttext, date, group_id);
        res.status(200).send('PostGroup added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('PostGroup failed to add');
    }
});

module.exports = router;
