var width = 720;
var height = 0;

var streaming = false;

var video = null;
var canvas = null;
var tinyFaceDetector = null;

function startup() {

  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');

  var streaming = false;

  var context;

  const url = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/';
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(url),
    faceapi.nets.faceLandmark68Net.loadFromUri(url),
    faceapi.nets.faceRecognitionNet.loadFromUri(url),
    faceapi.nets.faceExpressionNet.loadFromUri(url)]
  ).then(() => {
    navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

    if (navigator.mediaDevices.getUserMedia)
      navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then((stream) => video.srcObject = stream)
        .catch((e) => console.log);
    else
      navigator.getWebcam({ audio: true, video: true }, (stream) => video.srcObject = stream, () => logError("Web cam is not accessible."));

    tinyFaceDetector = new faceapi.TinyFaceDetectorOptions();
  })

  video.addEventListener('canplay', function (ev) {
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth / width);

      // Firefox currently has a bug where the height can't be read from
      // the video, so we will make assumptions if this happens.

      if (isNaN(height)) {
        height = width / (4 / 3);
      }

      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;

      context = canvas.getContext('2d');

      setInterval(async () => {
        console.log('Evaluting...')
        const detections = await faceapi.detectAllFaces(video, tinyFaceDetector).withFaceLandmarks().withFaceExpressions();
        context.drawImage(video, 0, 0, width, height);

        for (let i = 0; i < detections.length; ++i) 
          if (detections[i].expressions.happy > 0.8) {
            console.log('Posting image...');
            $.post('http://localHost:3000/image', canvas.toDataURL('image/png'));
            break;
          }

      }, 1000)

    }
  }, false);

}