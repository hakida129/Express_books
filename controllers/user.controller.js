var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res){
    res.render('users/index',{
        users : db.get('users').value()
    })
};

module.exports.get = function(req, res){
    var id = parseInt(req.params.id);
    var user = db.get('users').find({id : id}).value()
    res.render('users/view',{
        user : user
    })
    
};

module.exports.delete = function(req, res){
    var id = parseInt(req.params.id);
    db.get('users').remove({id : id}).write()
    res.redirect('/users');
};

module.exports.create = function(req, res){
    res.render('users/create');
};

module.exports.postCreate = function(req, res){

}