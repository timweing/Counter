// Source code to interact with smart contract

// web3 provider with fallback for old version
if (window.ethereum) {
  window.web3 = new Web3(window.ethereum)
  try {
      ethereum.enable()
  } catch (error) {
      console.log('permission rejected')
  }
}
else if (window.web3) {
  window.web3 = new Web3(window.web3.currentProvider)
  // no need to ask for permission
}
else {
  window.alert('Consider MetaMask')
}
console.log (window.web3.currentProvider)

// contractAddress and abi
var contractAddress = '0xFB9d1B95ae93d9cB5Ab12536EA4948B24743A009';
var abi = JSON.parse('[{"constant": false,      "inputs": [],      "name": "incrementCounter",      "outputs": [],      "payable": false,      "stateMutability": "nonpayable",      "type": "function"    },    {      "constant": false,      "inputs": [],      "name": "decrementCounter",      "outputs": [],      "payable": false,      "stateMutability": "nonpayable",      "type": "function"    },    {      "constant": true,      "inputs": [],      "name": "getCount",      "outputs": [        {          "name": "",          "type": "int256"        }      ],      "payable": false,      "stateMutability": "view",      "type": "function"    }  ]' );

//contract instance
var contract = new web3.eth.Contract(abi, contractAddress);

// Accounts
var account;

web3.eth.getAccounts(function(err, accounts) {
  if (err != null) {
    alert("Error retrieving accounts.");
    return;
  }
  if (accounts.length == 0) {
    alert("No account found! Make sure the Ethereum client is configured properly.");
    return;
  }
  account = accounts[0];
  console.log('Account: ' + account);
  web3.eth.defaultAccount = account;
});

//Smart contract functions
function add() {
  contract.methods.incrementCounter().send( {from: account}).then( function(tx) {
    console.log("Transaction: ", tx);
  });
}

function subtract() {
  contract.methods.decrementCounter().send( {from: account}).then( function(tx) {
    console.log("Transaction: ", tx);
  });
}

function getCounter() {
  contract.methods.getCount().call().then( function( info ) {
    console.log("Counter value: ", info);
    document.getElementById('info').innerHTML = info;
  });
}
