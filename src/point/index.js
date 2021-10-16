const sign = require("../utils/sign");
const Web3 = require("web3");
const ERC20_ABI = require("../../lib/abi/erc20.json");
require("dotenv").config();

// TEMP
let sigUsed = {};
let userPoint = {};

function getPoint(req, res) {
  const { address } = req.params;
  const balance = userPoint[address] | 0;
  res.send({ address: address, balance: balance });
}

function point(req, res) {
  //   try {
  //   console.log(req.body);
  const { address, amount, timestamp } = req.body;
  console.log(process.env.SALT);
  let sig = sign(`${address}|xoq|${amount}|xoq|${timestamp}`, process.env.SALT);

  // if sig doesn't match
  console.log(req.header("x-rcg-sig"));
  if (req.header("x-rcg-sig") != sig) {
    res.send(403, {
      result: "error",
      message: "Signature doesn't match",
    });
    return;
  }
  // if sig used
  if (sigUsed[sig]) {
    res.send(429, {
      result: "error",
      message: "Duplicate processing",
    });
    return;
  }

  sigUsed[sig] = true;

  userPoint[address] = (userPoint[address] | 0) + Number(amount);
  res.send(201, {
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

module.exports = { post: point, get: getPoint };
