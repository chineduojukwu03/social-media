const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const UserModel = require('../model/UserModel')
const FollowerModel = require('../model/FollowerModel')
const ProfileModel = require('../model/ProfileModel')
const PostModel = require('../model/PostModel')
const bcrypt = require('bcrypt')





// GET PROFILE INFO

router.get('/:username', authMiddleware, async (req, res) => {
    const { username } = req.params

    try {
        const user = await UserModel.findOne({ username: username.toLocaleLowerCase() })
        if (!user) {
            return res.status(401).send("User not Found")
        }
        const profile = await ProfileModel.findOne({ user: user._Id }).populate("user")
        const profileFollowStats = await FollowerModel.findOne({ user: user._id })
        return res.json({
            profile,
            followersLenght: profileFollowStats.followers.length > 0 ?
                profileFollowStats.followers.length : 0,

            followingLength:
                profileFollowStats.following.length > 0 ?
                    profileFollowStats.following.length : 0

        })
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")

    }
})

//GET POST USER

router.get('/post/:username', authMiddleware, async (req, res) => {
    const { username } = req.params

    try {
        const user = await UserModel.findOne({ username: username.toString() })
        if (!user) {
            return res.status(401).send("User Not Found")
        }
        const post = await PostModel.find({ user: user._id })
            .sort({ createAt: -1 })
            .populate("user")
            .populate("comments.user")
        return res.json(post)

    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")

    }
})


//GET FOLLOWERS

router.get('/followers/:userId', authMiddleware, async (req, res) => {
    const { userId } = req.params

    try {
        const user = await FollowerModel.findOne({ user: userId })
            .populate("followers.user")
        return res.json(user.followers)
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")

    }
})

//GET FOLLOWING

router.get('/following/:userId', authMiddleware, async (req, res) => {
    const { userId } = req.params
    try {
        const user = await FollowerModel.findOne({ user: userId })
            .populate("following.user")
        return res.json(user.following)
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")

    }



})

//FOLLOW A USER
router.post('/follow/:userToFollowId', authMiddleware, async (req, res) => {
    const { userId } = req
    const { userToFollowId } = req.params
    try {
        const user = await FollowerModel.findOne({ user: userId })
        const userToFollow = await FollowerModel.findOne({ user: userToFollowId })
        if (!user || !userToFollow) {
            return res.status(401).send("User Not Found")
        }
        const isFollowing = user.following.length > 0
            && user.following.filter(following => following.user.toString() === userToFollowId
            ).length > 0;

        if (isFollowing) {
            return res.status(401).send("User Already Followed")
        }
        await user.following.unshift({ user: userToFollowId })

        await user.save()
        await userToFollow.followers.unshift({ user: userId })
        await userToFollow.save()
        return res.status(200).send("Success")
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")

    }
})
//UNFOLLOW USER

router.put('/unfollow/userToUnfollowId', authMiddleware, async (req, res) => {
    const { userId } = req
    const { userToFollowId } = req.params
    try {
        const user = await FollowerModel.findOne({ user: userId })
        const userToFollowed = await FollowerModel.findOne({ user: userToFollowId })
        if (!user || !userToFollowed) {
            return res.status(401).send("User not Found")
        }
        const isFollowing = user.following.length > 0 &&
            user.following.filter(following => following.user.toString() === userToFollowId)
                .length === 0;
        if (isFollowing) {
            return res.status(401).send("User not following Previously")
        }
        const removeFollowing = user.following
            .map(following => following.user.toString())
            .indexOf(userToUnfollowId)
        await user.following.splice(removeFollowing, 1)
        await user.save()

        const removeFollower = userToFollow.followers
            .map(follower => follower.user.toString())
            .indexOf(userId)
        await user.following.splice(removeFollower, 1)
        await user.save()

        return res.status(200).send("Success")

    } catch (error) {
        console.error(error)
        return res.statuos(500).send("Server Error")

    }
})

router.post("/update", authMiddleware, async (req, res) => {
    try {
        const { userId } = req

        const { bio, instagram, youtube, twitter, facebook, profilePicUrl } = req.body.user
        let profileFields = {}
        profileFields.user = userId
        profileFields.bio = bio
        if (facebook) profileFields.facebook = facebook
        if (instagram) profileFields.instagram = instagram
        if (youtube) profileFields.youtube = youtube
        if (twitter) profileFields.twitter = twitter

        await ProfileModel.findOneAndUpdate({ user: userId },
            { $set: profileFields },
            { new: true }
        )
        if (profilePicUrl) {
            const user = await UserModel.findById({ user: userId })
            user.profilePicUrl = profilePicUrl,
                await user.save()
            return res.status(200).send("Successfully")
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")
    }
})

//UPDATE PASSWORD

router.post('/setting/password', authMiddleware, async (req, res) => {
    const { currentPassword, newPassword } = req.body
    try {
        if (newPassword.length > 6) {
            return res.status(401).send("Please must be atleast 6 characters")
        }
        const user = await UserModel.findById(req.userId).select("+password")
        const isPassword = await bcrypt.compare(currentPassword, user.password)
        if (!isPassword) {
            return res.status(401).send("Invalid password")
        }
        user.password = await bcrypt.hash(newPassword, 10)
        await user.save()
    } catch (error) {
        console.error(error)
        return res.status(500).send("SErver Error")

    }
})

// UPDATE MESSAGE POPUP SETTING

router.post('/setting/messagePopup', authMiddleware, async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)
        if (user.newMessagePropup) {
            user.newMessagePropup = false
            await user.save()
        } else {
            user.newMessagePropup = true
            await user.save()
        }
        return res.status(200).send("Success")
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")

    }
})


module.exports = router