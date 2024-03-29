/**
 * Space objects predicted to decay
 */
const ObjectsPredictedToDecay = () => {
    /**
     * Space objects predicted to decay
     * parameters: daysBefore (int), limit (int)
     * return: {DATA, RESPONSE}
     * DATA: array of OBJs
     * OBJ: {NORAD_CAT_ID,OBJECT_NAME,RCS_SIZE,
     * COUNTRY,DECAY_EPOCH}
     * RESPONSE: {STATUS,ERROR,TYPE};
     */
    const _getObjects = (daysBefore, limit, callback) => {

        const postRequest = require('../api');
        const x = postRequest();

        const query =
            'https://www.space-track.org/basicspacedata/query/class/decay/DECAY_EPOCH/%3Enow-' + daysBefore + '/orderby/PRECEDENCE%20asc/limit/' + limit + '/emptyresult/show';

        x.generalPost(query, (obj) => {
            const arr = [];
            obj.DATA.forEach(e => {
                const o = {
                    NORAD_CAT_ID: e.NORAD_CAT_ID,
                    OBJECT_NAME: e.OBJECT_NAME,
                    RCS_SIZE: e.RCS_SIZE,
                    COUNTRY: e.COUNTRY,
                    DECAY_EPOCH: e.DECAY_EPOCH,
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

module.exports = ObjectsPredictedToDecay;

