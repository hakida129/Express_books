var express = require('express');
var controller = require('../controllers/user.controller');
var router = express.Router();

router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/:id', controller.get);
router.get('/:id/delete', controller.delete);
router.get('/create', controller.create);

module.exports = router;