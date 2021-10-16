var express = require("express");
var router = express.Router();
const swap = require("../src/swap");

router.get("/", swap.get);
router.post("/:address", swap.post);

module.exports = router;
