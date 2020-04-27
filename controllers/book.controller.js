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

module.exports.delete = function(req, res){
    var id_delete = req.params.id_delete;
    db.get('books').remove({id : id_delete}).write();
    res.redirect('/books');
};

module.exports.update = function(req, res){
    res.render('books/update',{
        book : db.get('books').value()
    });
};

module.exports.postUpdate = function(req, res){
    var id_update = req.params.id_update;

};