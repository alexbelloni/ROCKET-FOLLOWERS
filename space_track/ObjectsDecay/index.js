/**
 * Space objects decayed
 */
const ObjectsDecay = () => {
    /**
     * Space objects decayed per year
     * parameters: year (int yyyy), limit (int)
     * return: {DATA, RESPONSE}
     * DATA: {NORAD_CAT_ID,OBJECT_NAME,RCS_SIZE,COUNTRY,DECAY}
     * RESPONSE: {STATUS,ERROR,TYPE};
     */
    const _getObjects = (year, limit, callback) => {
        const postRequest = require('../api');
        const x = postRequest();

        const query =
            'https://www.space-track.org/basicspacedata/query/class/satcat/DECAY/%3E' + year + '-01-01,%3C' + year + '-12-31/orderby/DECAY%20desc/limit/' + limit + '/emptyresult/show';

        x.generalPost(query, (obj) => {
            const arr = [];
            obj.DATA.forEach(e => {
                const o = {
                    NORAD_CAT_ID: e.NORAD_CAT_ID,
                    OBJECT_NAME: e.OBJECT_NAME,
                    RCS_SIZE: e.RCS_SIZE,
                    COUNTRY: e.COUNTRY,
                    DECAY: e.DECAY,
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

module.exports = ObjectsDecay;

