
var cam_state, cam_freq, start_time, end_time;

$(document).ready(function () {
  var canvas = document.getElementById('canvas');
  console.log('start');

  var load_time = 
  load_time = load_time.getHours()+':'+load_time.getMinutes()+':'+load_time.getSeconds();


//   var cdate = new Date() 
// undefined
// var ddate = new Date(
//     cdate.getUTCFullYear(),
//     cdate.getUTCMonth(),
//     cdate.getUTCDate(),
//     0,
//     0, 
//     0
//   ).getTime(); 
// undefined
// (cdate - ddate)
// 96707438
// (cdate - ddate)/1000

  /**
   *  write ajax call save config in a variable 
   * 
   */

  $.get("/get_config", function (data) {

    cam_state = data.cam_state
    cam_freq = data.cam_freq
    start_time = data.start_time
    end_time = data.end_time

    console.log(data)

    //if within on time
    if (load_time>=start_time && load_time<end_time && cam_state){
      faceDetectionStartup();
      phraseDetectionStartup();
      // refresh page when end time 
    } else  {
    // start time refresh the page
    }

  });

  console.log(load_time);

   // goes within call back of ajax call

  // start time 
 


});

function postImage() {
  console.log('Posting image...');
  $.post('http://localHost:3000/image', canvas.toDataURL('image/png'));
}

function faceDetectionStartup() {
  var streaming = false;

  var tinyFaceDetector = null;

  var width = 720;
  var height = 0;

  const video = document.getElementById('video');
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
      navigator.mediaDevices.getUserMedia({ audio: false, video: true })
        .then((stream) => video.srcObject = stream)
        .catch((e) => console.log);
    else
      navigator.getWebcam({ audio: false, video: true }, (stream) => video.srcObject = stream, () => logError("Web cam is not accessible."));

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

        // if there is a measure blur dont compute 
        var blur = measureBlur(context.getImageData(0, 0, width, height)).avg_edge_width_perc;

        if (1 < blur)
          return;

        const detections = await faceapi.detectAllFaces(video, tinyFaceDetector).withFaceLandmarks().withFaceExpressions();
        context.drawImage(video, 0, 0, width, height);

        for (let i = 0; i < detections.length; ++i)
          if (detections[i].expressions.happy > 0.8) {
            postImage();
            break;
          }

      }, 10000)

    }
  }, false);

}

function phraseDetectionStartup() {

  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
  var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

  const phrase = 'take a picture';
  var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase + ';';

  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  var bg = document.querySelector('html');

  recognition.onresult = function (event) {
    var phraseRecieved = event.results[0][0].transcript;
    console.log('Result received: ' + phraseRecieved + '.');

    if (phraseRecieved == phrase) {
      postImage();
    }

    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  recognition.onspeechend = function () {
    recognition.stop();
    setTimeout(async () => { recognition.start() }, 2000);
  }

  recognition.onnomatch = function (event) {
    console.log("I didn't recognise that color.");
    setTimeout(async () => { recognition.start() }, 2000);
  }

  recognition.onerror = function (event) {
    console.log('Error occurred in recognition: ' + event.error);
    setTimeout(async () => { recognition.start() }, 2000);
  }

  recognition.start();

}

/**
 * 
 *  Configure mqtt to refresh when message is recieved  
 * 
 */