const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'upload/' });

const { getFavoritesByUser, insertFavoritesUser} = require('../postgre/favorites');

router.get('/:id', async (req, res) => {
    try {
        res.json(await getFavoritesByUser(req.params.id));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/addFavorite', async (req, res) => {
    const user_id = req.body.user_id;
    const movie_id = req.body.movie_id;

    try {
        await insertFavoritesUser(user_id, movie_id);
        res.status(200).send('InsertFavorites added successfully');
    } catch (error) {
        res.status(500).send('InsertFavorites failed to add');
    }
});

module.exports = router;