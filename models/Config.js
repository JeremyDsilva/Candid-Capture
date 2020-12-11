const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/CandidCapture', { useNewUrlParser: true, useUnifiedTopology: true });


const configSchema = new mongoose.Schema({
    frequency: {
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
    music: {
        type: String
    }
})



const configModel = mongoose.model('config', configSchema)


module.exports = configModel