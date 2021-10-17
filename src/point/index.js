const sign = require("../utils/sign");
const {Point, Sig_used} = require("../../models");
require("dotenv").config();


async function getPoint(req, res) {
  const { address } = req.params;
  const data = await Point.findOne({
    where: {id:address}
  });
  const balance = data.dataValues.point | 0;
  res.send({ address: address, balance: balance });
}

async function point(req, res) {
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
  
  const [_, created] = await Sig_used.findOrCreate({
    where: { id: sig },
    defaults: {
      used: true
    }
  });
  if (!created) {
    res.send(429, {
      result: "error",
      message: "Duplicate processing",
    });
    return;
  }


  await Point.findOrCreate({
    where: { id: address },
    defaults: {
      point: 0
    }
  });
  await Point.increment({point: 50}, { where: { id: address } })

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
