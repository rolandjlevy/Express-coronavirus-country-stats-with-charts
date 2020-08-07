class Country {
  constructor(c = 0, d = 0, r = 0, a = 0) {
    this.Confirmed = c;
    this.Deaths = d;
    this.Recovered = r;
    this.Active = a;
  }
}

const utils = {
  sorter: function(array, order, state) {
    if (order == 'Country') {
      return array.sort((a, b) => {
        const textA = a['Country'].toUpperCase();
        const textB = b['Country'].toUpperCase();
        const altb = textA < textB;
        const agtb = textA > textB;
        if (state === 'true') {
          return altb ? -1 : agtb ? 1 : 0;
        } else {
          return agtb ? -1 : altb ? 1 : 0;
        }
      });
    } else {
      return array.sort((a, b) => state === 'true' ? a[order] - b[order] : b[order] - a[order]);
    }
  },
  getTotals: function(country) {
    return country.reduce((acc, item) => {
      const { Confirmed, Deaths, Recovered, Active } = item;
      acc.Confirmed += Confirmed;
      acc.Deaths += Deaths;
      acc.Recovered += Recovered;
      acc.Active += Active;
      return acc;
    }, new Country());
  },
  getLatestTotals: function(country) {
    const latest = country[country.length-1];
    const { Confirmed, Deaths, Recovered, Active } = latest;
    return { Confirmed, Deaths, Recovered, Active };
  },
  getCountryData(found) {
    const { 
      NewConfirmed, 
      TotalConfirmed, 
      NewDeaths, 
      TotalDeaths, 
      NewRecovered, 
      TotalRecovered 
    } = found;
    return { 
      NewConfirmed,
      TotalConfirmed,
      NewDeaths, 
      TotalDeaths, 
      NewRecovered, 
      TotalRecovered 
    };
  },
  alphaSort: function(array, prop, direction) {
    return array.sort((a, b) => {
      const textA = a[prop].toUpperCase();
      const textB = b[prop].toUpperCase();
      if (direction == "asc") {
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      } else {
        return (textB < textA) ? -1 : (textB > textA) ? 1 : 0;
      }
    });
  }
}

module.exports = utils;