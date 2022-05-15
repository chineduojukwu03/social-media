import React, { useState, useEffect } from 'react'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import CreatePost from '../components/post/CreatePost'
import CardPost from '../components/post/CardPost'
import { parseCookies } from 'nookies '
import { NoPosts } from '../../components/NoData'
import { Segment } from 'semantic-ui-react'
import { PostDeleteToastr } from '../component/Post/Toastr'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PlaceHolderPosts, EndMessage } from '../post/placeHolderGroup'



function Index({ user, postsData, errorLoading }) {


    const [posts, setPosts] = useState(postsData)
    const [showToastr, setShowToastr] = useState(false)
    const [hasMore, sethasMore] = useState(true)

    const [pageNumber, setPageNumber] = useState(true)

    useEffect(() => {
        document.title = `Welcome, ${user.name.split(" ")}[0]`

    }, []);

    useEffect(() => {
        showToastr && setTimeout(() => setShowToastr(false), 3000)
    }, [showToastr])



    const fetchDataScroll = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/posts`, {
                headers: {
                    Authorziation: Cookies.get("token"),
                    params: { pageNumber }
                }
            })

            if (res.data.length === 0) {
                setPageNumber(false)
            } else {
                setPosts(prev => [...prev, ...res.data])
            }
            setPageNumber(prev => prev + 1)


        } catch (error) {
            alert("Error fetching Posts")
        }
    }
    return (
        <>
            {showToastr && <PostDeleteToastr />}
            <Segment>
                <CreatePost user={user} setPosts={setPosts} />
                {post.length === 0 || errorLoading ? (<NoPosts />) : (

                    < InfiniteScroll
                        hasMore={hasMore}
                        next={fetchDataScroll}
                        loader={< PlaceHolderPosts />}
                        endMessage={<EndMessage />}
                        dataLength={post.length}
                    >
                        {posts.map(post => (
                            <CardPost
                                socket={socket}
                                key={post._id}
                                post={post}
                                user={user}
                                setPosts={setPosts}
                                setShowToastr={setShowToastr}
                            />
                        ))}

                    </InfiniteScroll>
                )}
            </Segment>

        </>
    )
}


Index.getIntialProps = async (ctx) => {
    try {
        const { token } = parseCookies(ctx)
        const res = await axios(`${baseUrl}/api/posts`,
            {
                headers: { Authorziation: token },
                params: { pageNumber: 1 }
            })
        return { postsData: res.data }

    } catch (error) {
        return { errorLoading: true }

    }

}

export default Index