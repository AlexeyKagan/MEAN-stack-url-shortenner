var jwt = require('jsonwebtoken');
var config = require('../../config.js');
var User = require('../models/user');
var url = require('../models/url');
var secret = config.secret;


/* 
 module.exports = function(app,express){
 };
 */

module.exports = (express) => {

    var apiRouter = express.Router();

    apiRouter.post('/login', (req, res) => {

        User.findOne({username: req.body.username})
            .select('name username password')
            .exec((err, user) => {
                if (err) res.json(err);
                if (!user) res.json({
                    success: false,
                    message: 'User with this username not found.'
                });
                else if (user) {
                    //var validPassword = req.body.password; //willbe method for hash password
                    if (req.body.password == user.password) {
                        res.json({
                            success: true,
                            message: 'success',
                            token: jwt.sign({
                                name: req.body.name,
                                username: req.body.username
                            }, secret)
                        })
                    }
                    else {
                        res.json({
                            success: false,
                            message: 'Wrong password.'
                        })
                    }
                }
            })
    });

    apiRouter.post('/signup', (req, res) => {
        User.findOne({username: req.body.username}, (err, user) => {
            if (err) res.json(err);

            if (user) res.json({
                success: false,
                message: 'User with this username already exist.'
            });
            else {
                var newUser = new User();

                newUser.name = req.body.name;
                newUser.username = req.body.username;
                newUser.password = req.body.password;
                newUser.save();

                res.json({
                    success: true,
                    token: jwt.sign({
                        name: req.body.name,
                        username: req.body.username
                    }, secret)
                })
            }

        })
    });
    // verify a token
    apiRouter.use(function (req, res, next) {
        console.log('Somebody just came to our app');

        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.status(403).send({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                }
                else {
                    req.decoded = decoded;
                    next();
                }
            })
        }
        else {
            res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });

    apiRouter.post('/createShort', (req, res) => {
        var short = new url();

        short.longUrl = req.body.longUrl;
        short.shortUrl = req.body.shortUrl;
        short.clicks = 0;
        short.description = req.body.description;
        short.tags = req.body.tags;


        short.save(function (err) {
            if (err) res.json({err: err});
        });
        res.json({
            success: true
        })
    });
    apiRouter.get('/getUrls', (req, res) => {
        url.find({}, function (err, result) {
            if (err) res.send(err);
            //console.log(result);
            res.json(result);

        });
    });
    apiRouter.get('/about/:id', (req, res) => {
        url.find({'shortUrl': req.params.id}, function (err, result) {
            if (err) res.send(err);
            res.json(result);
            
        })
    });

    apiRouter.get('/:id', (req, res) => {
        console.log(req.params.id);
        url.findOne({'shortUrl': req.params.id}, function (err, rez) {
            if (err) res.json(err);
            // console.log(rez);
            if (rez == null) res.json({a: 'bug'});
            else {
                rez.clicks++;
                rez.save();
                res.json({a: rez.longUrl});
            }

        })

    });


    apiRouter.get('/me', (req, res) => {
        res.send(req.decoded);
    });


    return apiRouter;
};
