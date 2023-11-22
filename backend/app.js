require('dotenv').config();
const cors = require('cors');
const express = require('express');
var loginRouter = require('./routes/loginrouter');
var ReviewRouter = require('./routes/reviewrouter');
var app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/login', loginRouter);
app.use('/', ReviewRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log("Server is running on port " + PORT)
});



