var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res){
    //var id = req.cookies.userId;
    var userData = db.get('users').value();
    var bookData = db.get('books').value();
    var transactions = db.get('transactions').value();

    var collections = transactions.map( trans => {
        var user = userData.find( user => user.id === trans.userId);
        var book = bookData.find( book => book.id === trans.bookId);
        return  {
            id : trans.id,
            isComplete : trans.isComplete,
            userName : user.name,
            bookTitle : book.title
                    }
    });

    res.render('transactions/index',{
        transactions : collections,
        userData, 
        bookData
    })
};


module.exports.create = function(req, res){
    var userRecieve = req.body.userRecieve;
    var bookRecieve = req.body.bookRecieve
    var idUserRecieve = db.get('users').find({name : userRecieve}).value().id;
    var idBookRecieve = db.get('books').find({title : bookRecieve}).value().id;
    req.body.id = shortid.generate();
    db.get('transactions')
    .push({
        id: shortid.generate(),
        userId : idUserRecieve,
        bookId : idBookRecieve,
        isComplete : false
    })
    .write();
    res.redirect('/transactions')
};

module.exports.complate = function(req, res){
    var id = req.params.id;
    db.get("transactions").find({ id: id }).assign({isComplete : true}).write();
    res.redirect('/transactions')
};
