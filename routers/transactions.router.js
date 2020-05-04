var express = require('express');
var controller = require('../controllers/transaction.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/create', controller.postCreate);

module.exports = router;