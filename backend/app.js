require('dotenv').config();
const cors = require('cors');
const express = require('express');
var loginRouter = require('./routes/loginrouter');
var groupRouter = require('./routes/grouprouter');
var ReviewRouter = require('./routes/reviewrouter');
var PostsRouter = require('./routes/postsrouter');
var FavoritesRouter = require('./routes/favoritesrouter');
var app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/login', loginRouter);
app.use('/', groupRouter);
app.use('/', ReviewRouter);
app.use('/post', PostsRouter);
app.use('/favorites', FavoritesRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log("Server is running on port " + PORT)
});
