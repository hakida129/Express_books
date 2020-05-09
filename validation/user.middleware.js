module.exports.postCreate = function(req, res, next){
    var errors = [];
    if(!req.body.name ){
        errors.push('Name is not require')
    }
    if(!req.body.phone){
        errors.push('Phone is not require')
    }
    if(req.body.name.length > 30){
        errors.push("Name too long")
    }
    if(errors.length){
        res.render('users/create',{
            errors : errors,
            values : req.body
        });
        return;
    };
    next();
};