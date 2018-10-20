/**
 * Countries
 */
const Country = () => {
    /**
     * Countries
     * return: {DATA, RESPONSE}
     * DATA: array of OBJs
     * OBJ: {LEGEND,NAME}
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

module.exports = Country;

