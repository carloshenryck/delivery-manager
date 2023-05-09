require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (obj) => {
    const { password, ...newObj } = obj;
    const token = jwt.sign({ ...newObj }, 'secret_key', {
        expiresIn: '1d',
        algorithm: 'HS256',
    });

    return token;
};

const verifyToken = (token) => {
    try {
        const data = jwt.verify(token, 'secret_key');
        return data;
    } catch (err) {
        const throwError = { status: 401, message: 'Expired or invalid token' };
        throw throwError;
    }
};

module.exports = { verifyToken, generateToken };