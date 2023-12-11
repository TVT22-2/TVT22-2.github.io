const fetch = require('node-fetch');
const { expect } = require('chai');
const axios = require('axios');

describe('Get Request Test local backend getallusers request', () => {
    it('should get an array of users', async () => {
        const response = await fetch('http://localhost:3001/');
        const data = await response.json();
        expect(response.status).to.equal(200);
        expect(data).to.be.an('array');
        expect(data[0]).to.include.all.keys('id', 'username', 'password', 'recovery');
    });
});
describe('Post Login test', () => {
    it('Should get a token and the code 200', async () => {
        let username = "Jhon";
        let password = "Jhon";
        const response = await axios.postForm('http://localhost:3001/login', { username, password });
        expect(response.status).to.equal(200);
        expect(response.data.jwtToken).to.be.a("string");
    });
    it('Should get a token and the code 200', async () => {
        let username = "Jhon";
        let password = "Jho";
        const response = await axios.postForm('http://localhost:3001/login', { username, password });
        expect(response.status).to.equal(200);
        expect(response.data.jwtToken).to.be.a("string");
    });
});
describe('Password recovery test', () => {
    it('Should return with the code 200 and a boolean that is true', async () => {
        let username = "Jhon";
        let recovery = "Jhon";
        const response = await axios.postForm('http://localhost:3001/forgot', { username, recovery });
        expect(response.status).to.equal(200);
        expect(response.data.Success).to.be.a("boolean");
        expect(response.data.Success).to.equal(true);
    });
});



