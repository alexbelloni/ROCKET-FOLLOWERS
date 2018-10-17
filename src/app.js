'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const router = express.Router();

//Routes
const generalRoute = require('../routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', generalRoute);

module.exports = app;