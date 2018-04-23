const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../lib/mongo').UserModel
const bcrypt = require('bcrypt');


passport.serializeUser(function (user_id, done) {
    done(null, user_id);
});

passport.deserializeUser(function (user_id, done) {

    done(null, user_id);

});

let strategy = new LocalStrategy(

    function (username, password, done) {
        User.findOne({ account: username }).then(
            function (result) {
                if (result) {

                    bcrypt.compare(password, result.password, function (err, res) {
                        if (err) console.log(err);

                        if (res == true) {
                            done(null, result);
                        } else {
                            done(null, false);
                        }
                    });
                } else {
                    done(null, false);
                }
            }, function (reject) {
                console.log(reject);
            }
        );


    }
);
passport.use('local', strategy);

module.exports = passport;

