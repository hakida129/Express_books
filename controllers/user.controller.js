var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res){
    res.render('users/index',{
        users : db.get('users').value()
    })
};

module.exports.get = function(req, res){
    res.render('usser/view',{
        user 
    })
};