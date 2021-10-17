var express = require("express");
var router = express.Router();
const point = require("../src/point");

router.post("/", point.post);
router.get("/:address", point.get);

module.exports = router;
