require('dotenv').config();
const Coinex = require('coinex.com');
const pairs = require('./coinpair');

const coinex = new Coinex(
//  process.env.COINEX_KEY,
//  process.env.COINEX_SECRET
);

async function orderDepth(pair, limit = 10, merge = 0) {
  try {
    coinex.depth(pair, limit, merge)
      .then(res => {
        console.log(res);
      });
  } catch (err) {
    console.log(err);
  }
}

orderDepth(pairs.BCHUSDT);
