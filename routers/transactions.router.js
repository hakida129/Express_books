var express = require('express');
var controller = require('../controllers/transaction.controller');

var router = express.Router();

router.get('/', controller.index);

router.post('/', controller.create);

router.get('/:id/complete', controller.complate)

module.exports = router;