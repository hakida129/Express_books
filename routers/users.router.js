var express = require('express');

var controller = require('../controllers/user.controller');

var router = express.Router();

router.get('/', controller.index);

router.get('/:id', controller.get);

router.get('/:id/delete', controller.delete);

router.get('/create', controller.create);

router.post('/create', controller.postCreate);

module.exports = router;