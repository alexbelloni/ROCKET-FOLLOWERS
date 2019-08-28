import React, { Component } from 'react';
import './App.css';
import InformationBox from "./containers/InformationBox";
import Launches from './containers/Launches';
import Rankings from "./containers/Rankings";
import SuperLaunchSites from './containers/SuperLaunchSites';
import Decay from './containers/Decay';
import MySky from './containers/MySky';
import reentriesIcon from './assets/re-entries.png';
import spaceportIcon from './assets/spaceport.png';
import launchIcon from './assets/launch.png';
import statisticIcon from './assets/statistic.png';


class App extends Component {
  state = {
    componentIndex: 1, element: null
  }

  handleInternalClick = (owner, e) => {
    this.setState({ componentIndex: 3, element: e });
  }

  handleClick = (index) => {
    this.setState({ componentIndex: index, element: null });
  }

  render() {
    let box = null;
    switch (this.state.componentIndex) {
      case 1: box = { title: "Launches", subtitle: "The Latest Rocket Launch Information", icon: launchIcon, component: (<Launches click={this.handleInternalClick} />) }; break;
      case 2: box = { title: "Statistics", subtitle: "Who are the rocket launchers?", icon: statisticIcon, component: <Rankings /> }; break;
      case 3: box = { title: "Spaceports", subtitle: "World’s major spaceports or cosmodromes", icon: spaceportIcon, component: (<SuperLaunchSites quantity={5} launchSiteId={this.state.element} />) }; break;
      case 4: box = { title: "Re-entries", subtitle: "How many objects decay to the point of re-entry?", icon: reentriesIcon, component: (<Decay />) }; break;
    }
    return (
      <div className="App container">
        <div className="same-line"><h2>Rocket Followers</h2><h6 className="by-team">by Datanauts | NASA Space Apps Challenge 2018</h6></div>
        <h6>Do YOU Know When the Next Rocket Launch Is? <i className="fa fa-thumbs-up"></i></h6>
        <button type="button" className="btn btn-danger btn-menu" onClick={() => { this.handleClick(1) }}>Launches</button>
        <button type="button" className="btn btn-primary btn-menu" onClick={() => { this.handleClick(3) }}>Spaceports</button>
        <button type="button" className="btn btn-warning btn-menu" onClick={() => { this.handleClick(4) }}>Re-entries</button>
        <button type="button" className="btn btn-success btn-menu" onClick={() => { this.handleClick(2) }}>Statistics</button>
        <InformationBox title={box.title} subtitle={box.subtitle} component={box.component} icon={box.icon} />
        <footer style={{ textAlign: 'center', margin: '20px' }}>
          <a href="https://2018.spaceappschallenge.org/challenges/can-you-build/when-next-rocket-launch/teams/datanauts/project" target="_blank">Our Space Apps Presentation</a> | <a href="https://alexandrebelloni.com" target="_blank">My Website</a>
        </footer>
      </div>
    );
  }
}


export default App;
