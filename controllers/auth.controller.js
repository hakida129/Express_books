const sgMail = require("@sendgrid/mail");
var bcrypt = require('bcrypt');

var db = require('../db');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.login = function(req, res){
    res.render('auth/login')
};

module.exports.postLogin= async function(req,res){
    var email = req.body.email;
    var password = req.body.password;

    var user = db.get('users').find({ email : email }).value();
    if(!user){
        res.render('auth/login',{
            errors : [
                'Username does not exits.'
            ],
            values: req.body
        });
        return;
    }
    var wrongLoginCount = user.wrongLoginCount
    var hashedPassword = await bcrypt.compare(password, user.password);
 
    if(!hashedPassword) {
        db.get('users')
            .find({id : user.id})
            .assign({ wrongLoginCount : wrongLoginCount + 1})
            .write()


        res.render('auth/login',{
            errors : [
                'Wrong password.'
            ],
            values: req.body
        });
        return;
    }
    if(user.wrongLoginCount > 3){
        var msg = {
            to: user.email,
            from: 'admin@book.com',
            subject: 'Your account has been looked',
            text: 'Your account has been locked, because you entered the wrong password more than the specified number of times'
          };
        
        try {
            await sgMail.send(msg);
        } catch (error) {
            console.log(error);
        }
    }
    
    res.cookie('userId', user.id,{
        signed : true
    });
    res.redirect('/users');
}