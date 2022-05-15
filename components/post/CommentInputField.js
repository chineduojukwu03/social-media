import React, { useState } from 'react'
import { Form } from 'semantics-ui-react'
import { PostComment } from '../../utils/postActions'

function CommentInputField({ postId, user, setComments }) {
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        await PostComment(postId, user, setComments, setText)
        setLoading(false)
    }
    return (
        <Form reply>
            <Form.Input
                onSubmit={handleSubmit}
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Add Comment"
                action={{
                    color: "blue",
                    icon: "edit",
                    loading: loading,
                    disabled: text === "" || loading

                }}
            />
        </Form>
    )
}

export default CommentInputField