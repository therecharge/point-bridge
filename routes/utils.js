var express = require("express");
var router = express.Router();

var checksum = require("../src/utils/checksum");

/* GET users listing. */
router.get("/:id", checksum);

module.exports = router;
