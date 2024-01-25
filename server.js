// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();


app.use(express.json());


let checkingAccount = new Account('Mara', 'checking', 300);
checkingAccount.id = 'c78987bd-c0de-4691-a6de-24399459e911'

let savingAccount = new Account('Mara', 'saving', 200);
savingAccount.id = '049acbea-cc59-4ef7-8cc6-7213971405ca';

// let checkingAccount = {
//   name: "Mara",
//   id: "629dcdce-cc95-4328-8f26-bcab03f69a02",
//   accountType: "checking",
//   balance: 200,
// };

// let savingAccount = {
//   name: "Mara",
//   id: "c78987bd-c0de-4691-a6de-24399459e911",
//   accountType: "saving",
//   balance: 500,
// };

module.exports.accounts = [checkingAccount, savingAccount];
let accounts = module.exports.accounts;

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/dreams", function (request, response) {
  response.json(dreams);
});

app.get("/books", function (request, response) {
  response.sendFile(__dirname + "/response1.json");
});

app.get("/api/accounts", (req, resp) => {
  resp.json(accounts);
});

app.post("/api/accounts", (req, resp) => {
  let name = req.body.name;
  let accountType = req.body.accountType;
  let balance = req.body.balance;

  // let account = { name: name, accountType: accountType, balance: balance };
  let account = new Account(name, accountType, balance)

//   accounts.push(account);

//   resp.json({ success: true });
  
  account.save((newAccount, error) => {
    if(newAccount) {
      accounts.push(newAccount);
      resp.json({success: true});
    } else {
      resp.json({success: false, error, error});
    }
  });
});

app.post("/api/transfer", (req, resp) => {
  
  console.log(req.body);
  
  let accountFromId = req.body.accountFromId;
  let accountToId = req.body.accountToId;
  let amount = req.body.amount;
  
  let fromAccount = accounts.find(account => account.id == accountFromId);
  let toAccount = accounts.find(account => account.id == accountToId);
  
  fromAccount.transfer(toAccount, amount, (transferred, error) => {
    if(transferred) {
      resp.json({success:true});
    } else {
      resp.json({success: false, error: error});
    }
  });
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
