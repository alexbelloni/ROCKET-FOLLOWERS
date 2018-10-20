/**
 * Space objects in low orbit
 */
const ObjectsLowOrbit = () => {
    /**
     * Space objects in low orbit
     * parameters: limit (int)
     * return: {DATA, RESPONSE}
     * DATA: array of OBJs
     * OBJ: {NORAD_CAT_ID,OBJECT_TYPE,OBJECT_NAME,
     * COUNTRY,RCS_SIZE}
     * RESPONSE: {STATUS,ERROR,TYPE};
     */
    const _getObjects = (limit, callback) => {

        const postRequest = require('../api');
        const x = postRequest();

        const query = 'https://www.space-track.org/basicspacedata/query/class/satcat/PERIOD/<128/DECAY/null-val/CURRENT/Y/orderby/PERIOD asc/limit/' + limit + '/emptyresult/show';

        x.generalPost(query, (obj) => {
            const arr = [];

            obj.DATA.forEach(e => {
                const o = {
                    NORAD_CAT_ID: e.NORAD_CAT_ID,
                    OBJECT_TYPE: e.OBJECT_TYPE,
                    OBJECT_NAME: e.SATNAME,
                    COUNTRY: e.COUNTRY,
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

module.exports = ObjectsLowOrbit;

