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
    const accountExists = this.getAccountByNameAndType(this.name, this.accountType)
    if(!accountExists) {
      this.id = uuid()
      completion(this)
    } else {
      completion(null, 'Account exists and has same type')
    }
  }
  
  transfer(toAccount) {
    
  }
  
  getAccountByNameAndType(name, type) {
    return app.accounts.find(account => account.name == name && account.accountType == type)
  }
  
}
  

module.exports = Account;