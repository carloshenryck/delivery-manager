const { verifyToken } = require('../../utils/jwt');

const validationToken = (req, _res, next) => {
    const { authorization } = req.headers;
    const data = verifyToken(authorization);
    req.user = data;
    next();
};

module.exports = validationToken;