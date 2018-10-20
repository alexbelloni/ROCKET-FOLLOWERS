/**
 * Space objects launched
 */
const ObjectsLaunched = () => {
    /**
     * Space objects launched over last days
     * parameters: daysBefore (int)
     * return: {DATA, RESPONSE}
     * DATA: array of OBJs
     * OBJ: {NORAD_CAT_ID,OBJECT_TYPE,OBJECT_NAME,
     * COUNTRY,LAUNCH,SITE: e.SITE,RCS_SIZE}
     * RESPONSE: {STATUS,ERROR,TYPE};
     */
    const _getObjects = (daysBefore, callback) => {
        const postRequest = require('../api');
        const x = postRequest();

        const query =
            'https://www.space-track.org/basicspacedata/query/class/satcat/LAUNCH/>now-' + daysBefore + '/orderby/LAUNCH%20desc/emptyresult/show/format/json';

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
    /**
     * Space objects launched per year
     * parameters: daysBefore (int)
     * return: {DATA, RESPONSE}
     * DATA: array of OBJs
     * OBJ: {NORAD_CAT_ID,OBJECT_TYPE,OBJECT_NAME,
     * COUNTRY,LAUNCH,SITE: e.SITE,RCS_SIZE}
     * RESPONSE: {STATUS,ERROR,TYPE};
     */
    const _getObjectsPerYear = (year, limit, callback) => {
        const postRequest = require('../api');
        const x = postRequest();

        const query =
            'https://www.space-track.org/basicspacedata/query/class/satcat/LAUNCH_YEAR/' + year + '/orderby/LAUNCH%20desc/limit/' + limit + '/emptyresult/show';
            
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
        getObjectsPerYear: _getObjectsPerYear,
    }
}

module.exports = ObjectsLaunched;