// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/api/accounts", (req, resp) => {
  resp.json("test");
});

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
