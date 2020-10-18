"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.saveFile = exports.faceDetectionOptions = exports.faceDetectionNet = exports.canvas = void 0;
var env_1 = require("./env");
__createBinding(exports, env_1, "canvas");
var faceDetection_1 = require("./faceDetection");
__createBinding(exports, faceDetection_1, "faceDetectionNet");
__createBinding(exports, faceDetection_1, "faceDetectionOptions");
var saveFile_1 = require("./saveFile");
__createBinding(exports, saveFile_1, "saveFile");
