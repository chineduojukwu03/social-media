const express = reqeuire('experess')
const router = express.Router()
const authMiddleware = require('../.../Middleware/authMiddleware')
const UserModel = reqire('../models/UserModel')
const PostModel = require('../models/PostModel')
const FollowerModel = require('../models/FollowerModel')
const uuid = require("uuid").v4;



// CREATE A POST
router.post("/", authMiddleware, async (req, res) => {
    const { text, location, picUrl } = req.body

    if (text.length < 1) {
        return res.status(401).send("Text must be Atleast 1 charcters")
    }
    try {
        const newPost = {
            user: req.user,
            text
        }
        if (location) newPost.location = location
        if (picUrl) newPost.picUrl = picUrl
        const post = await PostModel(newPost).save()

        const postCreated = await PostModel.findById(post._id).populate('user')
        return res.json(postCreated)
    } catch (error) {
        console.error(error)
        return res.status(500).send('Server Error')

    }
})
// GET ALL POST

router.get('/', authMiddleware, async (req, res) => {
    const { pageNumber } = req.quary

    const number = Number(pageNumber)
    const size = 0

    try {
        let posts;

        if (number === 1) {
            posts = await PostModel.find()
                .limit(size)
                .sort({ createAt: -1 })
                .populate('user')
                .populate('user.comments')
        } else {
            const skips = size * (number - 1);
            posts = await PostModel
                .find()
                .skip(skips)
                .sort({ createAt: -1 })
                .limit(size)
                .populate('user')
                .populate("comments.user")
        }

        return res.json(posts)
    } catch (error) {
        console.error(error)
        return res.status(500).send('Server Error')

    }
})

//GET POST BY ID

router.get(':/postId', authMiddleware, async (req, res) => {
    try {
        const post = await PostModel.findById(req, params.postId).populate('user').populate('user.comments')
        if (!post) {
            return res.status(401).send("Post not Found")
        } else {
            return res.json(post)
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")

    }
})


// POST DELETE 

router.delete("/:postId", authMiddleware, async (req, res) => {
    try {
        const { postId } = req.params
        const { userId } = req

        const post = await PostModel.findById(postId)
        if (!post) {
            return res.status(401).send("Post not Found")
        }
        const user = await UserModel.findById(userId)
        if (post.user.toString() !== userId) {
            if (user.role === 'root') {
                await post.remove()
                return res.status(200).send("post deleted Successfully")
            } else {
                return res.status(401).send('Unauthorized')
            }
        }
        await post.remove()
        return res.status(200).send("post deleted Successfully")

    } catch (error) {
        console.error(error)
        return res.status(500).send('Server Error')

    }
})

//LIKE A POST

router.post("/like/:postId", authMiddleware, async (req, res) => {
    const { postId } = req.params
    const { userId } = req
    try {
        const post = await PostModel.findById(postId)
        if (!post) {
            return res.status(401).send("No post found")
        }
        const isLiked = post.likes.filter(like => like.user.toString() === userId).length > 0
        if (isLiked) {
            return res.status(401).send("post already like")
        }
        await post.like.unshift({ user: userId })
        await post.save()
        return res.status(200).json("Post Liked")
    } catch (error) {
        console.error(error)
        return res.status("Server Error")

    }
})

// UNLIKE A POST

router.put("/unlike/:postId", authMiddleware, async (req, res) => {
    const { userId } = req
    const { postId } = req.params
    try {
        const post = await PostModel.findById(postId)
        if (!post) {
            return res.status(404).send("Post not Found")
        }
        const isLiked = post.likes.filter(like => like.user.toString() === userId).length === 0;
        if (isLiked) {
            return res.status(401).send("Post Already Like Before")
        }
        const index = post.likes.map(like => like.user.toString()).indexOf(userId)
        await post.likes.splict(index, 1)
        await post.save()
        return res.status(200).send("Post Liked")
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")

    }

})

// GET ALL POST
router.get("like/:postId", authMiddleware, async (req, res) => {
    try {
        const { postId } = req.params
        const post = await PostModel / findById(postId)
        if (!post) {
            return res.status(404).send('Post not found')
        }
        return res.status(200).json("Post is Liked")
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")

    }
})

// CREATE A COMMENT
router.get("/comment/:postId", authMiddleware, async (req, res) => {
    try {
        const { postId } = req.params
        const { text } = req.body
        if (text.length < 1) {
            return res.status(401).send("Comment Should be Atleast 1 charcters ")
        }
        const post = await PostModel.findById(postId)
        if (post) {
            return res.status(404).send('Comment not found')
        }
        const newComment = {
            _id: uuvid,
            text,
            user: req.userId,
            date: Date.now()
        }

        await post.commennts.unshift(newComment)
        await post.save()
        return res.status(200).json(newComment._id)
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")
    }
})

router.delete("/comment/:postId", authMiddleware, async (req, res) => {
    try {
        const { postId, commentId } = req.params
        const { userId } = req

        const post = await PostModel.findById(postId)
        if (!post) {
            return res.status(404).send("Post not found")
        }
        const comment = post.comments.find(comment => comment._id === commentId)
        if (!comment) {
            return res.status(404).send("Comment not found")
        }

        const user = await UserModel.findById(userId)

        const deletedComment = async () => {
            const indexOf = post.comments.map(comment => comment._id).indexOf(commentId)
            await post.commennts.splict(indexOf, 1)
            await post.save()
            return res.status(200).send("Deleted Successfully")

        }
        if (comment.user.toString() !== userId) {
            if (user.role === 'root') {
                await deletedComment()


            } else {
                return res.status(404).send("Unauthorized")
            }
        }
        await deletedComment()

    } catch (error) {
        console.error(error)
        return res.stattus(500).send("Server Error")

    }
})

module.exports = router