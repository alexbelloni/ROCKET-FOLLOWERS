import React, { Component } from 'react'

export class WatchIt extends Component {
  render() {

    const videos = this.props.videos.map((e, i) => {
      return <div key={'vid-'+i}><a href={e.URL} target="_blank">transmissions {i + 1}</a></div>
    });

    return (
      <div>
        {videos}
      </div>
    )
  }
}

export default WatchIt
