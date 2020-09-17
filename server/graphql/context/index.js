const passport = require('passport')

const authenticateUser = (req, options) => {
    return new Promise((resolve, reject) => {
        const done = (err, user) => {
            if (err) {
                return reject(new Error(err))
            }
            if (user) {
                req.login(user, (err) => {
                    if (err) {
                        return reject(new Error(err))
                    }
                    return resolve(user)
                })
            } else {
                return reject(new Error('Invalid password or email'))
            }
        }

        const authFn = passport.authenticate('graphql', options, done)
        authFn()
    })
}

exports.buildAuthContext = (req) => {
    const auth = {
        authenticate: (options) => authenticateUser(req, options),
        logout: () => req.logout(),
        isAuthenticated: () => req.isAuthenticated(),
        getUser: () => req.user,
    }

    return auth
}
