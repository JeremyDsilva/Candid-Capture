var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");

const User = require('./models/User')
const Config = require('./models/Config')
const Images = require('./models/Images')

const router = express.Router();




var rememberBox = false;


// app.use(bodyParser.urlencoded({ extended: true }))

// app.use(cookieParser());

// app.use(
//     session({
//         key: 'user_sid',
//         secret: "thisIsSecret",
//         resave: true,
//         saveUninitialized: true
//     })
// );


router.use(express.static(__dirname + '/webpages'));
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
// app.use((req, res, next) => {
//     if (req.cookies.user_sid && !req.session.user) {
//         res.clearCookie("user_sid");
//     }
//     next();
// });


var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect("/");
    } else {
        next();
    }
};

// router.use(
//     function (req, res, next) {

//         var data = "";
//         req.on('data', function (chunk) { data += chunk });

//         req.on('end', function () {
//             req.rawBody = data;
//             next();
//         });
//     });

// router.get("/session_info", (req, res) => {
//     var user_info = {
//         username: "",
//         email: "",
//         remember: false,
//         last_time: ""
//     };

//     if (req.session.user && req.cookies.user_sid) {
//         user_info.username = req.session.user.username
//         user_info.remember = req.session.remember;
//         user_info.email = req.session.user.email;
//     }
//     res.send(user_info);
// });


router.get('/', (req,res) =>{
    res.sendFile(__dirname + '/views/webpages/home.html')
})

//login page
router.route('/login').get((req, res) => {
    //who does only this work and no /login
    res.sendFile(__dirname + '/views/webpages/login.html');
}).post(async (req, res) => {


    var email = req.body.email,
        password = req.body.password,
        remember = req.body.remember;

    //remember me set the maxAge
    if (remember == "on") {
        rememberBox = true;
        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 6;
    }
    else {
        rememberBox = false;
    }

    try {
        var user = await User.findOne({ email: email }).exec();
        if (!user) {
            res.redirect("/login");
        }
        user.comparePassword(password, (error, match) => {
            if (!match) {
                res.redirect("/login");
            }
        });

        req.session.user = user;
        req.session.remember = rememberBox;

        res.redirect("/");
    } catch (error) {
        console.log(error)
    }
});

//registration page
router.route('/registration').get((req, res) => {
    res.sendFile(__dirname + '/views/webpages/registration.html');
})
    .post((req, res) => {
        console.log("here")
        var user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        console.log(req.body.username);
        user.save((err, docs) => {
            if (err) {
                res.redirect("/registration");
            } else {
                res.redirect("/");
            }
        });
    });




//contact us
router.route('/contact').get((req, res) => {
    res.sendFile(__dirname + '/views/webpages/contact-us.html');
});

//get all photos from database
//should this change the return object
router.get("/photos", async (req, res) => {
    Images.find({}).sort({date: -1}).exec((err, photo_list) => {
        if (err) {
            console.log(err);
            return handleError(err);
        }
        else {
            photo_list.forEach(photo_list => photo_list.image = photo_list.image.toString('base64'))
            res.render('webpages/photos', { database: photo_list })
        }
    });
});

// //get id of photos
// app.get("/new_photos_id/:date", async (req, res) => {
//     //get new images ids after x date
//     var xdate = req.params.date;
//     console.log(xdate);

//     Images.find({ "date": { "$gt": xdate } }, '_id', function (err, photoID) {
//         if (err) {
//             console.log(err);
//             return handleError(err);
//         }
//         else {
//         //    res.send(photoID);

//             res.json(photoID)
//         }
//     });

// });

// //get the photo of an id
// app.get("/photo/:id", async(req, res) => {
 
//     var id = req.params.id;

//     Images.findById(id, function (err, record) {

//         if(err){
//             res.send(`failed`);
//             return;
//         }

//         img = record.image;

//         res.writeHead(200, {
//             'Content-Type': 'image/png',
//             'Content-Length': img.length
//           }).end(img);

//     });
// });




//logout
router.get("/logout", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie("user_sid")
        req.session.destroy();
        res.redirect("/");

    } else {
        res.redirect("/error");
    }
});

router.route('/configuration').get(async(req,res) =>{
    const configuration = await Config.find()
    res.send(configuration);
})
.post(async (req, res) => {

    var song = req.body.music;
    if(song == ''){
        song = 'default song/album'
    }

        var config = new Config({
            frequency: req.body.frequency,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            music: song,
        });
        config.save((err) => {
            if (err) {
                console.log(err);
                return handleError(err);
            } else {
                console.log("successfully saved config")
            }
        });
});


// route for handling 404 requests(unavailable routes)
// router.use(function (req, res, next) {
//     res.sendFile(__dirname + "/views/error.html")
// });

module.exports = router;




