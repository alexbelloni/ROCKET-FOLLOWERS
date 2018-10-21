import React, { Component } from 'react'
import cheapRuler from 'cheap-ruler';
import loadingGif from '../../loading.gif';
const objectsLatLng = require('../FamousObjects/objectsLatLng.json');

class MySky extends Component {
    state = {
        famous: null,
    }

    componentDidMount() {
        const Request = require('../../Request');
        Request().get(this, 'famoussatelliteslatlng/1', (me, d) => {
            const data = d.DATA;
            me.setState({ famous: data });
        });
    }

    getMyLocation() {
        var myLocation = {
            lat: 43.706716,
            lng: -79.394495
        };
        return myLocation;
    }

    isInMySky(latLngArr, distance) {

        const myLocation = this.getMyLocation();

        var ruler = cheapRuler(myLocation.lat);
        var bbox = ruler.bufferPoint([myLocation.lat, myLocation.lng], distance);

        const arr = [];
        arr.push((<p>around {distance} km</p>));

        
        latLngArr.forEach(e => {
            if(ruler.insideBBox([e.LAT_LNG.lat, e.LAT_LNG.lng], bbox)){
                arr.push((<p>{e.DATA.OBJECT_NAME}</p>));
            }
            
        });
        return arr;
    }

    render() {

        if (!this.state.famous) {
            return (<div className="loading"><img src={loadingGif} /></div>);
        } else {
            const lis = [];
            const famous = this.state.famous;
            famous.forEach((e) => {
                const comment = e.DATA.COMMENT ? (<span><br />{e.DATA.COMMENT}</span>) : '';
                const type = e.DATA.OBJECT_TYPE ? ' ['+e.DATA.OBJECT_TYPE+']' : '';

                lis.push(<li key={e.DATA.NORAD_CAT_ID}>
                    {e.DATA.OBJECT_NAME + type + ' | ' + e.LAT_LNG.lat + ',' + e.LAT_LNG.lng}
                    {comment}</li>);

            });

            const sky = this.isInMySky(famous, 1800);

            return (<div><span>Famous Satellites</span><ul>{lis}</ul>{'total: ' + lis.length}
            <br/>
            <span>In my sky:</span>
            {sky}
            </div>)
        }

    }
}

export default MySky
