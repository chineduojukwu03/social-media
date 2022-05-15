import React, { useState } from 'react'
import { Comment, Icon } from 'semantic-ui-react'
import calculateTime from '../../utils/calculateTime'
import { deleteComment } from '../../utils/postActions'

function PostComment({ comment, user, setComments, postId }) {

    const [disabled, setDisabled] = useState(false)
    return (
        <>
            <Comment.Group>
                <Comment>
                    <Comment.Avatar src={comment.user.profilePicUrl} />
                    <Comment.Content>
                        <Comment.Avatar as="a" href={`/${comment.user.username}`}>
                            {comment.user.name}
                        </Comment.Avatar>
                        <Comment.Metadata>{calculateTime(comment.date)}</Comment.Metadata>
                        <Comment.Text>{comment.text}</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>
                                {(user.role === 'root' || comment.user._id === user._id) && (
                                    <Icon
                                        disabled={disabled}
                                        color='red'
                                        name='trash'
                                        onclick={() => deleteComment(postId, comment._id, setComments
                                        ), setDisabled(true)

                                        }

                                    />

                                )}
                            </Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
            </Comment.Group>
        </>
    )
}

export default PostComment