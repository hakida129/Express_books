var db = require('../db');
var shortid = require('shortid');
var bcrypt = require('bcrypt');
var calPagination = require('../untils/pagination');

module.exports.index = function(req, res){
    var users = db.get('users').value()
    var filtered = [...users];

    var result = calPagination(req.query.page, filtered);

    res.render('users/index',{
        users: result.filtered,
        pagination: result.pagination
    });
};

module.exports.search = function(req, res){
    var name = req.query.name;  
    var matchUser = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
    })
    res.render('users/index',{
        users: matchUser
    })
};

module.exports.get = function(req, res){
    var id = req.params.id;
    var user = db.get('users').find({ id : id }).value()
    res.render('users/view',{
        user : user
    });
};

module.exports.delete = function(req, res){
    var id = req.params.id;
    db.get('users').remove({ id : id }).write();
    res.redirect('/users')
};

module.exports.create = function(req, res){
    res.render('users/create')
};

module.exports.postCreate = function(req, res){
    var newUser = req.body;
    newUser.id = shortid.generate();
    newUser.isAdmin = false;
    newUser.wrongLoginCount = 0;
    newUser.avatarUrl = req.file.path.split('/').slice('1').join('/')
    var hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash;

    db.get('users')
        .push(newUser)
        .write();
    res.redirect('/users');
};

module.exports.update = function(req, res){
    var user = db.get('users').find({ id : req.params.id }).value();
    res.render('users/update',{
        user : user
    });
};

module.exports.postUpdate =function(req, res){
    var id = req.body.id;
    db.get('users').find({ id : id }).assign({ name : req.body.name, phone : req.body.phone }).write()
    res.redirect('/users');
    
};

module.exports.profile = function(req, res){
    var id = req.params.id;
    var user = db.get('users').find({ id: id}).value()
    res.render('users/profile',{
        user : user
    });
};

module.exports.postProfile = function(req, res){
    var id = req.params.id;
    req.body.avatar = req.file.path.split('/').slice('1').join('/')
    cloudinary.uploader.upload(req.file.path, function(error, result){
        db.get('users')
            .find({ id : id})
            .assign({name : req.body.name, email : req.body.email, avatarUrl : req.body.avatar})
            .write()
            res.redirect('/users');
    });
    
}