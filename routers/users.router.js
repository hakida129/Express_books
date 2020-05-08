var express = require('express');
var controller = require('../controllers/user.controller');
var middleware = require('../validation/user.middleware');
var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.get('/:id/delete', controller.delete);

router.get('/:id/update', controller.update);

router.post('/create', middleware.postCreate, controller.postCreate);

router.post('/update', controller.postUpdate);


module.exports = router;