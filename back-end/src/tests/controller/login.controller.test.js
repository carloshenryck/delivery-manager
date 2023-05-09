const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const loginService = require('../../api/services/loginService');
const controller = require('../../api/controller/loginController');
const {login, returnService} = require('./mocks/login.controller.mock');

chai.use(sinonChai);
const { expect } = chai;

describe('Testa os retornos da controller Login', function () {
    it('Verifica que recebe resposta positiva com dados válidos', async function () {
        const res = { };
        const req = { body: login };

        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns();

        sinon.stub(loginService, 'login').resolves(returnService);

        await controller.loginController(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
        expect(res.json.calledWith(returnService)).to.be.equal(true);
    });
}) 

