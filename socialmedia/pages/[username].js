import React from 'react'
import { userRouter } from 'next/router'
import axios from "axios"
import baseUrl from "../utils/baseUrl"
import { parseCookies } from "nookies"
import { NoProfile } from "../components/Layout/NoData"
import ProfileMenTab from "../components/Profle/ProfileMenTab"
import ProfileHeader from "../components/Profle/ProfileHeader"
import { CardPost } from "../components/post/CardPost"
import { PlaceHolderPosts } from '../components/Layout/PlaceHolderGroup'
import { PostDeleteToastr } from '../components/Layout/Toastr'
import Followers from '../components/Profile/Followers'




function ProfilePage({ profile, followerLength, followingLength, errorLoading, user, userFollowStats }) {
    const router = userRouter()

    const [posts, setPosts] = userState([])
    const [loading, setLoading] = userState(false)

    const [activeItem, setActiveItem] = userState("profile")
    const handleItemClick = item => setActive(true)

    const [loggedUserFollowStats, setLoggedUserFollowStats] = userState(userFollowStats)
    const [showToastr, setShowToastr] = userState(false)

    const ownAccount = profile.user._id === user._id
    if (errorLoading)
        return <NoProfile />

    useEffect(() => {
        const getPosts = async () => {
            setLoading(true)

            try {
                const { username } = router.query
                const token = cokkie.get("token")
                const res = await axios.get(`${baseUrl}/api/profile/posts/${username}`,
                    {
                        headers: {
                            Authorization: { token }
                        }
                    })
                setPosts(res.data)
            } catch (error) {
                alert("Error loading posts")

            }
            setLoading(false)
        }
        getPosts()
    }, [router.query.username])

    userEffect(() => {
        showToastr && setTimeout(() => setShowToastr(false), 30)
    }, [showToastr])

    return (
        <>
            {showToastr && <PlaceHolderPosts />}
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column>
                        <ProfileMenTab
                            activeItem={activeItem}
                            handleItemClick={handleItemClick}
                            followerLength={followerLength}
                            followingLength={followingLength}
                            ownAccount={ownAccount}
                            loggedUserFollowStats={loggedUserFollowStats}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        {activeItem === 'profile' && (
                            <>
                                <ProfileHeader
                                    profile={profile}
                                    ownAccount={ownAccount}
                                    loggedUserFollowStats={loggedUserFollowStats}
                                    setUserFollowStats={setUserFollowStats} />
                                {loading ? <PlaceHolderPosts /> : posts.length > 0
                                    ? posts.map((post => <CardPost
                                        key={post._id}
                                        post={post}
                                        setPosts={setPost}
                                        user={user}
                                        setShowToastr={setShowToastr}
                                    />
                                    )) : <NoProfilePosts />
                                }


                            </>
                        )}

                        {activeItem === 'followers' &&
                            <Followers user={user}
                                loggedUserFollowStats={loggedUserFollowStats}
                                setUserFollowStats={setUserFollowStats}
                                profileUserId={profile.user._id}
                            />
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}

ProfilePage.getInitailProps = async ctx => {
    try {
        const { username } = ctx.query
        const { token } = parseCookies(ctx)
        const res = await axios.get(`${baseUrl}/api/profile/${username}`,
            { headers: { Authorization: token } })
        const { profile, followerLength, followingLength } = res.data
        return { profile, followerLength, followingLength }


    } catch (error) {
        return { errorLoading: true }

    }
}
export default ProfilePage