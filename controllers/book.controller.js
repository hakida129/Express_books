var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res){
    console.log(res.locals.countCookie + 1);
    res.render('books/index',{
        books : db.get('books').value()
    })
};

module.exports.search = function(req,res){
    var title = req.query.title;
    var matchedBook = db.get('books').value().filter(function(book){
        return book.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
    });
    res.render('books/index',{   
        books : matchedBook
    });
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

module.exports.delete = function(req, res){
    var id_delete = req.params.id;
    db.get('books').remove({id : id_delete}).write();
    res.redirect('/books');
};

module.exports.update = function(req, res){
    var book = db.get('books').find({id: req.params.id}).value();
    res.render('books/update',{
        book : book
    });
};

module.exports.postUpdate = function(req, res){
    var id = req.body.id
    db.get('books').find({id : id}).assign({title :req.body.title }).write()
    res.redirect('/books');
};