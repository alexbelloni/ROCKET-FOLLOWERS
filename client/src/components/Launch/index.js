import React, { Component } from 'react'
import './index.css';
import WatchIt from '../WatchIt';
//TODO: It should be an API request
import jsonTransmissions from '../WatchIt/transmissions.json';

class Launch extends Component {
    formatDate(date) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return monthNames[monthIndex].concat(' ', day, ', ', year);
    }

    handlePadClick = (id) => {
        this.props.click('launch', id);
    }

    addTransmission(videos, missionName) {
        let transms = videos || [];
        let transmission = jsonTransmissions.filter(t => {
            const name = t.NAME.toLowerCase();
            return t.TRANSMISSION_URL && missionName.toLowerCase().indexOf(name) > -1;
        });
        if (transmission && transmission.length > 0) {
            transms.push({ NAME: 'transmission', URL: transmission[0].TRANSMISSION_URL });
        }
        return transms;
    }

    render() {
        const e = this.props.launch;
        const dt = e.DATE || e.TARGETED_DATE;
        const date = new Date(dt);
        const s = this.formatDate(date);

        const owner = e.COMPANY ? (<h6 className="card-title"><i className="fas fa-building"></i> {e.COMPANY.NAME.concat(' - ', e.COMPANY.COUNTRY_CODE)}</h6>) : null;

        let location = ''
        if (e.LOCATION) {
            let maplink = '';
            if (e.LOCATION.LAT) {
                const link = 'https://www.google.ca/maps/place/' + e.LOCATION.LAT + ',' + e.LOCATION.LNG;
                maplink = (<span>| <a href={link} target="_blank"> map</a></span>);
            }            
            if (e.LOCATION.NAME && e.LOCATION.NAME.toLowerCase().indexOf('unknown') === -1) {
                location =
                    (<h6 className="card-title"><i className="fas fa-map-marker-alt"></i> {e.LOCATION.NAME.concat(' - ', e.LOCATION.COUNTRY_CODE)} {maplink}</h6>)
            }
        }

        /*
                if (e.LAT) {
                    const link = 'https://www.google.ca/maps/place/' + e.LAT + ',' + e.LNG;
                    result.push(<a href={link} target="_blank">map</a>);
                }
        */
        let pads = [];
        if (e.LOCATION && e.LOCATION.PADS) {
            pads.push(<button key={'btn1'} type="button" className="btn btn-primary" onClick={() => { this.handlePadClick(e.LOCATION.PADS[0].ID) }}>{e.LOCATION.PADS[0].NAME}</button>);
        }

        const videos = this.addTransmission(e.VIDEOS, e.MISSION);
        const watch = <WatchIt videos={videos} />;

        return (
            <div className="card w-75 light-shadow">
                <div className="card-body">
                    <h5 className="card-title">{e.MISSION}</h5>
                    <h6 className="card-title launch-date">{s}</h6>
                    <p className="card-text">{e.DESCR}</p>
                    {owner}
                    {location}
                    {pads}
                    {watch}
                </div>
            </div>
        )
    }
}

export default Launch
