import React from 'react'
import { Image, Icon, Card, Divider } from 'semantic-ui-react'
import PostComment from './PostComment'
import CommentInputField from './CommentInputField'
import calculateTime from '../../utils/calculateTime'
import Link from 'next/link'
import { likePost } from '../../utils/postActions'
import likeList from '../likeList'


function NoImagineModal({ post, user, setLikes, likes, isLiked, comments, setComments }) {

    return (
        <>
            <card fluid>
                <Card.Content>
                    <Image floated="left" avatar src={post.user.profilePicUrl} />
                    <Card.Header>
                        <Link href={`/${post.user.username}`}>
                            <a>{post.user.name}</a>
                        </Link>
                    </Card.Header>
                    <Card.Meta>
                        {calculateTime(post.createAt)}
                    </Card.Meta>
                    {post.location && <Card.Meta content={post.location} />}
                    <Card.Description
                        style={{
                            fontsize: "17px",
                            letterSpacing: "0.1px",
                            wordSpacing: "0.3px"
                        }}>
                        {post.text}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon
                        name={isLikes ? "heart" : "heart outline"}
                        color='red'
                        style={{ cursor: "pointer" }}
                        onclick={() => likePost(post._id, user._id, setLikes, isLiked ? false : true)}
                    />
                    <likeList
                        postId={post._id}
                        trigger={
                            likes.length > 0 && (
                                <span className="spanLikesList">
                                    {`${likes.length} ${likes.length === 1 ? "like" : "likes"}`}

                                </span>
                            )
                        }
                    />
                    <Divider hidden />

                    <div
                        style={{
                            overflow: 'auto',
                            height: comments.length > 2 ? "20px" : '60px',
                            marginBottom: '8px'
                        }}>
                        {comments.length > 0 && (
                            comments.map((comment, i) => {
                                i < 3 && (
                                    <PostComment
                                        key={comment._id}
                                        comment={comment}
                                        postId={post._id}
                                        user={user}
                                        setComments={setComments}
                                    />
                                )
                            })
                        )}
                    </div>
                    <CommentInputField
                        postId={post._id}
                        user={user}
                        setComments={setComments}
                    />
                </Card.Content>
            </card>
        </>
    )
}

export default NoImagineModal