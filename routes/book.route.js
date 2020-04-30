var express = require('express');
var router = express.Router();
var controller = require('../controllers/book.controller');


router.get("/",controller.index );

router.get("/:id/delete", controller.delete);

router.get("/:id/update", controller.update);

router.post("/create", controller.postCreate);


router.post("/update", controller.postCreate);


module.exports = router;