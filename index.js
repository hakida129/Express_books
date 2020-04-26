var express = require('express');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var bodyParser = require('body-parser');
var shortid = require('shortid');

var adapter = new FileSync('db.json');
var db = low(adapter);
var app = express();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views')



// Set some defaults (required if your JSON file is empty)
db.defaults({ books: []})
  .write()

app.get('/', function(req, res){
    res.send('Hello world');
});

app.get('/books', function(req, res){
    res.render('books/index',{
        books : db.get('books').value()
    })
})

app.get('/books/search', function(req,res){
   var name = req.query.title;
   var matchedUser = db.get('books').value().filter(function(book){
       return book.title.toLowerCase().indexOf(name.toLowerCase()) !== -1
   });
   res.render('books/index',{   
       books : matchedUser
   })
});

app.get('/books/create',function(req, res){
    res.render('books/create')
});

app.get('/books/:id', function(req,res){
    var id = req.params.id;
    var book = db.get('books').find({id : id}).value()
    res.render('books/view',{
        book: book
    })
})

app.post('/books/create', function(req, res){
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect('/books')
})

app.listen(port, function(){
    console.log('Example app listerning at port ' + port);
});

