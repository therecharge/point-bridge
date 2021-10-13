let sign = require("../utils/sign");
require("dotenv").config();

// TEMP
let sigUsed = {};
let userPoint = {};

function point(req, res) {
  //   try {
  //   console.log(req.body);
  const { address, amount, timestamp } = req.body;
  console.log(process.env.SALT);
  let sig = sign(`${address}|xoq|${amount}|xoq|${timestamp}`, process.env.SALT);

  // if sig doesn't match
  console.log(req.header("x-rcg-sig"));
  if (req.header("x-rcg-sig") != sig) {
    res.send({
      result: "error",
      message: "Signature doesn't match",
    });
    return;
  }
  // if sig used
  if (sigUsed[sig]) {
    res.send({
      result: "error",
      message: "Duplicate processing",
    });
    return;
  }

  sigUsed[sig] = true;
  res.send({
    result: "success",
    message: "It's done well!",
  });
  return;
  //   } catch (e) {
  //     res.send({
  //       result: "error",
  //       message: e,
  //     });
  //   }
}

// console.log(point());

module.exports = point;
