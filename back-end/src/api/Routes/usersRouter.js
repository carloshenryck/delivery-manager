const { Router } = require('express');
const { allUsers, removeUser } = require('../controller/usersController');
const validationToken = require('../middlewares/tokenValidation');

const user = Router();

user.get('/', allUsers);
user.delete('/:id', validationToken, removeUser)

module.exports = user;