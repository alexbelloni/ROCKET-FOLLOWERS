import React, { Component } from 'react'
import './index.css';

class InformationBox extends Component {
    render() {
        const icon = this.props.icon ?
        <img src={this.props.icon} /> : ''
        return (
            <div className='central'>
                <h2>{icon} {this.props.title}</h2>
                <h6>{this.props.subtitle}</h6>
                <div className="box-component">{this.props.component}</div>
            </div>
        )
    }
}

export default InformationBox
