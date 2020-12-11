const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/CandidCapture', { useNewUrlParser: true, useUnifiedTopology: true });

const imageSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    image: {
        type: Buffer,
        required: true
    }
})

const imageModel = mongoose.model('images', imageSchema)

module.exports = imageModel