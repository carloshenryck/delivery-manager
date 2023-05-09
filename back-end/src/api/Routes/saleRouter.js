const { Router } = require('express');
const { 
    saleController,
    sellersController,
    salesProductsController,
    salesProductsIdController, 
    allSalesController, 
    updateStatusController 
} = require('../controller/salesController');
const validationToken = require('../middlewares/tokenValidation');

const sale = Router();

sale.post('/', validationToken, saleController);
sale.put('/:id', validationToken, updateStatusController);
sale.get('/sellers', sellersController);
sale.get('/allsales', allSalesController);
sale.get('/:id', salesProductsIdController);
sale.get('/', salesProductsController);

module.exports = sale;