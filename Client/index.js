var net = require('net');
var fs = require('fs');

const server = net.createServer(function (connection) {

    var i = 0;

    connection.on('data', (data) => {

        var read = data.toString();

        var request = read.substring(0, read.indexOf(" "));

        var url = read.substring(request.length + 1, read.indexOf(' HTTP'));

        var body = read.substring(
            read.indexOf("\n\n") == -1 ? read.indexOf("\r\n\r\n") + 4 : read.indexOf("\n\n") + 2,
            read.length);

        switch (request) {
            case 'GET':
                fs.readFile(url == '/' ? 'index.html' : '.' + url, 'utf8', (err, contents) => {
                    if (err) {
                        console.log('Error: ', read);
                        return;
                    }
                    connection.emit('write', contents)
                });
                break;
            case 'POST':

                // our data URL string from canvas.toDataUrl();
                var imageDataUrl = 'imgBase64=data:image/png;base64,' + body.substring(38);
                // declare a regexp to match the non base64 first characters
                var dataUrlRegExp = /^data:image\/\w+;base64,/;
                // remove the "header" of the data URL via the regexp
                var base64Data = imageDataUrl.replace(dataUrlRegExp, "");
                // declare a binary buffer to hold decoded base64 data
                var imageBuffer = new Buffer.from(base64Data, "base64");
                // write the buffer to the local file system synchronously
                fs.writeFileSync(`test.png`, imageBuffer);
                break;
            default:
                console.log("Error: Request Type not supported");
                console.log(read);
        }
    });


    connection.on('write', (data) => {

        var dataToWrite = data.toString();

        connection.write("HTTP/1.1 200 OK\n");
        connection.write("Content-Length:" + dataToWrite.length);
        connection.write("\n\n"); // two carriage returns
        connection.write(dataToWrite);
    })

})

const port = 3000
const host = '127.0.0.1'
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`)


function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer.from(matches[2], 'base64');

    return response;
}