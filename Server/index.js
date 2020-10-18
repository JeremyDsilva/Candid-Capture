var faceapi = require('face-api.js');

var commons = require('./commons');

var download = async function (uri, filename, callback) {

  var fs = require('fs'),
    request = require('request');

  request.head(uri, function (err, res, body) {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('finish', callback);
  });
};

async function run(img_path) {

  const img = await commons.canvas.loadImage('./in/' + img_path);
  const results = await faceapi.detectAllFaces(img, commons.faceDetectionOptions)
    .withFaceExpressions();

  results.forEach(result => {
    console.log(result.expressions);
  });

  const out = faceapi.createCanvasFromMedia(img);
  faceapi.draw.drawDetections(out, results.map(res => res.detection));
  faceapi.draw.drawFaceExpressions(out, results);

  commons.saveFile(img_path, out.toBuffer('image/jpeg'))
  console.log(`done, saved results to out/${img_path}`)

}

async function setup(clientUrl) {

  const weights_dir = 'weights';

  await commons.faceDetectionNet.loadFromDisk(weights_dir);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(weights_dir);
  await faceapi.nets.faceExpressionNet.loadFromDisk(weights_dir);

  var count = 0;

  let timerId = setInterval(() => {

    count += 1;
    download(`${clientUrl}/photo.jpg`, `./in/image_${count}.jpg`, () => {
      run(`image_${count}.jpg`);
    });

  }, 5000);
  
  setTimeout(() => { clearInterval(timerId); }, 5000 * 20);
}

const clientUrl = 'http://192.168.0.171:8080';

setup(clientUrl)