var crypto = require("crypto");

// THIS COMMENT IS AN EXAMPLE!
//
// sign(
//   "0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d|xoq|10|xoq|1634006614103",
//   "mock"
// );

function sign(plain, salt) {
  const hash = crypto.createHmac("sha256", salt).update(plain).digest("string");
  const signature = hash.toString("base64");
  return signature;
}

module.exports = sign;
