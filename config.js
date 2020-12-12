var express = require('express');
var mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/CandidCapture', { useNewUrlParser: true, useUnifiedTopology: true });

const Config = require('./models/Config')

var app = express();

app.post("/", function (req, res, next) {
    var data = "";
    req.on('data', function (chunk) { data += chunk })
    req.on('end', function () {
        req.body  = JSON.parse(data);
        next();
    })
}, function (req, res) {
    console.log(req.body)
});

app.get("/play_song", (req, res) =>{
    var id =   'spotify:playlist:37i9dQZF1DX3rxVfibe1L0'
    //get from database

    Config.find().limit(1).exec((err, conf) => {
        if (err) {
            console.log(err);
            return handleError(err);
        }
        else {
            var song = conf[0].album;
            console.log(song)
            res.redirect('http://127.0.0.1:1880/play_spotify?song='+song)
        }
    });
});


app.post('/save_config', async(req, res)=>{

 //delete all records
 Config.deleteMany({}).then(function(){ 
    console.log("Data deleted"); // Success 

}).catch(function(error){ 
    console.log(error); // Failure 
}); 

 //add new config
    Config({

        cam_state: true,
        cam_freq: 199,
        start_time: new Date().getTime()-1,
        end_time: new Date().getTime(),
        album: 'spotify:playlist:37i9dQZF1DX3rxVfibe1L0',
        // cam_state: req.body.cam_state,
        // cam_freq: req.body.cam_freq,
        // start_time: req.body.start_time,
        // end_time: req.body.end_time,
        // album: req.body.album,
    }).save((err) => {
        if (err) {
            console.log(err);
            return handleError(err);
        } else {
            console.log("successfully saved config")
        }
    });
})


app.listen(3000, () =>
    console.log(`App started on port ${app.get("port")}`)
);