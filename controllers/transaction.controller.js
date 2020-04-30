var db = require('../db');
var shortid = require('shortid');

module.exports.create = function(req, res) {
  var books = db.get("books").value();
  var users = db.get("users").value();
  var transactions = db.get("transactions").value();
  
  var changeTrans = transactions.map(function(trans){
    var book = books.find(function(book){
      if(book.id === trans.bookId){
        return book.id;
      }
      
    })
    var user = users.find(function(user){
      if(user.id === trans.userId){
        return user.id;
      }
      
    })
    return { 
      bookTitle: book.title,
      userName: user.name,
      id: trans.id,
      isComplete: trans.isComplete
    };
  });
  
  res.render("transactions/index", {
    transactions: changeTrans,books,users
  });
};

module.exports.postCreate = function(req, res) {
  
  req.body.id = shortid.generate();
  db.get("transactions")
    .push(req.body)
    .write();
  
  res.redirect("back");

};

module.exports.getComplete = function(req, res){
  var id = req.params.id;

    db.get("transactions")
      .find({ id: id })
      .set("isComplete", true )
      .write();

  res.redirect("back");
}