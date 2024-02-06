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
    const account = this.getAccountByNameAndType(this.name, this.accountType)
    if(!account) {
      this.id = uuid()
      completion(this)
    } else {
      completion(null, 'Account exists and has same type.')
    }
  }
  
  transfer(toAccount, amount, completion) {
    if((this.balance - amount) < 0) {
      completion(false, 'Insufficient founds!')
      return
    }
    
    this.withdraw(amount)
    toAccount.deposit()
    completion(true)
  }
  
  withdraw(amount) {
    this.balance -= amount
  }
  
  deposit(amount) {
    this.balance += amount
  }
  
  getAccountByNameAndType(name, type) {
    return app.accounts.find(account => account.name == name && account.accountType == type)
  }
  
}
  

module.exports = Account;