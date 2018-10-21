import React, { Component } from 'react'
import ItemRanking from '../ItemRanking';
import loadingGif from '../../loading.gif';

class ObjectSizesLaunched extends Component {

  state = {
    data: null
  }

  componentDidMount() {
    const Request = require('../../Request');
    Request().get(this, 'objectslaunchedperyear/'+this.props.year+'/1000', (me, d) => {
      let json = d.DATA;

      json = json.filter(e => {
        const obj = e; //e.DATA;
        return obj.RCS_SIZE && obj.RCS_SIZE === this.props.size;
      });

      let countries = [], countryNames = '';
      json.forEach(e => {
        const obj = e; //e.DATA;
        if (countryNames.indexOf(obj.COUNTRY) === -1) {
          countryNames += ',' + obj.COUNTRY;
          countries.push({ COUNTRY: obj.COUNTRY, count: 1 });
        } else {
          let i = -1;
          for (let j = 0; j < countries.length; j++) {
            if (countries[j].COUNTRY === obj.COUNTRY) {
              i = j;
              break;
            }
          }
          countries[i].count += 1;
        }
      });

      let total = 0, TBD = 0;
      for (let j = 0; j < countries.length; j++) {
        total += countries[j].count;

        TBD += countries[j].COUNTRY === 'TBD' ? countries[j].count : 0;
      }

      countries.sort((a, b) => {
        if (this.props.ASC) {
          return a.count - b.count;
        } else {
          return b.count - a.count;
        }
      });



      me.setState({ data: countries, total: total, TOTAL_TBD: TBD });
    });
  }

  render() {
    const chart = !this.state.data ? (
      <div className="loading"><img src={loadingGif} /></div>
    ) :
      (
        <div>
          <p>In {this.props.year}</p>
          <ItemRanking arr={this.state.data} quantity={this.props.quantity} getText={e => { return e.count }} />
          <h5>UNKNOWN: {this.state.TOTAL_TBD}</h5>
          <h5>Total: {this.state.total}</h5>
        </div>
      );

    return chart;
  }
}

export default ObjectSizesLaunched
