import React, { Component } from 'react'
import loadingGif from '../../loading.gif';
import Country from '../Country'

class LaunchSite extends Component {
  state = {
    data: null,
  }

  componentDidMount() {
    const id = this.props.id;
    if (id) {
      const Request = require('../../Request');
      Request().get(this, 'launchsites/' +id, (me, d) => {
        //{"DATA":{"ID":12,"NAME":"Launch Area 4?, Jiuquan",
        //"AGENCIES":"People's Liberation Army(PLA),China National Space Administration(CNSA)","COUNTRY_CODE":"CHN"}}
        const data = d.DATA;
        me.setState({ data });
      });
    }
  }

  render() {

    const result = [];
    const e =this.state.data;
    if(!e){
      result.push( <div className="loading"><img src={loadingGif} /></div>);
    } else {
      result.push(<div><h5 className="left">{e.NAME}</h5><Country threeLetterCode={e.COUNTRY_CODE}/></div>);
      result.push(<p className="left">{e.AGENCIES}</p>);     
      if (e.LAT) {
          const link = 'https://www.google.ca/maps/place/' + e.LAT + ',' + e.LNG;
          result.push(<a href={link} target="_blank">map</a>);
      }
    }

    return <div>
      {result}
      </div>;
  }
}

export default LaunchSite
