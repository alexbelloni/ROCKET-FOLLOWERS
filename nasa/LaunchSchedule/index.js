/**
 * Space objects launched
 */
const LaunchSchedule = () => {
    /**
     * Space objects launched over last days
     * parameters: daysBefore (int)
     * return: {DATA, RESPONSE}
     * DATA: array of OBJs
     * OBJ: {NORAD_CAT_ID,OBJECT_TYPE,OBJECT_NAME,
     * COUNTRY,LAUNCH,SITE: e.SITE,RCS_SIZE}
     * RESPONSE: {STATUS,ERROR,TYPE};
     */

    const _getDate = (str) => {
        let s = str;
        if (s) {
            if (s.length < 10) {
                s = s + '1, 2019';
            }
            return new Date(s);
        }

        return null;
    }

    const _getDescr = (e) => {
        if (e.missions && e.missions.length > 0) {
            return e.missions[0].description;
        }
        return '';
    }

    const _getCompany = (e) => {
        if (e.lsp) {
            return { NAME: e.lsp.name, COUNTRY_CODE: e.lsp.countryCode };
        }
        return { NAME: '', COUNTRY_CODE: '' };
    }

    const _getLocation = (e) => {
        if (e.location) {
            let loc = { NAME: e.location.name, COUNTRY_CODE: e.location.countryCode };
            const pads = e.location.pads;
            if (pads && pads.length > 0) {
                loc.LAT = pads[0].latitude;
                loc.LNG = pads[0].longitude;
                loc.PADS = pads.map(p => {
                    return { ID: p.id, NAME: p.name, LAT: p.latitude, LNG: p.longitude }
                });
            }
            return loc;
        }
        return { NAME: '', COUNTRY_CODE: '', LAT: '', LNG: '' };
    }

    const _getVideos = (e) => {
        if (e.vidURLs) {
            return e.vidURLs.map(v => {
                return { NAME: 'video', URL: v }
            });

        }
        return null;
    }

    const _createResult = (launches) => {
        const arr = [];
        let arrIds = '';

        const scheduleNasa = require('./launch.json');
        scheduleNasa.DATA.forEach(e => {
            arrIds += e.id + ',';
            arr.push(
                {
                    URL: e.url,
                    IMAGE: e.image,
                    DATE: _getDate(e.date),
                    TARGETED_DATE: _getDate(e.targetedDate),
                    WINDOW: e.window,
                    MISSION: e.mission,
                    DESCR: e.descr,
                    ID_LL: e.id,
                    COMPANY: null,
                    LOCATION: null,
                    VIDEOS: [{ NAME: 'NASA TV', URL: 'https://www.nasa.gov/multimedia/nasatv/#public' }]
                }
            );
        });

        launches.forEach(e => {
            const index = arrIds.indexOf(e.id);
            if (index >= 0) {
                arr[index].COMPANY = _getCompany(e);
                arr[index].LOCATION = _getLocation(e);
                arr[index].VIDEOS = _getVideos(e);
            } else {
                arr.push(
                    {
                        URL: '',
                        IMAGE: '',
                        DATE: _getDate(e.windowstart),
                        WINDOW: '',
                        MISSION: e.name,
                        DESCR: _getDescr(e),
                        ID_LL: e.id,
                        COMPANY: _getCompany(e),
                        LOCATION: _getLocation(e),
                        VIDEOS: _getVideos(e),
                    }
                );
            }
        });

        arr.sort((a, b) => {
            const da = a.DATE || a.TARGETED_DATE;
            const db = b.DATE || b.TARGETED_DATE;
            return da - db;
        });

        return arr;
    }

    const _getObjects = (callback) => {
        /*
        const launches = require('./launch-20181026.json');
        const arr = _createResult(launches);
        const response = { STATUS: 200, ERROR: error, TYPE: type };
        callback({ DATA: arr, RESPONSE: response });
*/
        const https = require('https');

        https.get('https://launchlibrary.net/1.4/launch/2018-10-26/2018-12-31/limit/20', (res) => {
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
                const arr = _createResult(data.launches);

                const response = { STATUS: res.statusCode, ERROR: error, TYPE: type };
                callback({ DATA: arr, RESPONSE: response });
            }).on('error', (e) => {
                console.error(e);
            });
        });
    }

    return {
        getObjects: _getObjects,
    }
}

module.exports = LaunchSchedule;