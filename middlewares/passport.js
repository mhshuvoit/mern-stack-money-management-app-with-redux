const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../model/User')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'SECRET';

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (payload, done) => { // payload object, done function
        User.findOne({ _id: payload._id }) // after jwt decode from frontend we have got user info and these info will put in payload
            .then(user => {
                if (!user) {
                    return done(null, false) 
                } else {
                    return done(null, user)
                }
            })
            .catch(error => {
                console.log(error)
                return done(error)
            })
    }))
}