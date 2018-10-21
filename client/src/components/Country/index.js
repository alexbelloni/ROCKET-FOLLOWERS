import React, { Component } from 'react'
import axios from 'axios';
import './index.css';
import intelsat from '../../assets/intelsat.jpg';
import questionMark from '../../assets/question_mark.jpg';
//https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3

class Country extends Component {
    state = {
        data: null
    }
    componentDidMount() {
        const me = this;
        let code = this.props.threeLetterCode;
        if (code === 'ARGN') { code = 'ARG'; }
        if (code === 'UK') { code = 'GBR'; }
        if (code === 'NKOR') { code = 'PRK'; }
        if (code === 'SKOR') { code = 'KOR'; }
        if (code === 'GREC') { code = 'GRC'; }
        if (code === 'ESA') {
            me.setState({ data: { name: 'Intelsat', flag: intelsat } });
        } else
        if (code === 'O3B') {
            me.setState({ data: { name: 'O3B NETWORKS', flag: questionMark } });
        } else          
        if (code === 'ITSO') {
            me.setState({ data: { name: 'European Space Agency', flag: 'https://www.crwflags.com/fotw/images/i/int-esa2.gif' } });
        } else        
        if (code === 'CHBZ') {
            me.setState({ data: { name: 'China/Brazil', flag: questionMark } });
        } else        
        if (code === 'SES') {
            me.setState({ data: { name: 'SOCIÉTÉ EUROPÉENNE DES SATELLITES', flag: questionMark } });
        } else         
            if (code === 'ISS') {
                me.setState({ data: { name: 'INTERNATIONAL SPACE STATION', flag: 'https://fotw.info/images/i/int_iss.gif' } });
            } else
                if (code === 'CIS') {
                    me.setState({ data: { name: 'Commonwealth of Independent States', flag: 'https://cdn6.bigcommerce.com/s-hhbbk/products/301/images/3359/CINS0001__87137.1460460638.1280.1280.png' } });
                } else {
                    /**{"name":"Brazil","topLevelDomain":[".br"],"alpha2Code":"BR","alpha3Code":"BRA","callingCodes":["55"],"capital":"Brasília",
                     * "altSpellings":["BR","Brasil","Federative Republic of Brazil","República Federativa do Brasil"],"region":"Americas","subregion":"South America",
                     * "population":206135893,"latlng":[-10.0,-55.0],"demonym":"Brazilian","area":8515767.0,"gini":54.7,"timezones":["UTC-05:00","UTC-04:00","UTC-03:00","UTC-02:00"],
                     * "borders":["ARG","BOL","COL","GUF","GUY","PRY","PER","SUR","URY","VEN"],"nativeName":"Brasil","numericCode":"076",
                     * "currencies":[{"code":"BRL","name":"Brazilian real","symbol":"R$"}],"languages":[{"iso639_1":"pt","iso639_2":"por","name":"Portuguese","nativeName":"Português"}],
                     * "translations":{"de":"Brasilien","es":"Brasil","fr":"Brésil","ja":"ブラジル","it":"Brasile","br":"Brasil","pt":"Brasil","nl":"Brazilië","hr":"Brazil","fa":"برزیل"},
                     * "flag":"https://restcountries.eu/data/bra.svg","regionalBlocs":[{"acronym":"USAN","name":"Union of South American Nations","otherAcronyms":["UNASUR","UNASUL","UZAN"],
                     * "otherNames":["Unión de Naciones Suramericanas","União de Nações Sul-Americanas","Unie van Zuid-Amerikaanse Naties","South American Union"]}],"cioc":"BRA"} */

                    axios.get('https://restcountries.eu/rest/v2/alpha/'.concat(code)).then(function (response) {
                        me.setState({ data: response.data });
                    }).catch(function (error) {
                        me.setState({ data: { name: code, flag:questionMark}});
                      });
                }
    }

    render() {
        return (
            <div className="country-div">
                <img className="country-img-mini" src={this.state.data ? this.state.data.flag : ''} />
                <span className="country-name">{this.state.data ? this.state.data.name : ''}</span>
                <span className="country-text">{this.props.text}</span>
            </div>
        )
    }
}

export default Country
