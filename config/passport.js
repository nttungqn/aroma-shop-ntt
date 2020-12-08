const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('./../models/userModel');

SALT = 'VOOuoswY4b'

module.exports = function () {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id)
            .then(function (user) {
                done(null, user);
            })
            .catch(function (err) {
                console.log(err);
            });
    });

    passport.use(
        'local-login',
        new LocalStrategy(function (email, password, done) {
            User.findOne({ email: email })
                .then(function (user) {
                    let hashedPassword = '';
                    bcrypt.hash(password, 12, function (err, hash) {
                        if (err) { return done(err); }
                        hashedPassword = hash;
                        console.log(hashedPassword);
                    });
                    bcrypt.compare(hashedPassword, user.password, function (err, result) {
                        console.log(hashedPassword, user.password);
                        if (err) {
                            return done(err);
                        }
                        if (!result) {
                            return done(null, false, {
                                message: 'Incorrect username and password',
                            });
                            
                        }
                        return done(null, user);
                    });
                })
                .catch(function (err) {
                    return done(err);
                });
        })
    );


}
