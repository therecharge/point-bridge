var express = require("express");
var router = express.Router();

var checksum = require("../src/utils/checksum");

/* GET users listing. */
router.get("/checksum/:id", checksum);

module.exports = router;
