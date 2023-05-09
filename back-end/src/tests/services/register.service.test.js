const { expect } = require('chai');
const sinon = require('sinon');
const models = require('../../api/index');
const serviceRegister = require('../../api/services/registerService');
const {newUser, returnNewUser, user, userNotAdm} = require('./mocks/Register.mock');

describe('Testes referentes a service Register',  function () {
    afterEach(sinon.restore);

    it('Consegue criar uma novo usuario no banco de dados', async function() {
        sinon.stub(models.User, 'findOne').resolves(undefined);
        sinon.stub(models.User, 'create').resolves('Created');

        const result = await serviceRegister.newUser(newUser);
        expect(result).to.be.equal('Created');
    });

    it('Retorna um erro quando ja existe alguem no banco de dados', async function() {
        sinon.stub(models.User, 'findOne').resolves(returnNewUser);
        try {
            await serviceRegister.newUser(newUser);
        } catch (err) {
            expect(err.status).to.be.equal(409);
            expect(err.message).to.be.equal('Conflict')
        }
    });

    it('Consegue criar um novo usuario no banco de dados. [Pessoa administradora]', async function() {
        sinon.stub(models.User, 'findOne').resolves(undefined);
        sinon.stub(models.User, 'create').resolves('Created');

        const result = await serviceRegister.admUser(newUser, user);
        expect(result).to.be.equal('Created');
    });

    it('Retorna um erro quando ja exite alguem no banco de dados. [Pessoa administradora]', async function() {
        sinon.stub(models.User, 'findOne').resolves(returnNewUser);
        try {
            await serviceRegister.admUser(newUser, user);
        } catch (err) {
            expect(err.status).to.be.equal(409);
            expect(err.message).to.be.equal('Conflict')
        }
    });

    it('Retorna um erro quando a pessoa não é autorizada. [Pessoa administradora]', async function() {
        sinon.stub(models.User, 'findOne').resolves(undefined);
        try {
            await serviceRegister.admUser(newUser, userNotAdm);
        } catch (err) {
            expect(err.status).to.be.equal(403);
            expect(err.message).to.be.equal('User not Authorized');
        }
    });
});