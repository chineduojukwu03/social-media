import App from 'next/app'
import axios from 'axios'
import { parseCookies, destroyCookies } from 'nookies'
import baseUrl from '../utils/baseUrl'
import { redirectUser } from '../utils/authUser'
import Layout from '../Components/Layout/Layout'
import 'react-toastify/dist/ReactToastify.css'
import "semantic-ui-css/semantic-ui-css"


class MyApp extends App {
    static async getInitialProps(Component, ctx) {
        const { token } = parseCookies(ctx)

        let pageProps = {}

        const protectedRouter
            = ctx.pathname === '/' ||
            ctx.pathname === "/[username]" ||
            ctx.pathname === "/post/postId"
        if (!token) {
            protectedRouter && redirectUser(ctx, '/login')
        } else {
            if (Component.getInitialProps)
                pageProps = await Component.getInitialProps(ctx)
        }
        try {
            const res = await axios.get(`${baseUrl}/api/auth`, { headers: { Authorization: token } })

            const { user, userFollowerStats } = res.data
            if (user) !protectedRouter && redirectUser(ctx, '/')
            pageProps.user = user;
            pageProps.userFollowerStats = userFollowerStats;

        } catch (error) {
            destroyCookies(ctx, 'token')
            redirectUser(ctx, '/login')

        }
        return { pageProps }
    }
    render() {
        const { Component, pageProps } = this.props
        return (

            <Layout {...pageProps}>
                <Component {...pageProps} />
            </Layout>
        )
    }
}

export default MyApp