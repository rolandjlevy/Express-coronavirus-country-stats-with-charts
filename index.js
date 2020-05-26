const express = require('express');
const app = express();
const env = require('dotenv');
const moment = require('moment');
const { sorter, getTotals, getLatestTotals } = require('./utils');
const fetch = require('node-fetch')
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(function (req, res, next) {
  // console.log('Time: %d', Date.now());
  next();
});

app.get('/', async (req, res) => {
  let { order, state } = req.query;
  order = order || 'Country';
  state = state || 'true';
  try {
    const response = await fetch(`${process.env.CVAPI}/summary`);
    const { Countries } = await response.json();
    Countries.shift();
    const result = sorter(Countries, order, state);
    res.render('index.ejs', { result, order, state });
  } catch (err) {
    console.error("Error:", err);
    console.error("Response:", response);
    return ReE(response, err.message, 500);
  }
});

app.get('/chart', async (req, res) => {
  let { country } = req.query;
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  const request = await fetch(`${process.env.CVAPI}/live/country/${country}/status/confirmed`, requestOptions)
  const result = await request.json();
  // const totals = getTotals(result);
  // there is a mismatch between /summary and /status/confirmed dates
  // also, I'm not getting the totals for the whole country...
  const totals = getLatestTotals(result);
  res.render('chart.ejs', { country, totals });
});

app.listen(port, () => {
  console.log('Listening on port', port);
});