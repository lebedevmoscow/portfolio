const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    avatar: String,
    email: {
        type: String,
        required: 'Email is required',
        lowercase: true,
        index: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },
    name: {
        type: String,
        minlength: [3, 'Minimum length is 3 characters'],
    },
    username: {
        type: String,
        required: true,
        minlength: [3, 'Minimum length is 3 characters'],
    },
    password: {
        type: String,
        minlength: [3, 'Minimum length is 3 characters'],
        maxlength: [32, 'Maximum length is 32 characters'],
        required: true,
    },
    role: {
        enum: ['guest', 'admin', 'instructor'],
        type: String,
        required: true,
        default: 'guest',
    },
    info: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

userSchema.pre('save', function (next) {
    const user = this

    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err)
        }

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err)
            }

            user.password = hash
            next()
        })
    })
})

userSchema.methods.validatePassword = function (candidatePassword, callback) {
    const user = this
    bcrypt.compare(candidatePassword, user.password, function (err, isSuccess) {
        if (err) {
            return callback(err)
        }

        return callback(null, isSuccess)
    })
}

module.exports = mongoose.model('User', userSchema)
