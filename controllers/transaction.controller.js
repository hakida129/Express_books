var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res){
    var users = db.get('users').value();
    var books = db.get('books').value();
    var transactions = db.get('transactions').value();

    var changedTrans = transactions.map(function(trans){
        var user = users.find(user => users.id === transactions.userId);
        var book = books.find(book => books.id === transactions.bookId);
        return {
            userName : user.name,
            bookTitle : book.title
        }
    })
    res.render('transactions/index',{
        transactions : changedTrans
    })
};

module.exports.create = function(req, res){
    req.body.id = shortid.generate();
    db.get('transactions').push(req.body).write();
    res.redirect('/transactions')
};
