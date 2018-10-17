const ObjectDetails = () => {
    const getIds = (sats) => {
        let ids = '';
        sats.forEach(e => {
            if (e.NORAD_CAT_ID)
                ids += ','.concat(e.NORAD_CAT_ID);
        });
        ids = ids.substr(1);
        return ids;
    }

    const convertTle = (sats, tleStr) => {
        const TLEJS = require('tle.js');
        const tle = new TLEJS();

        const id = tle.getSatelliteNumber(tleStr);
        sats.filter((e) => {
            return id === (e.NORAD_CAT_ID);
        })

        let latLng = '';
        try {
            latLng = tle.getLatLon(tleStr);
            return { DATA: sats[0], LAT_LNG: latLng };
        } catch (e) {
            return { ERROR: e };
        }
    }

    const _getDetails = (sats, callback) => {
        const postRequest = require('../../space_track/api');
        const x = postRequest();

        const query = 'https://www.space-track.org/basicspacedata/query/class/tle_latest/ORDINAL/1/NORAD_CAT_ID/' + getIds(sats) + '/format/tle';

        x.generalPost(query, (tles) => {
            const arr = [];

            let line = '', line1 = '', line2 = '';
            const tleStr = tles.DATA + '\n';
            
            for (i = 0; i < tleStr.length; i++) {
                if (tleStr[i].charCodeAt(0) === 10) {
                    if (!line1) {
                        line1 = line;
                    } else {
                        line2 = line;

                        const obj = convertTle(sats, line1 + '\n' + line2);
                        arr.push(obj);

                        line1 = '';
                        line2 = '';
                    }
                    line = '';
                } else {
                    line += tleStr[i];
                }
            }

            const data = { DATA: arr, RESPONSE: tles.RESPONSE };

            callback(data);
        })
    }
    return {
        getDetails: _getDetails,
    }
}

module.exports = ObjectDetails;

