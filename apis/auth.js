const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../models/UserModel')
const isEmail = require('validator/lib/isEmail')
const authMiddleware = require('../Middleware/authMiddleware')
const regexUsername = /^(?|.*\.\.)(|.*\.$)[^\w][\w.]{0,29}$/;




router.get('/', authMiddleware, async (req, res) => {
    const { userId } = req
    try {
        const user = await UserModel.findById(userId)
        const userFollowStats = await FollowerModel.findOnne({ user: userId })
        return res.status(200).json({ user, userFollowStats })
    } catch (error) {
        console.error(error)
        return res.status(500).send('Server Error')

    }
})




router.get('/:username', async (req, res) => {
    const { username } = req.params

    try {
        if (username.length < 1)
            return res.status(404).send('Invalid')
        if (!regexUsername)
            return res.status(404).send('Invalid')

        const user = await User.findOne({ username: user.toLowerCase() })
        if (user) {
            return res.status(404).send('User Already Exist')
        } else {
            return res.status(200).send('Available')
        }

    } catch (error) {
        console.error(error)
        return res.status(500).send('Server Error')

    }
})

router.post('/', async (req, res) => {
    const {
        email,
        password
    } = req.body
    if (!isEmail(email))
        return res.status(404).send('Invalid')
    if (password.length < 6)
        return res.status(404).send('Password must be atleast 6 characters')
    try {

        let user
        const user = await UserModel.findOne({ email: email.toLowerCase() })
        if (user) {
            return res.status(404).send('User Already Registered')
        }

        const user = new UserModel({
            email: email.toLowerCase(),
            password,
            username: username.toLowerCase(),
        })

        user.password = await bcrypt.hash(password, 10)
        await user.save()

        const payload = { user: user._id }
        jwt.sign(payload, process.env.JwtSEcret, { expiresIn: '2d' }, (err, token) => {
            if (err) {
                res.status(200).json(token)
            }
        })

    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")

    }

})



module = exports.router