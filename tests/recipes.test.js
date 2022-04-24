const { request } = require('chai');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const { createTestScheduler } = require('jest');

chai.use(chaiHttp);


describe('Recipes API Service', () => {
    it.skip('should test Create New Recipe', (done) => {
        const newRecipe = {
            id: 5,
            name: "Salmon Burger",
            type: "Grilled"
        };

        chai
        .request('http://localhost:3500')
        .post('/api/recipes')
        .send(newRecipe)
        .end( (err, res) => {
            expect(res.status).to.be.eql(401);
            done();
        });
    });

    it('should post a recipe', (done) => {
        const newRecipe = {
            id: 5,
            name: "Salmon Burger",
            type: "Grilled"
        };
    
        chai 
        .request('http://localhost:3500')
        .post('/api/recipes')
        .set('access_token', '432e50197b4b830309edeb40ecbe29cd9c422b9f51da2e52ca388d085a27978062dec4644d1a7ae25a56b9460098ec782ce59daf546a49b6ba43146e0139369a')
        .send(newRecipe)
        .end( (err, res) => {
            expect(res.status).to.be.eql(401);
            done();
        });
    });
});
