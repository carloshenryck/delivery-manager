const token = require('../../utils/jwt');
const { expect } = require('chai');
const sinon = require('sinon');
const models = require('../../api/index');
const serviceLogin = require('../../api/services/loginService');
const {login, returnUser} = require('./mocks/Login.mock');

describe('Testes referentes a service Login',  function () {
    afterEach(sinon.restore);
    it('Retorna um erro quando não encontra o usuario no banco de dados', async function() {
        sinon.stub(models.User, 'findOne').resolves(undefined);
        
        try {
            await serviceLogin.login(login);
        } catch(erro) {
            expect(erro.status).to.be.equal(404);
            expect(erro.message).to.be.equal('Not Found')
        } 
    });

    it('Retorna um login feito com sucesso com token', async function() {
        sinon.stub(models.User, 'findOne').resolves(returnUser);
        sinon.stub(token, 'generateToken').returns('123456789');

        const result = await serviceLogin.login(login);
        const {dataValues: {password, ...newObj}} = returnUser;
            
        expect(result).to.deep.equal({...newObj, token: '123456789'});
    });
});