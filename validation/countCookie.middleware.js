module.exports.countCookie = function(req, res, next){
    res.cookie('cookie', parseInt(req.cookies.cookie) + 1);
    next();
};