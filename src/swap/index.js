const Web3 = require("web3");
const ERC20_ABI = require("../../lib/abi/erc20.json");
const axios = require("axios");
const {Point, Tx_list} = require("../../models");
require("dotenv").config();

// TEMP
let TxList = {};
let userPoint = {
  "0x4BF95b3B13f64890566982C37Aa549618568d5C0": 10000,
};

async function getTx(req, res) {
  let ret = {};
  const TxList = await Tx_list.findAll({
    order: [['createdAt',"DESC"]],
    limit: 1000
  });
  TxList.map(p => {
    ret[p.dataValues.id]=p.dataValues.confirms
  })
  res.send(ret);
}

async function swap(req, res) {
  // Create web3 instance
  const web3 = new Web3(process.env.NETWORK_RPC);
  const CONTRACT = new web3.eth.Contract(ERC20_ABI, process.env.TOKEN_ADDRESS);
  web3.eth.accounts.wallet.add({
    privateKey: process.env.PRIVATE_KEY,
    address: process.env.PUBLIC_KEY,
  });

  // Calc amount to swap
  const { data } = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=recharge&vs_currencies=krw"
  );
  const { address } = req.params;
  const RES_point = await Point.findOne({
    where: {id:address}
  });
  const point = RES_point.dataValues.point | 0;
  const price = data.recharge.krw;
  const amount = Math.floor(point / price);

  // exception
  if (amount == 0) {
    res.send(412, { message: "You have no point to swap" });
    return;
  }

  // send transaction and start listen event
  CONTRACT.methods
    .transfer(address, amount)
    // .send({ from: process.env.PUBLIC_KEY })
    .send({
      from: process.env.PUBLIC_KEY,
      gasLimit: 400000,
      nonce: await web3.eth.getTransactionCount(
        process.env.PUBLIC_KEY,
        "pending"
      ),
    })
    .on("transactionHash", async function (hash) {
      await Tx_list.findOrCreate({
        where: { id: hash },
        defaults: {
          confirms: -1
        }
      });
      await Point.update({point: 0}, { where: { id: address } })
      res.send(201, {
        address: address,
        point: point,
        token: amount,
        hash: hash,
      });
    })
    .on("confirmation", async function (confirmationNumber, receipt) {
      await Tx_list.update({confirms: confirmationNumber}, { where: { id: receipt.transactionHash } })
    })
    .on("error", function (error, receipt) {
      console.log(error);
    });
}

module.exports = { post: swap, get: getTx };
