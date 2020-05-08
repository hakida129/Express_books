var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res){
    var users = db.get('users').value();
    var books = db.get('books').value();
    var transactions = db.get('transactions').value();

    

    // var changedTrans = transactions.map(function(trans){
    //     console.log(trans);
    //     var userName =[], bookTitle = [];
    //     var user = users.find(user => users.id === transactions.userId);
    //     userName.push(user.name);
    //     var book = books.find(book => books.id === transactions.bookId);
    //     bookTitle.push(book.title);
    // return {
    //     userName ,
    //     bookTitle 
    // }
    // })
    res.render('transactions/index',{
        transactions : db.get('transactions').value()

    })
};

module.exports.create = function(req, res){
    var idUserRecieve = db.get('users').find({id : req.body.userRecieve}).value().id;
    var idBookRecieve = db.get('books').find({id : req.body.bookRecieve}).value().id;

    var id = shortid.generate();
    db.get('transactions')
    .push({
        id,
        userId: idUserRecieve,
        bookId: idBookRecieve
    })
    .write();
    res.redirect('/transactions')
};

module.exports.complate = function(req, res){
    var id = req.params.id;
    var values = []
    //console.log(id);
    var data = db.get("transactions").value();
    console.log(data.bookId);
        
        // if(item.id !== id){
        //     var error = "Transaction does not exit";
        //     res.render('transactions/index',{
        //         error : error,
        //         transactions : db.get('transactions').value()
        //     });
        //     return;
        // }
    

    
    db.get("transactions").find({ id: id }).assign({isComplete : true}).write();
    res.redirect('/transactions')
};
