var express = require('express');

var controller = require('../controllers/book.controller');
var middleware = require('../middlewares/cookie.middleware');

var router = express.Router();

router.get('/',middleware.countCookie, controller.index);

router.get('/search', controller.search);

router.get('/create',controller.create);

router.get('/:id', controller.get);

router.get('/:id/delete', controller.delete);

router.get('/:id/update', controller.update);

router.post('/create', controller.postCreate);

router.post('/update', controller.postUpdate);

module.exports = router;