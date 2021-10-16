const Web3 = require("web3");
const ERC20_ABI = require("../../lib/abi/erc20.json");
const axios = require("axios");
require("dotenv").config();

// TEMP
let TxList = {};
let userPoint = {
  "0x4BF95b3B13f64890566982C37Aa549618568d5C0": 10000,
};

function getTx(req, res) {
  res.send(TxList);
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
  const point = userPoint[address] | 0;
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
    .on("transactionHash", function (hash) {
      TxList[hash] = -1;
      console.log(TxList);
      userPoint[address] = 0;
      res.send(201, {
        address: address,
        point: point,
        token: amount,
        hash: hash,
      });
    })
    .on("confirmation", function (confirmationNumber, receipt) {
      TxList[receipt.transactionHash] = confirmationNumber;
      console.log("Con", TxList);
    })
    .on("error", function (error, receipt) {
      console.log(error);
    });
}

module.exports = { post: swap, get: getTx };
