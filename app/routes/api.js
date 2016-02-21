var jwt = require('jsonwebtoken');
var config = require('../../config.js');
var User = require('../models/user');
var url = require('../models/url');
var secret = config.secret;




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
                    //var validPassword = req.body.password; //willbe method for hash password comming soon.
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
    //Registration
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
    //get long url and after redirect
    apiRouter.get('/:id', (req, res, next) => {
        console.log(req.params.id);
        url.findOne({'shortUrl': req.params.id}, function (err, rez) {
            if (err) res.json(err);
            //console.log(rez);
            if (rez == null) next(); //res.json({a: 'bug'});
            else {
                rez.clicks++;
                rez.save();
                res.json({a: rez.longUrl});
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
   
    //create short url
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
    //get all urls
    apiRouter.get('/getUrls', (req, res) => {
        url.find({}, function (err, result) {
            if (err) res.send(err);
            //console.log(result);
            res.json(result);

        });
    });
    //route for about url
    apiRouter.get('/about/:id', (req, res) => {
        url.findOne({'shortUrl': req.params.id}, function (err, result) {
            if (err) res.send(err);
            if (result == null) return res.send("Page not found.");
            console.log(result);
            res.json(result);

        })
    });
    //route for change url
    apiRouter.route('/change/:id')
        .get((req, res) => {
            url.findById(req.params.id, function (err, result) {
                if (err) res.send(err);
                if (result == null) return res.send("Page not found.");
                console.log(result);
                res.json(result);

            })
        })
        //UPDATE URL TAGS AND DESCRIPTION
        .put((req, res) => {
            url.findById(req.params.id, function (err, result) {
                if (err) res.send(err);

                if (req.body.description) result.description = req.body.description;
                if (req.body.tags) result.tags = req.body.tags;

                result.save(function (err) {
                    res.json({message: 'success updated'})
                });
            })
        });

    //DELETE URL
    apiRouter.delete('/delete/:id', (req, res) => {
        url.remove({_id : req.params.id}, function(err,result){
            if (err) res.send(err);
            
            res.json({message : 'Success deleted'})
        })
    });


    
  

    apiRouter.get('/me', (req, res) => {
        res.send(req.decoded);
    });


    return apiRouter;
};
