require('dotenv').config();
const jwt = require('jsonwebtoken');


function createToken(username){
    return jwt.sign({username: username}, process.env.JWT_KEY);
}

module.exports = {createToken};