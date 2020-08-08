const express = require('express');
const app = express();
const env = require('dotenv');
const moment = require('moment');
const emojiFlags = require('emoji-flags');
const fetch = require('node-fetch');
const { sorter, getDate, getLink } = require('./utils');
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
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    const url = `${process.env.CVAPI}/summary`;
    const response = await fetch(url, requestOptions);
    const { Countries } = await response.json();
    Countries.shift();
    const result = sorter(Countries, order, state);
    res.render('index.ejs', { result, order, state, getDate, getLink, emojiFlags });
  } catch (err) {
    console.error("Error:", err);
    console.error("Response:", response);
    return ReE(response, err.message, 500);
  }
});

app.get('/chart', (req, res) => {
  let { 
    country,  
    NewConfirmed, 
    TotalConfirmed, 
    NewDeaths, 
    TotalDeaths, 
    NewRecovered, 
    TotalRecovered,
    CountryCode
  } = req.query;
  res.render('chart.ejs', { 
    country, 
    NewConfirmed, 
    TotalConfirmed, 
    NewDeaths, 
    TotalDeaths, 
    NewRecovered, 
    TotalRecovered,
    CountryCode,
    emojiFlags
  });
});

app.listen(port, () => {
  console.log('Listening on port', port);
});