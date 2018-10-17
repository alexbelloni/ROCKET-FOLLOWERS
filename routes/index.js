'use strict'

const express = require('express');
const router = express.Router();

const Orbit = require('../orbit');
const orbit = Orbit();

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

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Orbit Server",
        version: "0.0.2",
        description: "Space Apps 2018 project",
    });
});

//Launch sites (with lat and lng) (count: 34)
router.get('/launchsites', (req, res, next) => {
    orbit.getLaunchSites((obj) => {
        res.status(200).send(obj);
        res.end();
    });
});

//Countries that launch objects (count: 98)
router.get('/countries', (req, res, next) => {
    orbit.getCountries((obj) => {
        res.status(200).send(obj);
        res.end();
    });
});

//Famous space objects
router.get('/famoussatellites', (req, res, next) => {
    const obj = orbit.getFamousSatellites();
    res.status(200).send(obj);
    res.end();
});

//Famous space objects (with lat and lng)
router.get('/famoussatelliteslatlng/:page', (req, res, next) => {

    let sats = orbit.getFamousSatellites();

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

//Objects decayed or predicted to decay
router.get('/objectspredictedtodecay/:daysbefore/:limit', (req, res, ext) => {
    const daysbefore = parseInt(req.params.daysbefore);
    const limit = parseInt(req.params.limit);

    orbit.getObjectsPredictedToDecayWithLatLng(daysbefore, limit, (obj) => {
        res.status(200).send(obj);
        res.end();
    });
});

//Objects launched
router.get('/objectslaunched/:daysbefore', (req, res, next) => {
    const daysbefore = parseInt(req.params.daysbefore);
    orbit.getObjectsLaunched(daysbefore, (obj) => {
        res.status(200).send(obj);
        res.end();
    });
});

//Objects in low Earth orbit. 
router.get('/objectsloworbit/:limit', (req, res, next) => {
    const limit = req.params.limit ? parseInt(req.params.limit) : 15;
    orbit.getObjectsLowOrbit(limit, (obj) => {
        res.status(200).send(obj);
        res.end();
    });
});

//Objects in low Earth orbit. 
router.get('/spaceobjectsscore', (req, res, next) => {
    orbit.getSpaceObjectsScore((obj) => {
        res.status(200).send(obj);
        res.end();
    });
});

module.exports = router;