var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var bookRouter = require('./routers/books.router');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))

var port = 3001;

app.set('view engine', 'pug');
app.set('views', './views')

app.get('/', function(req, res){
    res.send('Hello world');
});

app.use('/books', bookRouter);

app.listen(port, function(){
    console.log('Example app listerning at port ' + port);
});

