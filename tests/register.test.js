const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const { createTestScheduler } = require('jest');

chai.use(chaiHttp);

describe ( 'Register API Service', () => {
    it.skip('should test Register User', (done) => {
        const newUser= {user: "testing", pwd: 'Test!1234'};
        chai.request('http://localhost:3500')
        .post('/register')
        .send(newUser)
        .end( (err, res) => {
            console.log(res);
            expect(res.body.success).to.be.a('string'); //test criteria
            done();
        })
    });

    it.skip('should fail to register with duplicate username', (done) => {
        const newUser= {user: "testing", pwd: 'Test1234'};
        chai.request('http://localhost:3500')
        .post('/register')
        .send(newUser)
        .end( (err, res) => {
            expect(res.status).to.be.eql(409);
            done();
        })
    })
})