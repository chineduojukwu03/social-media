import React, { useState, useEffect } from 'react'
import { Button, Image, List } from 'semantic-ui-react'
import Spinner from '../Layout/Spinner'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'
import cookie from "js-cookie"



function Following({
    loggerUserFollowStats,
    setUserFollowStats,
    profileUserId
}) {

    const [following, setFollowing] = useState([])
    const [loading, setLoading] = useState(false)
    const [followingLoading, setFollowingLoading] = useState()

    useEffect(() => {
        const getFollowing = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`${baseUrl}/api/profile/${profileUserId}`,
                    { headers: { Authorization: cookie.get("token") } }
                );
                setFollowing(res.data)

            } catch (error) {
                alert("Error Loading Following")
                setFollowing(false)

            }
        }
        getFollowing()
    })
    return (

        <>
            {loading ? (
                <Spinner />
            ) : (
                following.length > 0 ? following.map(profileFollower => {
                    const isFollowing = loggerUserFollowStats.following.length > 0 &&
                        loggerUserFollowStats.following.filter(following =>
                            following.user === profileFollower.user._id
                        ).length > 0;

                    return (
                        <>
                            <List key={profileFollower.user._id} divided verticalAlign="middle">
                                <List.Item>
                                    <List.Content floated='right'>
                                        {profileFollower.user._id !== user._id && (
                                            <Button
                                                color={isFollowing ? "facebook" : "twitter"}
                                                content={isFollowing ? "Folowing" : "Follow"}
                                                icon={isFollowing ? "check" : "added user"}
                                                disabled={followLoading}

                                            />
                                        )}
                                    </List.Content>
                                    <Image avatar src={profileFollower.user.profilePicUrl} />
                                    <List.Content as='a' href={`/${profileFollower.user.username}`}>
                                        {profileFollower.user.name}
                                    </List.Content>
                                </List.Item>
                            </List>
                        </>
                    )

                }) : <NoFollowData followersComponent={true} />
            )}

        </>

    )
}

export default Following