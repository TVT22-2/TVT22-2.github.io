
const { expect } = require('chai');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const axios = require('axios');
chai.use(chaiAsPromised);
let username = "TestAccount1";
let password = "TestAccount1";
let recovery = "TestAccount1";
let userid;
describe('Should Register an account', () => {
    it('should get the code 200 and make an account', async () => {
    const response = await axios.postForm('http://localhost:3001/register', { username, password, recovery });
    expect(response.status).to.equal(200);
    expect(response.data.jwtToken).to.be.a("string");
    });
});

describe('Shouldt Register an account', () => {
it('Should get the code 404 because the username is taken', async () => {
    const response = await axios.postForm('http://localhost:3001/register', { username, password, recovery })
    .catch(error => {
        return expect(error.response.status).to.equal(404); 
    });
 });
});

describe('Post Login test', () => {
    it('Should get a token, userID and the code 200', async () => {
        const response = await axios.postForm('http://localhost:3001/login', { username, password });
        expect(response.status).to.equal(200);
        expect(response.data.jwtToken).to.be.a("string");
        expect(response.data.UserID).to.be.a("number")
    });
    it('Should try to login with a username that doesnt exist and get a 404', async () => {
        let username = "DingeBerryHungleLover";
        const response = await axios.postForm('http://localhost:3001/login', { username, password })
        .catch(error => {
            return expect(error.response.status).to.equal(404);
        });
        it('Should get a 404 since the password is incorrect', async () => {
            let password = "WrongPassword"
            const response = await axios.postForm('http://localhost:3001/login', { username, password })
            .catch(error => {
                return expect(error.response.status).to.equal(401);
            });
        });
       
    });
});

describe('Password setting a new password', () => {
    it('Should return with the code 200', async () => {
        let password = "TestAccount12";
        const response = await axios.put('http://localhost:3001/change', { username, password });
        expect(response.status).to.equal(200);
    });
    it('Should return with the code 404 because the password is the same', async () => {
        let password = "TestAccount12";
        const response = await axios.put('http://localhost:3001/change', { username, password })
            .catch(error => {
                return expect(error.response.status).to.equal(404);
            }
            )
    });
});

describe('Password recovery test', () => {
    it('Should return with the code 200 and a boolean that is true if the username and recovery key are correct', async () => {
        let username = "TestAccount1";
        let recovery = "TestAccount1";
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
describe('Deletes the created account, Should return the code ', () => {
    it('Should return the code 200 since the account was deleted and the request went through', async () => {
        password = password + "2"
        const response1 = await axios.postForm('http://localhost:3001/login', { username, password });
        userid = await response1.data.UserID;
        axios.delete('http://localhost:3001/delete', { userid: userid })
        const response = await axios.delete('http://localhost:3001/delete', { data: { userid }});
        expect(response.status).to.equal(200);
    }); 
});

