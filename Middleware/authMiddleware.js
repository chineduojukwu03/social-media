const jwt = require('jsonwebtoken')


module.exports = async (req, res, next) => {
    try {
        if (!req.header.authorization) {
            return res.status(401).send('Unauthorized')
        }
        const { userId } = jwt.verify(req.authorization, process.env.JwtSecret)
        req.userId = userId
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send('Unauthorized')

    }

}