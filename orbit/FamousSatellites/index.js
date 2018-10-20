/**
 * Famous satellites
 */
const FamousSatellites = () => {
    /**
     * Famous satellites
     * return: {DATA, RESPONSE}
     * DATA: array of OBJs
     * OBJ: {NORAD_CAT_ID,OBJECT_NAME,OBJECT_TYPE,COMMENT}
     * RESPONSE: {STATUS,ERROR,TYPE};
     */
    const _getObjects = (callback) => {
        const idArr = [], json = [];
        let objs;

        objs = require('./famousSatellites.json');
        objs.forEach((e) => {
            idArr.push(e.id);
            json.push({
                "NORAD_CAT_ID": e.id,
                "OBJECT_NAME": e.satname,
                "OBJECT_TYPE": null,
                "COMMENT": e.fullname,
            });            
        });

        objs = require('./favouriteSatellites.json');
        objs.forEach(e => {
            if ( e.OBJECT_NAME && idArr.indexOf(e.NORAD_CAT_ID) === -1) {
                idArr.push(e.NORAD_CAT_ID);
                json.push({
                    "NORAD_CAT_ID": e.NORAD_CAT_ID,
                    "OBJECT_NAME": e.OBJECT_NAME,
                    "OBJECT_TYPE": e.OBJECT_TYPE,
                    "COMMENT": null,
                });
            }
        });

        objs = require('./ceosdatabase.json');
        objs.forEach(e => {
            if (idArr.indexOf(e.NORAD_CAT_ID) === -1) {
                idArr.push(e.NORAD_CAT_ID);
                json.push({
                    "NORAD_CAT_ID": e.NORAD_CAT_ID,
                    "OBJECT_NAME": e.OBJECT_NAME,
                    "OBJECT_TYPE": e.OBJECT_TYPE,
                    "COMMENT": null,
                });
            }
        });

        callback(json);
    }
    return {
        getObjects: _getObjects,
    }
}

module.exports = FamousSatellites;

