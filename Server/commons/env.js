"use strict";

// import nodejs bindings to native tensorflow,
// not required, but will speed up things drastically (python required)

const tf = require('@tensorflow/tfjs-node');
console.log(`Initializing TensorFlow/JS version ${tf.version_core}`);
var faceapi = require("face-api.js");
// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
var canvas = require('canvas');
exports.canvas = canvas;
// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement
var Canvas = canvas.Canvas, Image = canvas.Image, ImageData = canvas.ImageData;
faceapi.env.monkeyPatch({ Canvas: Canvas, Image: Image, ImageData: ImageData });
