var express = require("express");
var Web3 = require("web3");

const web3 = new Web3();

function get_checksum(req, res) {
  let ret;
  try {
    ret = {
      result: "success",
      address: web3.utils.toChecksumAddress(req.params.id),
      message: "I think this is the right address.",
    };
  } catch (e) {
    ret = {
      result: "fail",
      message: `Given address '${req.params.id}' is not a valid Ethereum address.`,
    };
  }
  console.log(ret);
  res.send(ret);
}

module.exports = get_checksum;
