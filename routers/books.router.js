var express = require('express');
var shortid = require('shortid');

var db = require('../db');
var router = express.Router();


router.get('/', function(req, res){
    res.render('books/index',{
        books : db.get('books').value()
    })
})

router.get('/search', function(req,res){
   var name = req.query.title;
   var matchedUser = db.get('books').value().filter(function(book){
       return book.title.toLowerCase().indexOf(name.toLowerCase()) !== -1
   });
   res.render('books/index',{   
       books : matchedUser
   })
});

router.get('/create',function(req, res){
    res.render('books/create')
});

router.get('/:id', function(req,res){
    var id = req.params.id;
    var book = db.get('books').find({id : id}).value()
    res.render('books/view',{
        book: book
    })
})

router.post('/create', function(req, res){
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect('/books')
})


module.exports = router;