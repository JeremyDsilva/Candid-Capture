const mongoose = require('mongoose')

const request = require('request');
//mongoose.connect('mongodb://localhost:27017/CandidCapture', { useNewUrlParser: true, useUnifiedTopology: true });

const Image = require('./Images')

const d = new Date();

var img1, img2, img3, img4;
let urlList = [
    {
        url:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Baby_Face.JPG/220px-Baby_Face.JPG',
        date: d.getTime()
    },
    {
        url: 'https://www.changeforkids.org/application/files/7815/6342/0312/U0C9953.jpg',
        date: 1607492700000
    },
    {
        url: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/07/the-essential-guide-to-using-images-legally-online-1520x800.png',
        date: 1607406300000
    },
    {
        url: 'https://www.thebalancesmb.com/thmb/6gflK8z4FzPq6JwDNWIGJzlA9w8=/4086x2298/smart/filters:no_upscale()/no-cost-online-business-58a6434c3df78c345bae15ae.jpg',
        date: 1607233500000
    }
]


urlList.forEach(url =>
    request({ url: url.url, encoding: null }, (err, resp, buffer) => {

        if (err)
            console.log(err)
        else {
            // Use the buffer
            const image = new Image({
                date: url.date,
                image: buffer
            });

            image.save().then(() => console.log(url.name + ' has been added'));
        }
    }));

setTimeout(mongoose.disconnect, 5 * 1000);




