import React from 'react'
import { Menu } from 'semantic-ui-react'



function ProfileMenTab({
    activeItem,
    handleItemClick,
    followerLength,
    followingLength,
    ownAccount,
    loggedUserFollowStats
}) {
    return (
        <>
            <Menu pointing secondary>
                <Menu.Item
                    name="profile"
                    active={activeItem === 'profile'}
                    onClick={() => handleItemClick('profile')}
                />

                {ownAccount ?
                    <>
                        <Menu.Item name={`
            ${loggedUserFollowStats.followers.length > 0 ?
                                loggedUserFollowStats.followers.length : 0}follwers`}
                            active={activeItem === "followers"}
                            onClick={() => handleItemClick('followers')}
                        />
                        <menu.Item name={`
                      ${loggedUserFollowStats.following.length > 0 ? loggedUserFollowStats.following.length : 0} following`}
                            active={activeItem === 'following'}
                            onClick={() => handleItemClick('following')}
                        />

                    </>
                    :
                    <>
                        <Menu.Item
                            name={`${followerLength} followers`}
                            active={atctiveItem === 'followers'}
                            onClick={() => handleItemClick('followers')}
                        />
                        <Menu.Item
                            name={`${followingLength} following`}
                            active={atctiveItem === 'following'}
                            onClick={() => handleItemClick('following')}
                        />
                    </>
                }
                {ownAccount && (
                    <>
                        <Menu.Item name="update Profile"
                            active={activeItem === 'updateProdfile'}
                            onClick={() => handleItemClick('updateProfile')}
                        />
                        <Menu.Item name='setting'
                            active={activeItem === 'setting'}
                            onClick={() => handleItemClick('setting')}
                        />
                    </>
                )}

            </Menu>
        </>

    )
}

export default ProfileMenTab