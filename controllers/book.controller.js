var db = require('../db');
var shortid = require('shortid');


module.exports.index = function(req, res) {
  res.render("books/index", {
    books: db.get("books").value()
  });
};

module.exports.delete = function(req, res) {
  var id = req.params.id;

  db.get("books")
    .remove({ id: id })
    .write();

  res.render("books/index", {
    books: db.get("books").value()
  });
};

module.exports.update = function(req, res) {
  var id = req.params.id;
  res.render("books/update-title", {
    id: id
  });
};

module.exports.postCreate = function(req, res) {
  
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.render("books/index", {
    books: db.get("books").value()
  });
};

module.exports.postUpdate = function(req, res) {
  var id = req.body.id;
  var title = req.body.title;
    db.get("books")
      .find({ id: id })
      .assign({ title: title })
      .write();

    res.redirect("/books");
};
