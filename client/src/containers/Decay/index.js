import React, { Component } from 'react'
import loadingGif from '../../loading.gif';
import largeIcon from '../../assets/large.png';
import mediumIcon from '../../assets/medium.png';
import smallIcon from '../../assets/small.png';

class Decay extends Component {

  state = {
    data: null, length: 0
  }

  componentDidMount() {
    const Request = require('../../Request');
    Request().get(this, 'objectsdecay/2018/1000', (me, d) => {
      const decay = d.DATA;
      let obj = {}, sizes = '';
      decay.forEach(e => {
        if (!obj.hasOwnProperty(e.RCS_SIZE)) { obj = { ...obj, [e.RCS_SIZE]: 1 } } else obj[e.RCS_SIZE] += 1;
        if (!obj.hasOwnProperty(e.OBJECT_TYPE)) { obj = { ...obj, [e.OBJECT_TYPE]: 1 } } else obj[e.OBJECT_TYPE] += 1;
        if(sizes.indexOf(e.RCS_SIZE)===-1) sizes += e.RCS_SIZE;
      });
      me.setState({ data: obj, length: decay.length });

      Request().get(this, 'famoussatellites', (me, d) => {
        const sats = [];
        d.forEach(e => {
          const sat = decay.filter(d => {
            return parseInt(d.NORAD_CAT_ID) === parseInt(e.NORAD_CAT_ID);
          });
          if (sat.length > 0) {
            sats.push(sat[0]);
          }
        });
        //0: {NORAD_CAT_ID: "37820", OBJECT_NAME: "TIANGONG 1", RCS_SIZE: "LARGE", COUNTRY: "PRC", DECAY: "2018-04-02"}1: {NORAD_CAT_ID: "25346", OBJECT_NAME: "IRIDIUM 75", RCS_SIZE: "LARGE", COUNTRY: "US", DECAY: "2018-07-10"}length: 2__proto__: Array(0)
        me.setState({ famous: sats });
      });
    });
  }

  render() {
    if (!this.state.data) {
      return <div className="loading"><img src={loadingGif} /></div>
    } else {
      console.log(this.state.data);
      const famous = !this.state.famous ? '' :
        this.state.famous.map(e => {
          return (
            <div className="card decay-card-famous">
              <div className="card-body">
                <h5 className="card-title">{e.OBJECT_NAME}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{e.DECAY}</h6>
                <p className="card-text">{e.RCS_SIZE}</p>
              </div>
            </div>
          )
        });

      return (
        <div>
          <p>In 2018</p>
          <div className="row">
            <div className="col col-md-6 light-shadow decay-col">
              <h5>Objects per Size</h5>
              <p><img src={largeIcon} /> LARGE: {this.state.data.LARGE}</p>
              <p><img src={mediumIcon} /> MEDIUM: {this.state.data.MEDIUM}</p>
              <p><img src={smallIcon} /> SMALL: {this.state.data.SMALL}</p>
              <p>UNKNOWN SIZE: {this.state.data.null}</p>
              <h5>Total: {this.state.length}</h5>
            </div>
            <div className="col col-md-6 light-shadow decay-col">
              <h5>Famous Objects</h5>
              <p>{famous}</p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Decay