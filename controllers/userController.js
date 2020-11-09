const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const registerValidator = require('../validator/registerValidator')
const loginValidator = require('../validator/loginValidator')
const User = require('../model/User')
const { serverError, resourceError } = require('../util/error')

module.exports = {
    register(req, res) {
        // read user data
        // validation
        // check for dublicate user
        // new user object
        // save to database
        // response back with new user
        let { name, email, password, confirmPassword } = req.body
        let validate = registerValidator({ name, email, password, confirmPassword })

        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        } else {
            User.findOne({ email })
                .then(user => {
                    if (user) {
                        return resourceError(res, 'Email Already Exist')
                    } else {
                        bcrypt.hash(password, 11, (err, hash) => {
                            if (err) {
                                return serverError(res, error)
                            }
                            let user = new User({
                                name,
                                email,
                                password: hash, 
                                balance: 0,
                                expense: 0, 
                                income: 0,
                                transactions: []
                            })

                            user.save()
                                .then(user => {
                                    res.status(201).json({
                                        message: 'User Created Successfully',
                                        user
                                    })
                                })
                                .catch(error => serverError(res, error))
                        })
                    }
                })
                .catch(error => serverError(res, error))
        }
    },

    login(req, res) {
        // extract data
        // validation
        // check for user register
        // compare password
        // generate toker and response back (this token is a decoded not encrypted)
        let { email, password } = req.body
        let validate = loginValidator({ email: email, password: password })

        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }

        User.findOne({ email })
            .then(user => {
                if (!user) {
                    return resourceError(res, 'User Not Found')
                } else {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (err) {
                            return serverError(res, err)
                        }
                        if (!result) {
                            return resourceError(res, 'Password Doesn\'t Match')
                        }
                        let token = jwt.sign({
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            amount: user.amount,
                            income: user.income,
                            transactions: user.transactions
                        }, 'SECRET', { expiresIn: '2h' })

                        res.status(200).json({
                            message: 'Login Successful',
                            token: `Bearer ${token}`
                        })
                    })
                }
            })
            .catch(error => serverError(res, error))
    },

    allUser(req, res) {
        User.find()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(error => serverError(res, error))
    }
}