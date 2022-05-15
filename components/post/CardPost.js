import React, { useState, useEffect } from 'react'
import {
    Card,
    Icon,
    Image,
    Divider,
    Segment,
    Button,
    Popup,
    Header,
    Modal
} from 'semantics-ui-react'
import PostComment from './PostComment'
import CommentInputField from './CommentInputField'
import calculateTime from '../../utils/calculateTime'
import Link from 'next/link'
import { deletePost, likePost } from '../../utils/postActions'
import likeList from '../likeList'
import ImagineModal from '../ImagineModal'
import NoImagineModal from '../NoImagineModal'



function CardPost() {
    const [likes, setLikes] = useState(post.likes)
    const isLiked = likes.length > 0 && likes.filter(like => like.user === user._id).length > 0
    const [comments, setComments] = useState(post.comments)
    const [error, setError] = useState(null)

    const [showModal, setShowModal] = useState(false)

    const addPropsToModal = () => ({
        post,
        user,
        setLikes,
        likes,
        isLiked,
        comments,
        setComments

    })
    return (
        <>
            {showModal && (
                <Modal open={showModal} closeIcon closeDimmerClick onClose={() => setShowModal(false)}>
                    <Modal.Content>
                        {post.picUrl ? <ImagineModal {...addPropsToModal()} /> : <NoImagineModal {...addPropsToModal()} />}
                    </Modal.Content>

                </Modal>
            )}


            <Segment basic>
                <Card color="teal" fluild>
                    {post.picUrl && (
                        <Image src={post.picUrl}
                            style={{ cursor: "pointer" }}
                            floated="left"
                            wrapped
                            ui={false}
                            alt="PostImage"
                            onclick={() => setShowModal(true)}
                        />
                    )}
                    <Card.Content>
                        <Image floated="left" src={post.user.profilePicUrl} avatar circular />
                        {(user.role === 'root' || post.user._id === user._id) && (
                            <>
                                <Popup
                                    on="click"
                                    postion="top right"
                                    trigger={
                                        <Image
                                            src="/deleteIcon.svg"
                                            style={{ cursor: "pointer" }}
                                            size="mini"
                                            floated="right"
                                        />
                                    }>
                                    <Header as='h4' content="Are you sure?" />
                                    <p>This action is irreversible</p>
                                    <Button
                                        color='red'
                                        icon="trash"
                                        content="Delete"
                                        onclick={() => deletePost(post._id, setPosts, setShowToastr)}
                                    />
                                </Popup>
                            </>
                        )}
                        <Card.header>
                            <Link href={`/${post.user.username}`}>
                                <a>{post.user.name}</a>
                            </Link>
                        </Card.header>
                        <Card.Meta>{calculateTime(post.createdAt)}</Card.Meta>
                        {post.location && <Card.Meta content={post.location} />}
                        <Card.Description style={{
                            fontSize: "17px",
                            letterSpacing: "0.1px",
                            wordSpacing: "0.35px"
                        }}>
                            {post.text}
                        </Card.Description>
                        <Card.Content extra>
                            <Icon
                                name={isLiked ? "heart" : "heart outline"}
                                color="red"
                                style={{ cursor: "pointer" }}
                                onclick={() => likePost(post._id, user._id, setLikes, isLiked ? false : true)}
                            />
                            <likeList postId={post._id}
                                trigger={

                                    likes.length > 0 && (
                                        <span className='spanLikesList'>
                                            {`${likes.length} ${likes.length === 1 ? "like" : "likes "}`}
                                        </span>
                                    )

                                }
                            />
                            <Icon
                                name="comment outline"
                                style={{ marginLeft: "7px" }}
                                color="blue"
                            />
                            {comments.length > 0 && comments.map((comment, i) => (
                                i < 3 && (
                                    <PostComment
                                        key={comment._id}
                                        comment={comment}
                                        postId={post._id}
                                        user={user}
                                        setComments={setComments}
                                    />
                                )
                            ))}
                            {comments.length > 3 && (<Button content="View More" color='teal' basic circular
                                onclick={() => setShowModal(true)}
                            />
                            )}
                            <Divider hidden />
                            <CommentInputField
                                user={user}
                                postId={post._id}
                                setComments={setComments} />
                        </Card.Content>
                    </Card.Content>

                </Card>

            </Segment>
            <Divider hidden />
        </>
    )
}

export default CardPost