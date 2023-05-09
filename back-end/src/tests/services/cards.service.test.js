const token = require('../../utils/jwt');
const { expect } = require('chai');
const sinon = require('sinon');
const models = require('../../api/index');
const serviceCard = require('../../api/services/cardsService');
const {LISTA_DE_PRODUTOS} = require('./mocks/products.mock');

describe('Testes referentes a service Card',  function () {
    afterEach(sinon.restore);
    it('Retorna com sucesso todos os produtos', async function() {
        sinon.stub(models.Product, 'findAll').resolves(LISTA_DE_PRODUTOS);
        const result = await serviceCard.allCards();
        expect(result).to.deep.equal(LISTA_DE_PRODUTOS);
    })         
});
