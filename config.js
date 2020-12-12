var express = require('express');
var mongoose = require('mongoose')


var app = express();

// sample schema
// {
//     cam_state: 'true',
//     timefirst: '07:30',
//     timesecond: '02:30',
//     cam_freq: '',
//     album: ''
//   }
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


app.listen(3000, () =>
    console.log(`App started on port ${app.get("port")}`)
);