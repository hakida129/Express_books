var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res){
    res.render('books/index',{
        books : db.get('books').value()
    })
};

module.exports.search = function(req,res){
    var name = req.query.title;
    var matchedUser = db.get('books').value().filter(function(book){
        return book.title.toLowerCase().indexOf(name.toLowerCase()) !== -1
    });
    res.render('books/index',{   
        books : matchedUser
    })
};

module.exports.create = function(req, res){
    res.render('books/create')
};

module.exports.get = function(req,res){
    var id = req.params.id;
    var book = db.get('books').find({id : id}).value()
    res.render('books/view',{
        book: book
    })
};

module.exports.postCreate = function(req, res){
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect('/books')
};