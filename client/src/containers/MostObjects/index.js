import React, { Component } from 'react'
import ItemRanking from '../ItemRanking';
import loadingGif from '../../loading.gif';

class MostObjects extends Component {

  state = {
    data: null,
  }

  componentDidMount() {
    const Request = require('../../Request');
    Request().get(this,'spaceobjectsscore', (me, d)=>{
      const data = d.DATA;
      data.sort((a, b) => {
        return b.COUNTRY_TOTAL - a.COUNTRY_TOTAL;
      });

      const total = data.filter(c=>{
        return c.COUNTRY === "ALL";
      });

      me.setState({ data, total: total[0].COUNTRY_TOTAL });
    });
  }

  render() {
    const chart = !this.state.data ? (
      <div className="loading"><img src={loadingGif} /></div>
    ) :
      (
        <div>
          <p>General accounting</p>
          <ItemRanking arr={this.state.data} quantity={this.props.quantity} getText={e => { return e.COUNTRY_TOTAL }} />
          <h5>Total: {this.state.total}</h5>
        </div>
      );



    return chart;
  }
}

export default MostObjects