var express = require('express');
var mongoose = require('mongoose')


var app = express();

mongoose.connect('mongodb://localhost:27017/CandidCapture', { useNewUrlParser: true, useUnifiedTopology: true });


app.set("port", 3000);
app.set("view engine", "ejs")



app.use(express.static(__dirname + '/views'));

// Import my test routes into the path '/test'


var websiteRoutes = require('./web')
var imageRoutes = require('./image');
app.use('/', imageRoutes);
app.use('/web', websiteRoutes)
// app.use('/web', websiteRoutes);

app.listen(3000, () =>
    console.log(`App started on port ${app.get("port")}`)
);