const express = require('express')
const router = express.Router()
const authMiddleware = require('../Middleware/authMiddleware')
const UserModel = require('../models/UserModel')

router.get('/:searchText', authMiddleware, async (req, res) => {
    const { searchText } = req.params

    if (searchText.length === 0) return

    try {
        let userPathern = new RegExp(`^${searchText}`)
        const result = await UserModel.find({ name: { $regex: userPathern, $options: 'i' } })
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')

    }
})