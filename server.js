// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
const Account = require("./account");

app.use(express.json());
app.use(express.static("public"));

let sampleCheckingAccount = new Account('Adao', 'checking', 22);
let sampleSavinggAccount = new Account('Eva', 'saving', 33);

module.exports.accounts = [sampleCheckingAccount, sampleSavinggAccount];
let accounts = module.exports.accounts;

app.get("/api/accounts", (req, resp) => {
  resp.json("test");
});

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
