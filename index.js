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
  res.locals.uri = req.originalUrl;
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
    const uri = res.locals.uri;
    const url = `${process.env.CVAPI}/summary`;
    const response = await fetch(url, requestOptions);
    const { Countries } = await response.json();
    Countries.shift();
    // console.log({Countries});
    // res.send('hello');
    let result = sorter(Countries, order, state).map(item => {
      return Object.keys(item).reduce((acc, key) => {
        acc[key] = item[key];
        return acc;
      }, {});
    });
    res.render('pages/index', { result, order, state, getDate, getLink, emojiFlags, uri });
  } catch (err) {
    console.error("Error:", err);
    console.error("Response:", response);
    return ReE(response, err.message, 500);
  }
});

app.get('/chart', (req, res) => {
  const uri = res.locals.uri;
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
  res.render('pages/chart', { 
    country, 
    NewConfirmed, 
    TotalConfirmed, 
    NewDeaths, 
    TotalDeaths, 
    NewRecovered, 
    TotalRecovered,
    CountryCode,
    emojiFlags,
    uri
  });
});

app.get('/about', (req, res) => {
  res.render('pages/about', { uri: res.locals.uri });
});

app.listen(port, () => {
  console.log('Listening on port', port);
});