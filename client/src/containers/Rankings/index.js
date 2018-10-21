import React, { Component } from 'react'
import ObjectSizesLaunched from '../ObjectSizesLaunched';
import MostObjects from '../MostObjects';

class Rankings extends Component {
    render() {
        const quantity = 10;

        return (
            <div className="row">
                <div className="col col-md-4">
                    <h5>Top 10 Rocket Launchers</h5>
                    <MostObjects quantity={quantity} />
                </div>
                <div className="col col-md-4">
                    <h5>Top 10 Largest Rocket Launchers</h5>
                    <ObjectSizesLaunched size="LARGE" quantity={quantity} year="2018"/>
                </div>
                <div className="col col-md-4">
                    <h5>Top 10 Smallest Rocket Launchers</h5>
                    <ObjectSizesLaunched size="SMALL" quantity={quantity}  year="2018"/>
                </div>
            </div>
        )
    }
}

export default Rankings
