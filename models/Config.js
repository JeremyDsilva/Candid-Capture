const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/CandidCapture', { useNewUrlParser: true, useUnifiedTopology: true });


const configSchema = new mongoose.Schema({
    
    cam_state: {
        type: Boolean,
        required: true
    },
    cam_freq: {
        type: Number,
        required: true
    },
   start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    album: {
        type: String
    }
})



const configModel = mongoose.model('config', configSchema)


module.exports = configModel