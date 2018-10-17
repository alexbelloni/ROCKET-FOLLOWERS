const orbit = () => {

    const _getCountries = (callback) => {
        const Countries = require('../space_track/Countries');
        Countries().getObjects(callback);
    }

    const _getLaunchSites = (callback) => {
        const LaunchSites = require('../space_track/LaunchSites');
        LaunchSites().getObjects(callback);
    }

    const _getFamousSatellites = () => {
        const famous = require('./famousSatellites.json');
        const favs = require('./favouriteSatellites.json');
        const idArr = [], json = [];
        famous.forEach((e) => {
            idArr.push(e.id);
            json.push({
                "NORAD_CAT_ID": e.id,
                "OBJECT_NAME": e.satname,
                "OBJECT_TYPE": null,
                "COMMENT": e.fullname,
            });            
        });
        favs.forEach(e => {
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

        return json;
    }

    const _getObjectDetails = (sats, callback) => {
        const ObjectDetails = require('./ObjectDetails');
        ObjectDetails().getDetails(sats, (arr) => {
            callback(arr);
        })
    }

    const _getSpaceObjectsScore = (callback) => {
        const SpaceObjectsScore = require('../space_track/SpaceObjectsScore');
        SpaceObjectsScore().getObjects(callback);
    }

    const _getObjectsPredictedToDecayWithLatLng = (daysBefore,limit,callback) => {
        const ObjectsPredictedToDecay = require('../space_track/ObjectsPredictedToDecay');
        ObjectsPredictedToDecay().getObjects(daysBefore,limit,(arr) => {
            callback(arr);
        })
    }

    const _getObjectsLaunched = (daysBefore,callback) => {
        const ObjectsLaunched = require('../space_track/ObjectsLaunched');
        ObjectsLaunched().getObjects(daysBefore,(arr) => {
            callback(arr);
        })
    }

    const _getObjectsLowOrbit = (limit,callback) => {
        const ObjectsLowOrbit = require('../space_track/ObjectsLowOrbit');
        ObjectsLowOrbit().getObjects(limit,(arr) => {
            callback(arr);
        })
    }

    return {
        getCountries: _getCountries,
        getLaunchSites: _getLaunchSites,
        getFamousSatellites: _getFamousSatellites,
        getObjectDetails: _getObjectDetails,
        getSpaceObjectsScore: _getSpaceObjectsScore,
        getObjectsPredictedToDecayWithLatLng: _getObjectsPredictedToDecayWithLatLng,
        getObjectsLaunched: _getObjectsLaunched,
        getObjectsLowOrbit: _getObjectsLowOrbit,
    }
}

module.exports = orbit;