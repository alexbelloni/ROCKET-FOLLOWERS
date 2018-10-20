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
    return {
        getObjects: _getObjects,
    }
}

module.exports = LaunchSites;

