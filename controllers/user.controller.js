var db = require('../db');
var shortid = require('shortid');


module.exports.index = function(req, res) {
  res.render("users/index", {
    users: db.get("users").value()
  });
};

module.exports.delete = function(req, res) {
  var id = req.params.id;

  db.get("users")
    .remove({ id: id })
    .write();

  res.render("users/index", {
    users: db.get("users").value()
  });
};

module.exports.update = function(req, res) {
  var id = req.params.id;
  res.render("users/update-user", {
    id: id
  });
};

module.exports.postCreate = function(req, res) {
  
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.render("users/index", {
    users: db.get("users").value()
  });
};

module.exports.postUpdate = function(req, res) {
  var id = req.body.id;
  var name = req.body.name;
    db.get("users")
      .find({ id: id })
      .assign({ name: name })
      .write();

      res.redirect("/users");
};