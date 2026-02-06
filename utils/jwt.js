let jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
    try {
        if(user){
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
            return token;
        }
        return null;
    } catch (error) {
    }
}

const verifyToken = (token) => {
    if(token){
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }
    return false;
}

module.exports = {generateToken, verifyToken};