const ObjectsLaunched = () => {
    const _getObjects = (daysBefore, callback) => {
        const postRequest = require('../api');
        const x = postRequest();

        const query = 
        'https://www.space-track.org/basicspacedata/query/class/satcat/LAUNCH/>now-'+daysBefore+'/orderby/LAUNCH%20desc/emptyresult/show/format/json';

        x.generalPost(query, (obj) => {
            const arr = [];
            obj.DATA.forEach(e => {
                const o = {
                    NORAD_CAT_ID: e.NORAD_CAT_ID,
                    OBJECT_TYPE: e.OBJECT_TYPE,
                    OBJECT_NAME: e.SATNAME,
                    COUNTRY: e.COUNTRY,
                    LAUNCH: e.LAUNCH,                    
                    SITE: e.SITE,
                    RCS_SIZE: e.RCS_SIZE,
                }
                arr.push(o);
            });

            const data = { DATA: arr, RESPONSE: obj.RESPONSE };

            callback(data);            
        })
    }
    return {
        getObjects: _getObjects,
    }
}

module.exports = ObjectsLaunched;