// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
const Account = require("./account");
// const uuidForSamples = require('./uuidv4');

app.use(express.json());
app.use(express.static("public"));


let sampleCheckingAccount = new Account('Adao', 'checking', 22);
sampleCheckingAccount.id = 'ed5736e7-7fe9-453b-95dc-5f59565d25ac'; // uuidForSamples();

let sampleSavinggAccount = new Account('Eva', 'saving', 33);
sampleSavinggAccount.id = 'ce3dd3a5-70d5-459e-b6b7-49e0375b1650'; // uuidForSamples();


module.exports.accounts = [sampleCheckingAccount, sampleSavinggAccount];
let accounts = module.exports.accounts;


app.get("/api/accounts", (req, resp) => {
  resp.json(accounts);
});


app.post("/api/accounts", (req, resp) => {
  let name = req.body.name;
  let accountType = req.body.accountType;
  let balance = req.body.balance;
  
  let account = new Account(name, accountType, balance);
  account.save((newAccount, error) => {
    if(newAccount) {
      accounts.push(newAccount);
      resp.json({success: true});
    } else {
      resp.json({success: false, error: error})
    }
  });
});

app.post("/api/transfer", (req, resp) => {
  console.log(req.body)
  
  let accountFromId = req.body.accountFromId;
  let accountToId = req.body.accountToId;
  let amount = req.body.amount;
  
  let fromAccount = getAccountById(accountFromId);
  let toAccount = getAccountById(accountToId);
  
  fromAccount.transfer(toAccount, amount, (transferred, error) => {
    if(transferred) {
      resp.json({success: true})
    } else {
      resp.json({success: false, error: error})
    }
  });
});

function getAccountById(accountId) {
  return accounts.find(account => account.id == accountId)
};

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
