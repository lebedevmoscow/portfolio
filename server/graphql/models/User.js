class User {
    constructor(model) {
        this.Model = model
    }

    signUp(signUpData) {
        if (signUpData.password !== signUpData.passwordConfirmation) {
            throw new Error(
                'Password must be the same as confirmation password'
            )
        }

        return this.Model.create(signUpData)
    }

    signIn() {
        return 'Singing In...'
    }

    signOut() {
        return 'Singing Out...'
    }
}

module.exports = User
