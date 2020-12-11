var express = require('express'),
    app = express();

var app = express();
app.set("port", 3000);

var imageRoutes = require('./image.js');

app.use(express.static(__dirname + '/public'));

// Import my test routes into the path '/test'
app.use('/', imageRoutes);

app.listen(3000, () =>
    console.log(`App started on port ${app.get("port")}`)
);