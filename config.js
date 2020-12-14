var express = require('express');
var mongoose = require('mongoose')
var mqtt = require('mqtt')

const Config = require('./models/Config')

const router = express.Router();

var client = mqtt.connect('mqtt://localhost:1883')


client.on('connect', function () {
    client.subscribe('config', function (err) {
        if (err)
            console.log(err);
        else
            console.log('connected to mqtt succesffully 2')
    })
});



router.get("/play_song", (req, res) => {
    var id = 'spotify:playlist:37i9dQZF1DX3rxVfibe1L0'
    //get from database

    Config.find().limit(1).exec((err, conf) => {
        if (err) {
            console.log(err);
            return handleError(err);
        }
        else {
            var song = conf[0].album;
            console.log(song)
            res.redirect('http://127.0.0.1:1880/play_spotify?song=' + song)
        }
    });
});

router.get("/config", (req, res) => {
    //get from database

    Config.find().limit(1).exec((err, conf) => {
        if (err) {
            console.log(err);
            return handleError(err);
        }
        else {
            res.send(conf[0]);
        }
    });
});


router.post('/config', function (req, res, next) {
    var data = "";
    req.on('data', function (chunk) { data += chunk })
    req.on('end', function () {
        req.body = JSON.parse(data);
        next();
    })
}, async (req, res) => {

    //delete all records
    Config.deleteMany({}).then(function () {
        console.log("Data deleted"); // Success 
        //add new config
        console.log(req.body.cam_state);

        if (!body.cam_freq || body.cam_freq == null)
            body.cam_freq = 2;

        if (!body.cam_state || body.cam_state == null)
            body.cam_state = true;

        if (!body.start_time || body.start_time == null)
            body.start_time = 0;

        if (!body.end_time || body.end_time == null)
            body.end_time = 24 * 60;

        Config({
            cam_state: req.body.cam_state,
            cam_freq: req.body.cam_freq,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            album: req.body.album,
        }).save((err) => {
            if (err) {
                console.log(err);
                return handleError(err);
            } else {
                console.log("successfully saved config")
                client.publish("config", "new configuration added");
                res.send();
            }
        });

    }).catch(function (error) {
        console.log(error); // Failure 
    });
});


module.exports = router;