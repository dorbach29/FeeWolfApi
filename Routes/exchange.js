const express = require('express');
const app = express();
const port = 3000;
//Some taken from ChatGPT

// Import ExchangeHandler module
const ExchangeHandler = require('./ExchangeHandler');

// Set up route to get exchange data
app.get('/exchange/:name', (req, res) => {
  // Get exchange name from URL parameter
  const exchangeName = req.params.name;
  // Get exchange data
  const exchangeData = ExchangeHandler.getExchangeData(exchangeName);
  // Send exchange data as response
  res.send(exchangeData);
});

// Set up route to set new Coinbase fee
app.put('/exchange/coinbase/:fee', (req, res) => {
  // Get fee from URL parameter
  const fee = req.params.fee;
  // Set new Coinbase fee
  ExchangeHandler.setNewCoinbaseFee(fee);
  // Send success message as response
  res.send(`Successfully set Coinbase fee to ${fee}`);
});

// Set up route to set new Gemini fee
app.put('/exchange/gemini/:fee', (req, res) => {
  // Get fee from URL parameter
  const fee = req.params.fee;
  // Set new Gemini fee
  ExchangeHandler.setNewGemeniFee(fee);
  // Send success message as response
  res.send(`Successfully set Gemini fee to ${fee}`);
});

// Set up route to set new KuCoin fee
app.put('/exchange/kucoin/:fee/:orderType', (req, res) => {
  // Get fee and order type from URL parameters
  const fee = req.params.fee;
  const orderType = req.params.orderType;
  // Set new KuCoin fee
  ExchangeHandler.setNewKuCoinFee(fee, orderType);
  // Send success message as response
  res.send(`Successfully set KuCoin fee to ${fee} for ${orderType} orders`);
});

// Set up route to set new Binance fee
app.put('/exchange/binance/:fee', (req, res) => {
  // Get fee from URL parameter
  const fee = req.params.fee;
  // Set new Binance fee
  ExchangeHandler.setNewBinanceFee(fee);
  // Send success message as response
  res.send(`Successfully set Binance fee to ${fee}`);
});

// Set up route to set new Crypto.com fee
app.put('/exchange/cryptocurrency/:fee/:orderType', (req, res) => {
  // Get fee and order type from URL parameters
  const fee = req.params.fee;
  const orderType = req.params.orderType;
  // Set new Crypto.com fee
  ExchangeHandler.setNewCryptoComFee(fee, orderType);
  // Send success message as response
  res.send(`Successfully set Crypto.com fee to ${fee} for ${orderType} orders`);
});

// Set up route to set new FTX fee
// Set up route to set new FTX fee
app.put('/exchange/ftx/:fee/:orderType', (req, res) => {
  // Get fee and order type from URL parameters
  const fee = req.params.fee;
  const orderType = req.params.orderType;
  // Set new FTX fee
  ExchangeHandler.setNewFTXFee(fee, orderType);
  // Send success message as response
  res.send(`Successfully set FTX fee to ${fee} for ${orderType} orders`);
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
