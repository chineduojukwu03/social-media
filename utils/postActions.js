import axios from 'axios'
import baseUrl from "./baseUrl"
import catchErrors from "./catchError"
import cookie from "js-cookie"


const axios = axios.create({
    baseURL: `${baseUrl}/api/posts`,
    headers: { Authorization: cookie.get("token") }
})

export const submitNewPost = async (

    text,
    location,
    picUrl,
    setPosts,
    setNewPost,
    setError) => {
    try {
        const res = await axios.post('/', { text, picUrl, location })
        //const newPost = {
        // _id: res.data,
        // user,
        // location,
        // picUrl,
        // likes: [],
        //  comments: []
        // }
        // setPosts(prev => [newPost, ...prev])
        setPosts(prev => [res.data, ...prev])
        setNewPost({ text: "", location: "" })

    } catch (error) {
        const errorMsg = catchErrors(error)
        setError(errorMsg)

    }
}

export const deletePost = async (postId, setPosts, setshowToastr) => {
    try {
        await axios.delete(`${postId}`)
        setPosts(prev => prev.filter(post => post._id !== postId))
        setshowToastr(true)

    } catch (error) {
        alert(catchErrors(error))
    }
}

export const likePost = async (postId, userId, setLikes, like = true) => {
    try {
        if (like) {
            await axios.post(`/like/${postId}`)
            setLikes(prev => [...prev, { user: userId }])
        }
        else if (!like) {
            await axios.post(`/unlike/${postId}`)
            setLikes(prev => prev.filter(like => like.user !== userId))
        }
    } catch (error) {
        alert(catchErrors(error))

    }
}

export const PostComment = async (postId, user, text, setComments, text) => {
    try {
        const res = await axios.post(`/comment/${postId}`, { text })
        const newComment = {
            _id: res.data,
            user,
            text,
            date: Date.now()
        };
        setComments(prev => [newComment, ...prev])
        setText("")
    } catch (error) {
        alert(catchErrors(error))

    }
}

export const deleteComment = async (postId, commentId, setComments) => {
    try {

        await axios.delete(`/${postId}/${commentId}`)
        setComments(prev => prev.filter(Comment => Comment._id !== commentId))
    } catch (error) {
        alert(catchErrors(error))

    }
}