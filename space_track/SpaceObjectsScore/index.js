const SpaceObjectsScore = () => {
    const _getObjects = (callback) => {

        const postRequest = require('../api');
        const x = postRequest();

        const query = 'https://www.space-track.org/basicspacedata/query/class/boxscore/format/json';

        x.generalPost(query, (obj) => {
            const arr = [];
            obj.DATA.forEach(e => {
                const o = {
                    COUNTRY: e.SPADOC_CD,
                    COUNTRY_DESCR: e.COUNTRY,
                    ORBITAL_PAYLOAD_COUNT: e.ORBITAL_PAYLOAD_COUNT,
                    ORBITAL_ROCKET_BODY_COUNT: e.ORBITAL_ROCKET_BODY_COUNT,
                    ORBITAL_DEBRIS_COUNT: e.ORBITAL_DEBRIS_COUNT,                    
                    ORBITAL_TOTAL_COUNT: e.ORBITAL_TOTAL_COUNT,                    
                    DECAYED_PAYLOAD_COUNT: e.DECAYED_PAYLOAD_COUNT,
                    DECAYED_ROCKET_BODY_COUNT: e.DECAYED_ROCKET_BODY_COUNT,
                    DECAYED_DEBRIS_COUNT: e.DECAYED_DEBRIS_COUNT,
                    DECAYED_TOTAL_COUNT: e.DECAYED_TOTAL_COUNT,
                    COUNTRY_TOTAL: e.COUNTRY_TOTAL,
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

module.exports = SpaceObjectsScore;

