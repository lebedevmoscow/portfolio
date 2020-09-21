const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const mongoose = require('mongoose')
const config = require('./../config/dev')

require('./models/portfolio')
require('./models/user')
require('./models/forumCategory')
require('./models/topic')

exports.connect = () => {
    mongoose.connect(
        config.DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        },
        () => {
            console.log('Connected to DB has been successful.')
        }
    )
}

exports.initSessionStore = () => {
    const store = new MongoDBStore({
        uri: config.DB_URI,
        collection: 'portfolioSessions',
    })

    return store
}
