
const { expect } = require('chai');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const axios = require('axios');
chai.use(chaiAsPromised);
describe('Post Login test', () => {
    it('Should get a token and the code 200', async () => {
        let username = "Aatu";
        let password = "Aatu";
        const response = await axios.postForm('http://localhost:3001/login', { username, password });
        expect(response.status).to.equal(200);
        expect(response.data.jwtToken).to.be.a("string");
    });
});
describe('Password setting a new password', () => {
    it('Should return with the code 200', async () => {
        let username = "Jhon";
        let password = "Jhon";
        const response = await axios.put('http://localhost:3001/change', { username, password });
        expect(response.status).to.equal(200);
    });
    it('Should return with the code 404 because the password is the same', async () => {
        let username = "Jhon";
        //change the password if you get an error since it checks if the old password is the same as the new password
        let password = "Jhon";
        const response = await axios.put('http://localhost:3001/change', { username, password })
            .catch(error => {
                return expect(error.response.status).to.equal(404);
            }
            )
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
describe('Password recovery fail test', () => {
    it('Should return with the code 401 since the recovery key is false', async () => {
        let username = "Jhon";
        let recovery = "Jho";
        const response = await axios.postForm('http://localhost:3001/forgot', { username, recovery })
        .catch(error => {
            return expect(error.response.status).to.equal(401);
        }
        )
    });
    it('Should return with the code 404 since the user doesnt exist', async () => {
        let username = "DingeBerryHungleLover";
        let recovery = "Jho";
        const response = await axios.postForm('http://localhost:3001/forgot', { username, recovery })
        .catch(error => {
            return expect(error.response.status).to.equal(404);
        }
        )
    });
});



