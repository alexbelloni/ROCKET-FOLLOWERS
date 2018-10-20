'use strict'

const express = require('express');
const router = express.Router();

const Orbit = require('../orbit');
const orbit = Orbit();

const testing = true;

const getPaginationLimit = (page, totalItems) => {
    const perPage = 100;
    const p = page - 1;
    let start = perPage * p;
    start = (start < totalItems) ? start : -1;
    let end = -1
    if (start >= 0) {
        end = (start + perPage);
        end = end < totalItems ? end : totalItems - 1;
    }

    return { start, end };
}

const addCORS = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
}

router.get('/', (req, res, next) => {
    addCORS(res);
    res.status(200).send({
        title: "Orbital Perspective Server",
        version: "0.0.2",
        description: "Space Apps 2018 project",
    });
});

router.get('/launchsites', (req, res, next) => {
    addCORS(res);
    orbit.getLaunchSites((obj) => {
        res.status(200).send(obj);
        res.end();
    });
});

router.get('/countries', (req, res, next) => {
    addCORS(res);
    orbit.getCountries((obj) => {
        res.status(200).send(obj);
        res.end();
    });
});

router.get('/famoussatellites', (req, res, next) => {
    addCORS(res);
    const obj = orbit.getFamousSatellites((obj) => {
        res.status(200).send(obj);
        res.end();
    });
});

router.get('/famoussatelliteslatlng/:page', (req, res, next) => {
    addCORS(res);
    let sats = orbit.getFamousSatellites((obj) => {

        let sats = obj;

        const pagination = getPaginationLimit(parseInt(req.params.page), sats.length);

        if (pagination.start === -1) {
            res.status(200).send(null);
            res.end();
        } else {
            sats = sats.slice(pagination.start, pagination.end);

            orbit.getObjectDetails(sats, (obj) => {
                res.status(200).send(obj);
                res.end();
            });
        }

    });
});

/**
 * Space objects predicted to decay
 * parameters: daysBefore (int), limit (int)
 * return: {DATA, RESPONSE}
 * DATA: array of OBJs
 * OBJ: {DATA,LAT_LNG}
 * DATA: {NORAD_CAT_ID,OBJECT_NAME,RCS_SIZE,
 * COUNTRY,DECAY_EPOCH}
 * LAT_LNG: {lat,lng}
 * RESPONSE: {STATUS,ERROR,TYPE};
 */
router.get('/objectspredictedtodecay/:daysbefore/:limit', (req, res, ext) => {
    addCORS(res);
    const daysbefore = parseInt(req.params.daysbefore);
    const limit = parseInt(req.params.limit);

    orbit.getObjectsPredictedToDecayWithLatLng(daysbefore, limit, (arr) => {

        orbit.getObjectDetails(arr.DATA, (obj) => {
            res.status(200).send(obj);
            res.end();
        });
    });
});

router.get('/objectsdecay/:year/:limit', (req, res, ext) => {
    addCORS(res);

    if (testing) {
        const obj = require('../space_track/ObjectsDecay/backup.json');
        res.status(200).send(obj);
        res.end();
    } else {
        const year = parseInt(req.params.year);
        const limit = parseInt(req.params.limit);

        orbit.getObjectsDecay(year, limit, (obj) => {
            res.status(200).send(obj);
            res.end();
        });
    }
});

/**
 * Space objects launched
 * parameters: daysBefore (int)
 * return: {DATA, RESPONSE}
 * DATA: array of OBJs
 * OBJ: {DATA,LAT_LNG}
 * DATA: {NORAD_CAT_ID,OBJECT_TYPE,OBJECT_NAME,
 * COUNTRY,LAUNCH,SITE,RCS_SIZE}
* LAT_LNG: {lat,lng}
* RESPONSE: {STATUS,ERROR,TYPE};
*/
router.get('/objectslaunchedlatlng/:daysbefore', (req, res, next) => {
    addCORS(res);

    if (testing) {
        const obj = require('../space_track/ObjectsLaunched/backup.json');
        res.status(200).send(obj);
        res.end();
    } else {
        const daysbefore = parseInt(req.params.daysbefore);
        orbit.getObjectsLaunched(daysbefore, (arr) => {
            orbit.getObjectDetails(arr.DATA, (obj) => {
                res.status(200).send(obj);
                res.end();
            });
        });
    }
});

/**
 * Space objects launched per year
 * parameters: daysBefore (int)
 * return: {DATA, RESPONSE}
 * DATA: array of OBJs
 * OBJ: {DATA,LAT_LNG}
 * DATA: {NORAD_CAT_ID,OBJECT_TYPE,OBJECT_NAME,
 * COUNTRY,LAUNCH,SITE,RCS_SIZE}
* LAT_LNG: {lat,lng}
* RESPONSE: {STATUS,ERROR,TYPE};
*/
router.get('/objectslaunchedperyearlatlng/:year/:limit', (req, res, next) => {
    addCORS(res);

    if (testing) {
        const obj = require('../space_track/ObjectsLaunched/backupPerYear.json');
        res.status(200).send(obj);
        res.end();
    } else {
        const year = parseInt(req.params.year);
        const limit = parseInt(req.params.limit);
        orbit.getObjectsLaunchedPerYear(year, limit, (arr) => {
            orbit.getObjectDetails(arr.DATA, (obj) => {
                res.status(200).send(obj);
                res.end();
            });
        });
    }
});

/**
 * Space objects in low orbit
 * parameters: limit (int)
 * return: {DATA, RESPONSE}
 * DATA: array of OBJs
  * OBJ: {DATA,LAT_LNG}
 * DATA: {NORAD_CAT_ID,OBJECT_TYPE,OBJECT_NAME,
 * COUNTRY,RCS_SIZE}
* LAT_LNG: {lat,lng}
 * RESPONSE: {STATUS,ERROR,TYPE};
 */
router.get('/objectsloworbitlatlng/:limit', (req, res, next) => {
    addCORS(res);
    const limit = req.params.limit ? parseInt(req.params.limit) : 15;
    orbit.getObjectsLowOrbit(limit, (arr) => {
        orbit.getObjectDetails(arr.DATA, (obj) => {
            res.status(200).send(obj);
            res.end();
        });
    });
});

router.get('/spaceobjectsscore', (req, res, next) => {
    addCORS(res);

    if (testing) {
        const obj = require('../space_track/SpaceObjectsScore/backup.json');
        res.status(200).send(obj);
        res.end();
    } else {
        orbit.getSpaceObjectsScore((obj) => {
            res.status(200).send(obj);
            res.end();
        });
    }
});

router.get('/launchschedule', (req, res, next) => {
    addCORS(res);

    orbit.getLaunchSchedule((obj) => {
        res.status(200).send(obj);
        res.end();
    });
});

module.exports = router;