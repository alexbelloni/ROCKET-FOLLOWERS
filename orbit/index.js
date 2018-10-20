const orbit = () => {

    const _getCountries = (callback) => {
        const Countries = require('../space_track/Countries');
        Countries().getObjects(callback);
    }

    const _getLaunchSites = (callback) => {
        const LaunchSites = require('../space_track/LaunchSites');
        LaunchSites().getObjects(callback);
    }

    const _getFamousSatellites = (callback) => {
        const FamousSatellites = require('./FamousSatellites');
        FamousSatellites().getObjects(callback);
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

    const _getObjectsDecay = (year,limit,callback) => {
        const ObjectsDecay = require('../space_track/ObjectsDecay');
        ObjectsDecay().getObjects(year,limit,(arr) => {
            callback(arr);
        })
    }

    const _getObjectsLaunched = (daysBefore,callback) => {
        const ObjectsLaunched = require('../space_track/ObjectsLaunched');
        ObjectsLaunched().getObjects(daysBefore,(arr) => {
            callback(arr);
        })
    }

    const _getObjectsLaunchedPerYear = (year, limit,callback) => {
        const ObjectsLaunched = require('../space_track/ObjectsLaunched');
        ObjectsLaunched().getObjectsPerYear(year, limit,(arr) => {
            callback(arr);
        })
    }

    const _getObjectsLowOrbit = (limit,callback) => {
        const ObjectsLowOrbit = require('../space_track/ObjectsLowOrbit');
        ObjectsLowOrbit().getObjects(limit,(arr) => {
            callback(arr);
        })
    }

    const _getLaunchSchedule = (callback) => {
        const LaunchSchedule = require('../nasa/LaunchSchedule');
        LaunchSchedule().getObjects((arr) => {
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
        getObjectsLaunchedPerYear: _getObjectsLaunchedPerYear,
        getObjectsLowOrbit: _getObjectsLowOrbit,
        getObjectsDecay: _getObjectsDecay,
        getLaunchSchedule: _getLaunchSchedule,
    }
}

module.exports = orbit;