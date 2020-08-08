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
  getDate() {
    const date = new Date();
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  },
  getLink(state, order, currentOrder, currentLabel) {
    let arrow;
    const dir = state == 'false';
    if (order == currentOrder) {
      arrow = dir ? '&#8595;' : '&#8593;';
    } else {
      arrow = '';
    }
    return `<a href="/?order=${currentOrder}&state=${dir}">${currentLabel}</a> ${arrow}`;
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