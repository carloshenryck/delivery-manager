const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const controller = require('../../api/controller/salesController');
const salesService = require('../../api/services/salesService');
const { returnSales } = require('../services/mocks/Sales.mock');
const {corpo, user, sellerUsers, saleProductAndUser} = require('./mocks/sales.controller.mock');

chai.use(sinonChai);
const { expect } = chai;

describe('Testa os retornos da controller Sales', function () {
    afterEach(sinon.restore);
    it('Retorna corretamente o id da venda', async function() {
        const res = {};
        const req = { body: corpo,  user };

        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns();

        sinon.stub(salesService, 'createSale').resolves(1);
        
        await controller.saleController(req, res);

        expect(res.status.calledWith(201)).to.be.equal(true);
        expect(res.json.calledWith({message: 1})).to.be.equal(true);
    }); 

    it('Retorna todos os vendedores com a role "Seller"', async function() {
        const res = {};
        const req = { };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(salesService, 'sellers').resolves(sellerUsers);
        
        await controller.sellersController(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
        expect(res.json.calledWith(sellerUsers)).to.be.equal(true);
    });

    it('Retorna a venda e seus repectivos produtos e vendedor', async function() {
        const res = {};
        const req = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(salesService, 'salesProdutcts').resolves(saleProductAndUser);
        
        await controller.salesProductsController(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
        expect(res.json.calledWith(saleProductAndUser)).to.be.equal(true);
    });

    it('Retorna a venda e seus repectivos produtos e vendedor pelo ID', async function() {
        const res = {};
        const req = {params: {id: 1}};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(salesService, 'salesProdutctsId').resolves(saleProductAndUser[0]);
        
        await controller.salesProductsIdController(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
        expect(res.json.calledWith(saleProductAndUser[0])).to.be.equal(true);
    });

    it('Retorna todas as vendas', async function() {
        const res = {};
        const req = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(salesService, 'allSales').resolves(returnSales);
        
        await controller.allSalesController(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
        expect(res.json.calledWith(returnSales)).to.be.equal(true);
    });

    it('Retorna [1] monstrando o sucesso do update do status do pedido', async function() {
        const res = {};
        const req = {params: {id: 1}, body: {status: 'Pendente'}};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(salesService, 'update').resolves([1]);
        
        await controller.updateStatusController(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
        expect(res.json.calledWith([1])).to.be.equal(true);
    });
});