require('dotenv').config();
const ccxt = require('ccxt');

const binanceInstance = new ccxt['binance'] ({
  'apiKey': process.env.API_KEY,
  'secret': process.env.API_SECRET,
  'timeout': 30000,
  'enableRateLimit': true
});

const coinexInstance = new ccxt['coinex']();

const orderLimit = 10;

async function testBinance() {
  let orderbook = await binanceInstance.fetchOrderBook('BTC/USDT', orderLimit)
    .then(res => { return res; });
  let bid = orderbook.bids.length ? orderbook.bids[0][0] : undefined
  let ask = orderbook.asks.length ? orderbook.asks[0][0] : undefined
  let spread = (bid && ask) ? ask - bid : undefined
  let orderDepth = {
    bids: 0,
    asks: 0
  };
  if (spread && orderbook.bids.length === orderbook.asks.length) {
    for (let i = 0; i < orderbook.bids.length; i++) {
      orderDepth.bids += orderbook.bids[i][1];
      orderDepth.asks += orderbook.asks[i][1];
    }
  }
  console.log ('Binance market price', { bid, ask, spread, orderDepth })
}

async function testCoinex() {
  let orderbook = await coinexInstance.fetchOrderBook('BTC/USDT', orderLimit)
    .then(res => { return res; });
  let bid = orderbook.bids.length ? orderbook.bids[0][0] : undefined
  let ask = orderbook.asks.length ? orderbook.asks[0][0] : undefined
  let spread = (bid && ask) ? ask - bid : undefined
  let orderDepth = {
    bids: 0,
    asks: 0
  };
  if (spread && orderbook.bids.length === orderbook.asks.length) {
    for (let i = 0; i < orderbook.bids.length; i++) {
      orderDepth.bids += orderbook.bids[i][1];
      orderDepth.asks += orderbook.asks[i][1];
    }
  }
  console.log ('Coinex market price', { bid, ask, spread, orderDepth })
}

testBinance();
testCoinex();
