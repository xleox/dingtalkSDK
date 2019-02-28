"use strict";
const express = require('express');
const dingding = express();
const bodyParser = require('body-parser');
// const fs=Promise.promisifyAll(require('fs'));
// const path = require('path');
const router = require('./api/Rente');
const PORT = 6677;

dingding.use(bodyParser.json());
dingding.use(bodyParser.urlencoded({ extended: false }));
dingding.use(express.static('public'));
/*dingding.set("views", path.join(__dirname, "public"));
dingding.set("view engine", "ejs");*/

dingding.use('/', router);

var server = dingding.listen(PORT,"0.0.0.0", function () {
    console.log('Sever Start At Port', PORT);
});