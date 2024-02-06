let app = require("./server.js")
let uuid = require("./uuidv4.js")

class Account {
  
  constructor(name, accountType, balance) {
    this.id = ""
    this.name = name
    this.accountType = accountType
    this.balance = balance
  }
  
  save(completion) {
    this.id = uuid()
    completion(this)
  }
  
}

module.exports = Account;