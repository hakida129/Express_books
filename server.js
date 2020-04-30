const express = require("express");
const app = express();
var userRoute = require('./routes/user.route.js')
var bookRoute = require('./routes/book.route.js')
var transactionRoute = require('./routes/transaction.route.js')
var bodyParser = require("body-parser");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/users', userRoute);
app.use('/books', bookRoute);
app.use('/transactions', transactionRoute);
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
