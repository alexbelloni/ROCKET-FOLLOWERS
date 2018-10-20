/**
 * Launch sites
 */
const LaunchSites = () => {
    /**
     * Launch sites
     * return: {DATA, RESPONSE}
     * DATA: array of OBJs
     * OBJ: {DATA, LAT_LNG}
     * DATA:{NORAD_CAT_ID,OBJECT_NAME,OBJECT_TYPE,COMMENT}
     * LAT_LNG:{lat,lng}
     * RESPONSE: {STATUS,ERROR,TYPE};
     */
    const _getObjects = (callback) => {
        const json = require('./backup.json');
        callback(json);
    }

    const _improveSiteName = (name)=>{
        if(name.indexOf('Cape Canaveral') > -1){
            return name.concat(' (ex AFETR)');
        }
        return name;
    }

    const _createResult = (objs)=>{
        let launchSite = null;
        if(objs.length > 0){   
            const obj = objs[0];
            let agencies = '', countryCode = '';         
            if(obj.agencies && obj.agencies.length>0){
                obj.agencies.forEach(e => {
                    agencies += ','.concat(e.name,'(',e.abbrev,')');
                    countryCode = e.countryCode;
                });
                agencies = agencies.substr(1);
            }
            launchSite = {
                ID: obj.id,
                NAME: _improveSiteName(obj.name),
                LAT: obj.latitude,
                LNG: obj.longitude,
                AGENCIES: agencies,
                COUNTRY_CODE: countryCode,
            }
        }
        return launchSite;
    }

    const _getObjectPerId = (id, callback) =>{

        const https = require('https');

        https.get('https://launchlibrary.net/1.4/pad/'+id, (res) => {
            let chunks = [];
            res.on('data', (d) => {
                chunks.push(d);
            }).on('end', () => {
                const buf = Buffer.concat(chunks);
                let bufStr = buf.toString().trim();

                let data, type = 'json', error = '';
                try {
                    data = JSON.parse(bufStr);
                } catch (e) {
                    data = bufStr;
                    error = e;
                    type = 'text';
                }
                const arr = _createResult(data.pads);

                const response = { STATUS: res.statusCode, ERROR: error, TYPE: type };
                callback({ DATA: arr, RESPONSE: response });
            }).on('error', (e) => {
                console.error(e);
            });
        });
    }
    return {
        getObjects: _getObjects,
        getObjectPerId: _getObjectPerId,
    }
}

module.exports = LaunchSites;

