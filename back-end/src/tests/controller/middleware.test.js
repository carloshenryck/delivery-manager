const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const chaiHttp = require('chai-http');
const app = require('../../api/app');
const registerService = require('../../api/services/registerService');
const jwt = require('../../utils/jwt');
const {returnVerify} = require('./mocks/middleware.mock');


chai.use(sinonChai);
chai.use(chaiHttp);
const { expect } = chai;

describe('Testa a funcionalidade do middleware de token', function () {
    afterEach(sinon.restore);

    it('Se ele permite ', async function () {
        const token = { Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjc1MjAwMTgwLCJleHAiOjE2NzUyODY1ODB9.UMBHVhs9PoZQsMz-RMBqPZ2TkKL6sZH0CnEth7Jk7eo'};

        sinon.stub(registerService, 'admUser').resolves('Created');
        sinon.stub(jwt, 'verifyToken').returns(returnVerify);

        const result = await chai.request(app).post('/register/adm').set(token).send({
            name: "Michael Jordan",
            email: "jordan@email.com",
            password: "$#melhorDoBasquete#$",
            role: 'seller',
        });
        expect(result.status).to.be.equal(201);
    });
});
