import React, { Component } from 'react'
import loadingGif from '../../loading.gif';
import Launch from '../../components/Launch';

class Launches extends Component {

  state = {
    data: null,
  }

  componentDidMount() {
    const Request = require('../../Request');
    Request().get(this,'launchschedule', (me, d)=>{
      const data = d.DATA;
      me.setState({ data });
    });
  }

  getCards(arr){
    const launches = arr.map((e, i)=>{
      return (<div key={"dv-lau-"+i} className="col col-md-6"><Launch launch={e} click={this.props.click}/></div>);
    });

    return(
      <div className="row">
      {launches}
      </div>
    );
  }

  render() {
    const chart = !this.state.data ? (
      <div className="loading"><img src={loadingGif} /></div>
    ) :
      (
        <div>
          {this.getCards(this.state.data)}
        </div>
      );



    return chart;
  }
}

export default Launches