/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./public'));
app.use(express.static('./public/Profiles'));

// Bootstrap application settings
require('./config/express')(app);

// Configure the Watson services
require('./routes/conversation')(app);
require('./routes/speech-to-text')(app);
require('./routes/text-to-speech')(app);

//configure app specific services
var login = require('./routes/login');
app.use('/', login);

var chat = require('./routes/chat');
app.use('/', chat);

var video = require('./routes/video');
app.use('/', video);

// error-handler settings
require('./config/error-handler')(app);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

////Invoke Watson Visual Recognition Service
//var watson = require('watson-developer-cloud');
//var fs = require('fs');
//var visual_recognition = watson.visual_recognition({ api_key: '294da59d8947554d69c3a53e81d1d0b04865ac36', version: 'v3', version_date: '2016-05-19' });
//var params = { images_file: fs.createReadStream('C:\\Users\\sparsa\\Downloads\\test.jpeg') };
//visual_recognition.detectFaces(params, function (err, response) {
//    if (err) console.log(err);
//    else console.log(JSON.stringify(response, null, 2));
//});

module.exports = app;