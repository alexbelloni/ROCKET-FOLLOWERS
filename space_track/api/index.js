const postRequest = () => {

    const _post = (ids, callback) => {
        const querystring = require('querystring');
        const https = require('https');

        var postData = querystring.stringify({
            'identity': 'alexbelloni@outlook.com',
            'password': 'WV3aW5kpst8uazVz',
            'query': 'https://www.space-track.org/basicspacedata/query/class/tle_latest/ORDINAL/1/NORAD_CAT_ID/' + ids + '/format/tle'
        });

        var options = {
            hostname: 'www.space-track.org',
            port: 443,
            path: '/ajaxauth/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length
            }
        };

        var req = https.request(options, (res) => {
            res.on('data', (d) => {
                callback(d);
            });
        });

        req.on('error', (e) => {
            console.error(e);
        });

        req.write(postData);
        req.end();
    }

    const _generalPost = (query, callback) => {
        const querystring = require('querystring');
        const https = require('https');

        var postData = querystring.stringify({
            'identity': 'alexbelloni@outlook.com',
            'password': 'WV3aW5kpst8uazVz',
            'query': query
        });

        var options = {
            hostname: 'www.space-track.org',
            port: 443,
            path: '/ajaxauth/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length
            }
        };

        var req = https.request(options, (res) => {
            let chunks = [];
            res.on('data', (d) => {
                chunks.push(d);
            }).on('end', () => {
                const buf = Buffer.concat(chunks);
                let bufStr = buf.toString().trim();

                let data, type='json', error='';
                try{
                    data = JSON.parse(bufStr);
                }catch(e){ 
                    data = bufStr;
                    error=e;
                    type='text';
                }  

                const response = {STATUS: res.statusCode, ERROR: error, TYPE: type};
                callback({DATA: data, RESPONSE: response});
            });
        });

        req.on('error', (e) => {
            console.error(e);
        });

        req.write(postData);
        req.end();
    }

    return {
        post: _post,
        generalPost: _generalPost,
    }

}

module.exports = postRequest;

