const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const controller = require('../../api/controller/registerController');
const registerService = require('../../api/services/registerService');
const {register, registerAdm} = require('./mocks/register.controller.mock');

chai.use(sinonChai);
const { expect } = chai;

describe('Testa os retornos da controller Register', function () {
    afterEach(sinon.restore);
    it('É possível cadastrar um novo usuário', async function() {
        const res = {};
        const req = { body: register };

        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns();

        sinon.stub(registerService, 'newUser').resolves('Created');
        
        await controller.registerController(req, res);

        expect(res.status.calledWith(201)).to.be.equal(true);
        expect(res.json.calledWith({message: 'Created'})).to.be.equal(true);
    }); 

    it('É possível cadastrar um novo usuário como Administrador', async function() {
        const res = {};
        const req = { body: register, user: registerAdm };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(registerService, 'admUser').resolves('Created');
        
        await controller.admController(req, res);

        expect(res.status.calledWith(201)).to.be.equal(true);
        expect(res.json.calledWith({message: 'Created'})).to.be.equal(true);
    });
});
