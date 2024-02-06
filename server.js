// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
const Account = require("./account");
const uuidForSamples = require('./uuidv4');

app.use(express.json());
app.use(express.static("public"));


let sampleCheckingAccount = new Account('Adao', 'checking', 22);
sampleCheckingAccount.id = uuidForSamples();

let sampleSavinggAccount = new Account('Eva', 'saving', 33);
sampleSavinggAccount.id = uuidForSamples();


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
      resp.json({success: false, error})
    }
  });
});

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
