var express = require('express');

var controller = require('../controllers/book.controller');

var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create',controller.create);

router.get('/:id', controller.get);

router.get('/:id_delete/delete', controller.delete);

router.get('/:id_update/update', controller.update);

router.post('/create', controller.postCreate);

router.get('/:id_update/update', controller.postUpdate);

module.exports = router;