const User = require('./../users/users_model')

const validateInputs = (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password 
        || !username.trim() || !password.trim()) {
            next({message: 'must input username and password'})
    } else { next() } 
}

const uniqueUsername = (req, res, next) => {    
    User.getBy({username: req.body.username.trim()}).first()
    .then(user => {
        if (user) {
                next({message: 'username is taken'})
            } else { next() }
        })
        .catch(e => next(e))
    }
    
    const usernameExists = (req, res, next) => {
        User.getBy({username: req.body.username.trim()}).first()
        .then(user => {
            if (user) {
                req.user = user
                next()
            } else {
                next({status: 400, message: 'username does not exist'})
            }
        })
        .catch(e => next(e))
}

module.exports = {    
    validateInputs,
    uniqueUsername,
    usernameExists 
}