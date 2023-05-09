const { expect } = require('chai');
const sinon = require('sinon');
const models = require('../../api/index');
const serviceSales = require('../../api/services/salesService');
const {saleInsert, user, userModel, productModel, listUsers, saleProductAndUser, returnSales} = require('./mocks/Sales.mock');

describe('Testes referentes a service Sales',  function () {
    afterEach(sinon.restore);
    it('Consegue cadastrar uma nova venda e seus respectivos produtos', async function() {
        sinon.stub(models.User, 'findOne').resolves(userModel);
        sinon.stub(models.Product, 'findOne').resolves(productModel);
        sinon.stub(models.Sale, 'create').resolves({dataValues: {id: 1}});
        sinon.stub(models.SaleProduct, 'create').resolves('Created');
 
        const result = await serviceSales.createSale(saleInsert, user);
        expect(result).to.be.equal(1);
    });

    it('Retorna todos os usuarios com a role como "Seller"', async function() {
        sinon.stub(models.User, 'findAll').resolves(listUsers);
        const result = await serviceSales.sellers();
        expect(result).to.deep.equal(listUsers);
    }); 

    it('Retorna todas as vendas e seus respectivos produtos e vendedor', async function() {
        sinon.stub(models.Sale, 'findAll').resolves(saleProductAndUser);
        const result = await serviceSales.salesProdutcts();
        expect(result).to.deep.equal(saleProductAndUser);
    });

    it('Retorna todas as vendas e seus respectivos produtos e vendedor pelo ID', async function() {
        sinon.stub(models.Sale, 'findAll').resolves(saleProductAndUser[0]);
        const result = await serviceSales.salesProdutctsId(1);
        expect(result).to.deep.equal(saleProductAndUser[0]);
    }); 

    it('Retorna todas as vendas', async function() {
        sinon.stub(models.Sale, 'findAll').resolves(returnSales);
        const result = await serviceSales.allSales();
        expect(result).to.deep.equal(returnSales);
    });

    it('Consegue atualizar o status de um pedido com sucesso', async function() {
        sinon.stub(models.Sale, 'update').resolves([1]);
        const result = await serviceSales.update({status: 'Em trânsito'}, 1);
        expect(result).to.deep.equal([1]);
    }); 
});