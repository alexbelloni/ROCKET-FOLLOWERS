const axios = require('axios');

const Request = () => {
    const _get = (me, urlMethod, callback) => {
        const host = 
        'https://orbital-perspective.herokuapp.com/';
        //'http://localhost:3002/';

        var authOptions = {
            method: 'GET',
            url: host + urlMethod,
            headers: {
                'Content-Type': 'application/json'
            },
            json: true
        };

        axios(authOptions)
            .then(function (response) {
                callback(me, response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    return {
        get: _get
    }
}

module.exports = Request;