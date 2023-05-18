const express = require('express');
require('express-async-errors');
const cors = require('cors');
const cards = require('./Routes/cardsRouter');
const login = require('./Routes/LoginRouter');
const register = require('./Routes/registerRouter');
const sale = require('./Routes/saleRouter');
const users = require('./Routes/usersRouter');

const app = express();
app.use(cors());
app.use(express.static('public'));

app.use(express.json());

app.use('/login', login);
app.use('/register', register);
app.use('/customer', cards);
app.use('/sale', sale);
app.use('/user', users);

app.use((err, req, res, _next) => res.status(err.status).json({ message: err.message }));

module.exports = app;
