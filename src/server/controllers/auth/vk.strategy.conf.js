const mongoose = require('mongoose');
const VkStrategy = require('passport-vkontakte').Strategy;

const passportConf = require('./../../conf/passport');
const UserSchema = require('./../../schemas/user.schema');

const User = mongoose.model('users', UserSchema);

module.exports = (app, passport) => {
    passport.use('vkontakte', new VkStrategy(passportConf.strategies.vk,
        (accessToken, refreshToken, profile, done) => User.findOne({ vkUserId: profile.id })
            .then(doc => {
                if (!doc) {
                    return new User({
                        email: profile.email,
                        displayName: profile.displayName,
                        gender: profile.gender === 'male' ? 1 : 0,
                        vkUserId: profile.id,
                        vkUsername: profile.username,
                        vkProfileUrl: profile.profileUrl,
                        vkPhotoUrl: profile.photos[0].value,
                    }).save();
                }
                return doc;
            })
            .then(doc => done(null, doc))
            .catch(err => done(new Error('Something went wrong: ' + err))) // eslint-disable-line prefer-template
    ));

    app.get('/auth/vk', passport.authenticate('vkontakte', {
        scope: ['email'],
    }));
    app.get('/auth/vk/callback', passport.authenticate('vkontakte', {
        successRedirect: '/',
        failureRedirect: '/login.html',
    }));
};
