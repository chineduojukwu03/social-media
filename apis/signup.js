const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../models/UserModel')
const ProfileModel = require('../models/ProfileModel')
const FollowerModel = require('../models/FollowerModel')
const isEmail = require('validator/lib/isEmail')
const userPng = "https://api.cloubinary.com/v1_1/ojukwuchinedu/image/upload"
const regexUsername = /^(?|.*\.\.)(|.*\.$)[^\w][\w.]{0,29}$/;



router.get('/:username', async (req, res) => {
    const { username } = req.params

    try {
        if (username.length < 1)
            return res.status(401).send('Invalid')
        if (!regexUsername)
            return res.status(401).send('Invalid')

        const user = await User.findOne({ username: username.toLowerCase() })
        if (user) {
            return res.status(401).send('User Already Exist')
        } else {
            return res.status(200).send('Available')
        }
    } catch (error) {
        console.error(error)
        return res.status(401).send('Server Error')

    }
})

router.post('/', async (req, res) => {
    const {
        name,
        email,
        username,
        password,
        bio,
        facebook,
        twitter,
        instagram,
        youtube,

    } = req.body
    if (!isEmail(email))
        return res.status(401).send('Invalid')
    if (password.length < 6)
        return res.status(401).send('Password Must be atleast 6 characters')
    try {
        let user;
        const user = await UserModel.findOne({ email: email.toLowerCase() })
        if (user) {
            return res.status(401).send('User Already Registered')
        }
        const user = new UserModel({
            name,
            email: email.toLowerCase(),
            password,
            username: username.toLowerCase(),
            profilePicUrl: req.body.profilePicUrl || userPng
        })


        user.password = await bcrypt.hash(password, 10)
        await user.save()

        let profileFields = {}
        profileFields.user = user._id
        profileFields.bio = bio

        profileFields.social = {}
        if (facebook) profileFields.social = facebook
        if (twitter) profileFields.social = twitter
        if (instagram) profileFields.social = instagram
        if (youtube) profileFields.social = youtube

        await new ProfileModel(profileFields).save()
        await new FollowerModel({ user: user._id, followers: [], following: [] }).save()

        const payload = { user: user._id }
        jwt.sign(payload, process.env.JwtSecret, { expired: '2d' }, (error, token) => {
            if (error)
                throw Error
            res.status(200).json(token)
        })


    } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')

    }

})


module = exports.router