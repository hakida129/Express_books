var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

var bookRouter = require('./routers/books.router');
var userRouter = require('./routers/users.router');
var transactionRouter = require('./routers/transactions.router');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use(express.static('public'))

var port = 3333;

app.set('view engine', 'pug');
app.set('views', './views')

app.get('/', function(req, res){
    res.cookie('cookie_id' , 12345);
    res.render('index');
    
});

app.use('/books',  bookRouter);
app.use('/users', userRouter);
app.use('/transactions', transactionRouter);

app.listen(port, function(){
    console.log('Example app listerning at port ' + port);
});
