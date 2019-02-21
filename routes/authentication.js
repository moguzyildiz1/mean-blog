const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {

    //index icerisinde app.use('authentication',authentication) ifadesi kullanildi bu demekki
    //authentication dosyasi altindakilere localhost:3000/authentication/register diye ulasabiliriz.
    router.post('/register', (req, res) => {

        if (!req.body.username) {
            res.json({ success: false, message: 'You must provide a username' });
        } else {
            if (!req.body.email) {
                res.json({ success: false, message: 'You must provide a e-mail' });
            } else {
                if (!req.body.password) {
                    res.json({ success: false, message: 'You must provide a password' });
                } else {
                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password
                    });
                    user.save((err) => {
                        if (err) {
                            if (err.code === 11000) {
                                res.json({ success: false, message: 'Username or email already exists.', err });
                            } else {
                                if (err.errors) {
                                    if (err.errors.email)
                                        res.json({ success: false, message: err.errors.message });
                                } else {
                                    res.json({ success: false, message: 'Could not save the user.', err });
                                }
                            }
                        } else {
                            res.json({ success: true, message: 'User saved successfully.' });
                        }
                    });
                }
            }
        }
    });

    /**
     * Register form icersinde submit yapmadan once emailin alinip alinmadigini kontrol eder
     */
    router.get('/checkEmail/:email', (req, res) => {
        if (!req.params.email) {
            res.json({ success: false, message: 'E-mail was not provided' });
        } else {
            User.findOne({ email: req.params.email }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (user) {
                        res.json({ success: false, message: 'E-mail was already taken' })
                    } else {
                        res.json({ success: true, message: 'E-mail is available' });
                    }
                }
            });
        }
    });

    /**
     * Register form icersinde submit yapmadan once username alinip alinmadigini kontrol eder
     */
    router.get('/checkUsername/:username', (req, res) => {
        if (!req.params.username) {
            res.json({ success: false, message: 'Username was not provided' });
        } else {
            User.findOne({ username: req.params.username }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (user) {
                        res.json({ success: false, message: 'Username was already taken' })
                    } else {
                        res.json({ success: true, message: 'Username is available' });
                    }
                }
            });
        }
    });

    /* ========
  LOGIN ROUTE
  ======== */
    router.post('/login', (req, res) => {
        // Check if username was provided
        if (!req.body.username) {
            res.json({ success: false, message: 'No username was provided' }); // Return error
        } else {
            // Check if password was provided
            if (!req.body.password) {
                res.json({ success: false, message: 'No password was provided.' }); // Return error
            } else {
                // Check if username exists in database
                User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
                    // Check if error was found
                    if (err) {
                        res.json({ success: false, message: err }); // Return error
                    } else {
                        // Check if username was found
                        if (!user) {
                            res.json({ success: false, message: 'Username not found.' }); // Return error
                        } else {
                            const validPassword = user.comparePassword(req.body.password); // Compare password provided to password in database
                            // Check if password is a match
                            if (!validPassword) {
                                res.json({ success: false, message: 'Password invalid' }); // Return error
                            } else {
                                const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }); // Create a token for client
                                res.json({
                                    success: true,
                                    message: 'Success!',
                                    token: token,
                                    user: {
                                        username: user.username
                                    }
                                }); // Return success and token to frontend
                            }
                        }
                    }
                });
            }
        }
    });

    /* ================================================
  MIDDLEWARE - Used to grab user's token from headers
  ================================================ */
    router.use((req, res, next) => {
        const token = req.headers['authorization']; // Create token found in headers
        // Check if token was found in headers
        if (!token) {
            res.json({ success: false, message: 'No token provided' }); // Return error
        } else {
            // Verify the token is valid
            jwt.verify(token, config.secret, (err, decoded) => {
                // Check if error is expired or invalid
                if (err) {
                    res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
                } else {
                    req.decoded = decoded; // Create global variable to use in any request beyond
                    next(); // Exit middleware
                }
            });
        }
    });

    /* ===============================================================
     Route to get user's profile data
  =============================================================== */
    router.get('/profile', (req, res) => {
        // Search for user in database
        User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
            // Check if error connecting
            if (err) {
                res.json({ success: false, message: err }); // Return error
            } else {
                // Check if user was found in database
                if (!user) {
                    res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
                } else {
                    res.json({ success: true, user: user }); // Return success, send user object to frontend for profile
                }
            }
        });
    });

    /* ===============================================================
     Route to get user's profile data
  =============================================================== */
    router.get('/profile', (req, res) => {
        // Search for user in database
        User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
            // Check if error connecting
            if (err) {
                res.json({ success: false, message: err }); // Return error
            } else {
                // Check if user was found in database
                if (!user) {
                    res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
                } else {
                    res.json({ success: true, user: user }); // Return success, send user object to frontend for profile
                }
            }
        });
    });

    return router;
}