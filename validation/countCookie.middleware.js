module.exports.countCookie = function(req, res, next){
        res.locals.countCookie = 1;
    next();
};