var express = require("express");
var mqtt = require('mqtt')

const router = express.Router();

const Image = require('./models/Images')


/**
  _____                                 
 |_   _|                                
   | |  _ __ ___   __ _  __ _  ___  ___ 
   | | | '_ ` _ \ / _` |/ _` |/ _ \/ __|
  _| |_| | | | | | (_| | (_| |  __/\__ \
 |_____|_| |_| |_|\__,_|\__, |\___||___/
                         __/ |          
                        |___/           
 
 **/


var client = mqtt.connect('mqtt://localhost:1883')


client.on('connect', function () {
    client.subscribe('candid', function (err) {
        if (err)
            console.log(err);
        else
            console.log('connected to mqtt succesffully')
    })
});


//get id of photos
router.get("/image/date/:date", async (req, res) => {
    //get new Image ids after x date
    var xdate = new Date(req.params.date * 1000);
    console.log(xdate);

    Image.find({ "date": { "$gt": xdate } }, '_id', function (err, photoIdArray) {

        urlArray = new Array();
        var response = {
            message: [],
            status: "success"
        };

        if (err) {
            console.log(err);
            response.status = "failure";
        }
        else {

            const url = "http://localHost:3000/image/"

            for (let i = 0; i < photoIdArray.length; ++i) {
                response.message.push(url + photoIdArray[i]._id);
            }

        }

        res.send(response);

    });

});

//get the photo of an id
router.get("/image/:id", async (req, res) => {

    var id = req.params.id;

    Image.findById(id, function (err, record) {

        if (err) {
            res.send(`failed`);
            return;
        }

        img = record.image;

        console.log("hiuhoiio")

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        }).end(img);

    });
});

//post image
router.post("/image", function (req, res, next) {
    var data = "";
    req.on('data', function (chunk) { data += chunk })
    req.on('end', function () {
        req.rawBody = data;
        next();
    })
}, async (req, res) => {

    image = new Image({
        date: new Date(),
        image: Buffer.from(req.rawBody.replace('data:image/png;base64,', ''), 'base64')
    });

    image.save().then( async () => {res.send({"status" : "success"});
    client.publish("candid", "new pic");
    console.log('publish')
});

    

});

module.exports = router;



