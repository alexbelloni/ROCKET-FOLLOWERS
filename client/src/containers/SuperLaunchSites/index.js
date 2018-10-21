import React, { Component } from 'react'
import loadingGif from '../../loading.gif';
import LaunchSite from "../../components/LaunchSite";
import { HorizontalBar } from 'react-chartjs-2';
import './index.css';

let launchsite = require('./launchsite.json');

class SuperLaunchSites extends Component {

  state = {
    data: null,

  }

  componentDidMount() {
    const Request = require('../../Request');
    Request().get(this, 'objectslaunchedperyear/2018/1000', (me, d) => {
      let json = d.DATA;

      let sites = [], siteNames = '';
      json.forEach(e => {
        const obj = e; //e.DATA
        if (siteNames.indexOf(obj.SITE) === -1) {
          siteNames += ',' + obj.SITE;
          sites.push({ COUNTRY: obj.COUNTRY, SITE: obj.SITE, count: 1, "LARGE": 0, "MEDIUM": 0, "SMALL": 0, "UNKNOWN": 0 });
        } else {
          let i = -1;
          for (let j = 0; j < sites.length; j++) {
            if (sites[j].SITE === obj.SITE) {
              i = j;
              break;
            }
          }
          sites[i].count += 1;
          if (obj.RCS_SIZE) {
            sites[i][obj.RCS_SIZE] += 1;
          } else {
            sites[i]["UNKNOWN"] += 1;
          }
        }
      });

      sites.sort((a, b) => {
        if (this.props.ASC) {
          return a.count - b.count;
        } else {
          return b.count - a.count;
        }
      });

      me.setState({ data: sites, length: json.length });
    });
  }

  getRanking(arr, quantity) {
    if (!arr) {
      return {};
    }
    const visual = [], data = [];
    let q = 0, i = 0;
    while (q < quantity && i < arr.length) {
      const c = arr[i];

      let obj = {};
      for (let x = 0; x < launchsite.length; x++) {
        if (launchsite[x].legend === c.SITE) {
          obj = launchsite[x];
          break;
        }
      }
      //COUNTRY: obj.COUNTRY, SITE: obj.SITE, count: 1, "LARGE": 0, "MEDIUM": 0, "SMALL": 0, "UNKNOWN"
      visual.push(
        <div key={c.SITE} className="superlaunchsites-box left">
          <span>{c.SITE.concat(' - ', obj.name)}</span>
        </div>
      );
      data.push({ site: c.SITE, name: obj.name, count: c.count });

      q = visual.length;
      i++;
    }
    return { visual, data };
  }

  getChart(d) {
    const labels = d.map(e => {
      return e.site;
    })
    const numbers = d.map(e => {
      return e.count;
    })

    const data = {
      labels,
      datasets: [
        {
          label: 'Number of launches',
          backgroundColor: '#84ACE5',
          borderColor: '#0062cc',
          borderWidth: 1,
          hoverBackgroundColor: '#0062cc',
          hoverBorderColor: '#0062cc',
          data: numbers
        }
      ],
    };
    const options = {
      onClick: (e, item) => {
        let idx, clickedLabel;
        if (item[0]) {
          idx = item[0]._index;
        }
      }
    }

    return (
      <div>
        <HorizontalBar data={data} options={options} />
      </div >
    );
  }

  render() {

    let launchSite = null;
    const launchSiteId = this.props.launchSiteId;
    if (launchSiteId) {
      launchSite = <LaunchSite id={launchSiteId} />;
    }

    const rankingObj = this.getRanking(this.state.data, 15);

    const chart = !this.state.data ? (
      <div className="loading"><img src={loadingGif} /></div>
    ) :
      (
        <div>
          <h5>Space objects launched in 2018</h5>
          {this.getChart(rankingObj.data)}
          <div className='row superlaunchsites-footer'>
            <div className='col col-md-6'>
              {rankingObj.visual}
            </div>
            <div className='col col-md-6'>
              <h4 className="right">Total: {this.state.length}</h4>
            </div>
          </div>
        </div>
      );

    if (launchSite) {
      return (
        <div className='row'>
          <div className='col col-md-4'>
            {launchSite}
          </div>
          <div className='col col-md-8'>
            {chart}
          </div>
        </div>
      )
    }

    return (
      <div className='row'>
        <div className='col col-md-12'>
          {chart}
        </div>
      </div>
    )
  }
}

export default SuperLaunchSites
