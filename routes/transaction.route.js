var express = require('express');
var router = express.Router();
var controller = require('../controllers/transaction.controller');

router.get("/", controller.create);

router.post("/", controller.postCreate);

router.get("/:id/complete", controller.getComplete);

module.exports = router;