const ObjectsPredictedToDecay = () => {
    const _getObjects = (daysBefore, limit, callback) => {
        //Testing
        //const json = require('./backup.json');
        //callback(json);

        const postRequest = require('../api');
        const x = postRequest();

        const query = 
        'https://www.space-track.org/basicspacedata/query/class/decay/DECAY_EPOCH/%3Enow-' + daysBefore + '/orderby/PRECEDENCE%20asc/limit/'+limit+'/emptyresult/show';

        x.generalPost(query, (obj) => {
            console.log(obj);

            const arr = [];
            //{"NORAD_CAT_ID":"4917","OBJECT_NUMBER":"4917","OBJECT_NAME":"THORAD AGENA D DEB","INTLDES":"1970-025FP","OBJECT_ID":"1970-025FP","RCS":"0","RCS_SIZE":"SMALL",
            //"COUNTRY":"US","MSG_EPOCH":"2018-02-07 16:37:02","DECAY_EPOCH":"2019-03-23 0:00:00","SOURCE":"60day_msg","MSG_TYPE":"Prediction","PRECEDENCE":"4"}
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

