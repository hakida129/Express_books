var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

var bookRouter = require('./routers/books.router');
var userRouter = require('./routers/users.router');
var transactionRouter = require('./routers/transactions.router');
var authRouter = require('./routers/auth.router');
var countCookie = require('./validation/countCookie.middleware');
var authMiddleware = require('./middlewares/auth.middleware');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use(express.static('public'))

var port = 3333;

app.set('view engine', 'pug');
app.set('views', './views')

app.get('/', function(req, res){
    res.render('index');
    
});

app.use('/books', bookRouter);
app.use('/users', authMiddleware.requireMiddleware , userRouter);
app.use('/transactions',authMiddleware.requireMiddleware, transactionRouter);
app.use('/auth', authRouter);

app.listen(port, function(){
    console.log('Example app listerning at port ' + port);
});
