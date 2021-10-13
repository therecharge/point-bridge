var express = require("express");
var router = express.Router();
const point = require("../src/point");

router.post("/", point);

module.exports = router;
