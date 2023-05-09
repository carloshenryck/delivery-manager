const salesService = require('../services/salesService');

const saleController = async (req, res) => {
    const arrayProducts = req.body;
    const usuario = req.user;
    const result = await salesService.createSale(arrayProducts, usuario);
    return res.status(201).json({ message: result });
};

const sellersController = async (req, res) => {
    const response = await salesService.sellers();
    return res.status(200).json(response);
};

const salesProductsController = async (req, res) => {
    const response = await salesService.salesProdutcts();
    return res.status(200).json(response);
};

const salesProductsIdController = async (req, res) => {
    const { id } = req.params;
    const response = await salesService.salesProdutctsId(id);
    return res.status(200).json(response);
};

const allSalesController = async (req, res) => {
    const response = await salesService.allSales();
    return res.status(200).json(response);
};

const updateStatusController = async (req, res) => {
    const { id } = req.params;
    const corpo = req.body;
    const response = await salesService.update(corpo, id);
    return res.status(200).json(response);
};

module.exports = { 
    saleController, 
    sellersController,
     salesProductsController,
    salesProductsIdController,
    allSalesController,
    updateStatusController 
};