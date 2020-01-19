require('dotenv').config();
const Binance = require('binance-api-node').default;
const pairs = require('./coinpair');

const client = Binance();

// Authenticated client, can make signed calls
const client2 = Binance({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
});

async function orderDepth(pair) {
  try {
    await client.ws.partialDepth({ symbol: pair, level: 10 }, depth => {
      console.log(depth);
    });
  } catch (err) {
    console.log(err);
  }
}

async function orderTest() {
  await client2.orderTest({
    symbol: pairs.BTCUSDT,
    side: 'BUY',
    quantity: 1,
    price: 8000,
  }).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });
}

async function openOrder(trade_pair) {
  await client2.openOrders({
    symbol: pair
  }).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });
}

orderDepth(pairs.BTCUSDT);
