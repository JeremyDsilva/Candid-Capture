const video = document.getElementById('video'); const url = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/';
Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri(url), faceapi.nets.faceLandmark68Net.loadFromUri(url), faceapi.nets.faceRecognitionNet.loadFromUri(url), faceapi.nets.faceExpressionNet.loadFromUri(url)]).then(() => {
  navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  if (navigator.mediaDevices.getUserMedia)
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => video.srcObject = stream)
      .catch(function (e) { logError(e.name + ": " + e.message); });
  else navigator.getWebcam({ audio: true, video: true }, (stream) => video.srcObject = stream, () => logError("Web cam is not accessible."));
})

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize);
  var tinyFaceDetector = new faceapi.TinyFaceDetectorOptions();
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, tinyFaceDetector).withFaceLandmarks().withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    var data = canvas.toDataURL();

    $.post('http://127.0.0.1:3000/picture',
    {
      imgBase64: data
    }, function (o) {
      console.log('saved');
    });

  }, 100)
}
)

function post(data) {
 

}