import React from 'react'
import { Segment, Divider, Header, Button, List } from 'semantic-ui-react'


function ProfileHeader({
    profile,
    ownAccount,
    loggerUserFollowStats,
    setUserFollowStats
}) {

    const [loading, setLoading] = userState(false)

    const isFollowing = loggerUserFollowStats.following.length > 0 &&
        loggerUserFollowStats.following.filter(following => following.user === profile.user._id)
            .length > 0
    return (
        <Segment>
            <Grid stackable>
                <Grid.Column width={11}>
                    <Grid.Row>
                        <Header as="h2"
                            content={profile.user.name}
                            style={{ marginTop: '5px' }}
                        />
                    </Grid.Row>
                    <Grid.Row stretched>
                        {profile.bio}
                        <Divider hidden />

                    </Grid.Row>
                    <Grid.Row>
                        {profile.social ? (
                            <>
                                <List>
                                    <List.Item>
                                        <List.Icon name='mail' />
                                        <List.Content content={profile.user.email} />
                                    </List.Item>
                                    {profile.socail.facebook && (
                                        <List.Item>
                                            <List.Icon name='facebook' color='blue' />
                                            <List.Content content={profile.socila.facebook} style={{ color: "blue" }} />
                                        </List.Item>
                                    )}
                                    {profile.social.instagram && (
                                        <List.Item>
                                            <List.Icon name='instagram' color='red' />
                                            <List.Content content={profile.social.instagram} style={{ color: "blue" }} />
                                        </List.Item>
                                    )}
                                    {profile.social.twitter && (
                                        <List.Item>
                                            <List.Icon name='instagram' color='blue' />
                                            <List.Content content={profile.social.twitter} style={{ color: "blue" }} />
                                        </List.Item>
                                    )}
                                    {profile.social.youtube && (
                                        <List.Item>
                                            <List.Icon name='youtube' color='red' />
                                            <List.Content content={profile.social.youtube} style={{ color: "red" }} />
                                        </List.Item>
                                    )}
                                </List>
                            </>
                        ) : (
                            <>No Social Media links</>
                        )}
                    </Grid.Row>

                </Grid.Column>
                <Grid.Column width={5} stretched style={{ textAlign: "center" }}>
                    <Grid.Row>
                        <Image src={profile.user.profilePicUrl} avatar size="large" />
                    </Grid.Row>
                    <br />
                    {!ownAccount && (
                        <Button compact
                            loading={loading}
                            disabled={loading}
                            content={isFollowing ? 'Following' : "Follow"}
                            icon={isFollowing ? "check circle" : "add user"}
                            color={isFollowing ? "instagram" : "twitter"}
                        />
                    )}
                </Grid.Column>
            </Grid>
        </Segment>

    )
}

export default ProfileHeader