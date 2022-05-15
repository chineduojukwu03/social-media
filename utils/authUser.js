import axios from 'axios'
import baseUrl from './baseUrl'
import cookies from 'js.cookies'
import catchError from './catchError'



export const registerUser = async (user, setLoading, setError, profilePicUrl) => {
    setLoading(true)

    try {
        const res = await axios.post(`${baseUrl}/api/signup `, { user, profilePicUrl })
        setToken(res.data)
    } catch (error) {
        const errorMsg = catchError(error)
        setError(errorMsg)

    }
    setLoading(false)
}

export const loginUser = async (user, setLoading, setError) => {
    setLoading(true)

    try {
        const res = await axios.post(`${baseUrl}/api/auth`, { user })
        setToken(res.data)
    } catch (error) {
        const errorMsg = catchError(error)
        setError(errorMsg)

    }
    setLoading(false)
};

export const redirectUser = (ctx, location) => {
    if (ctx.req) {
        ctx.res.writerHead(302, { Location: location })
        ctx.res.end()
    } else {
        Router.push(location)
    }
}



const setToken = () => {
    cookie.set('token', token)
    Router.push('/')
}

export const logoutUser = email => {
    cookie.set('userEmail', email);
    cookie.remove("token")
    Router.push('/login')
}