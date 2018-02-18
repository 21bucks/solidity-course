const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const {interface, bytecode} = require ('../compile.js');

let accounts;

beforeEach(async () => {
    //get list of all accounts
    accounts =await web3.eth.getAccounts();
    
    
    //deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
       .deploy({data: bytecode, arguments: ['Hi there!']})
       .send({from:accounts[0],gas:'1000000'})
    
});

describe('Inbox', () => {
    it('deploys a contract', () =>{
        console.log(inbox.options);
        assert.ok(inbox.options.address);
    });

    it('has default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message,'Hi there!');
    })
});