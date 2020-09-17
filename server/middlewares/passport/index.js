const GraphQLStrategy = require('./strategies')
const User = require('./../../database/models/user')

exports.init = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })

    passport.use(
        'graphql',
        new GraphQLStrategy(({ email, password }, done) => {
            User.findOne({ email }, (err, user) => {
                if (err) {
                    console.log('Error (index.js - passport)', err)
                    return done(err)
                }
                if (!user) {
                    console.log('!user indexjs passport')
                    return done(null, false)
                }

                user.validatePassword(password, (err, isMatching) => {
                    if (err) {
                        return done(err)
                    }

                    if (!isMatching) {
                        return done(null, false)
                    }

                    return done(null, user)
                })
            })
        })
    )
}
