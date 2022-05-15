import React, { useState, useRef } from 'react'
import { Form, Button, Image, Divider, Message, Icon } from "semantic-ui-react"
import { submitNewPost } from '../../utils/postActions'
import { deletedPost } from '../../utils/postActions'

import uploadPic from '../../utils/uploadPicToCloudinary'


function CreatePost({ user, setPosts }) {
    const [newPost, setNewPost] = useSate({ text: "", location: "" })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const inputRef = useRef()

    const [media, setMedia] = useState(null)
    const [highlight, setHighligt] = useState(false)
    const [mediaPreview, setMediaPreview] = useState(null)


    const handleChange = e => {
        const { name, value, files } = e.target

        if (name === 'media') {
            setMedia(files[0])
            setMediaPreview(URL.createObjectURL(files[0]))
        }
        setNewPost(prev => ({ ...prev, [name]: value }))
    }
    const addstyle = () => ({
        textAlign: 'center',
        height: "150px",
        width: "150px",
        border: 'dotted',
        paddingTop: media === null && "60px",
        borderColor: highlight ? "green" : "black"
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        let picUrl;

        if (media !== null) {
            picUrl = await uploadPic(media)
            if (!picUrl) {
                setLoading(true)
                return setError("Error uploading Image")
            }
        }
        await submitNewPost(
            newPost.text,
            newPost.location,
            picUrl,
            setPosts,
            setNewPost,
            setError
        );
        setError(null)
        setMediaPreview(null);
        setLoading(false)
    }


    return (
        <>
            <Form error={error !== null} onSubmit={handleSubmit}>
                <Message
                    error
                    onDimiss={() => setError(null)}
                    content={error}
                    header="Oop!"
                />
                <Form.Group>
                    <Image src={user.profilePicUrl} circular avatar inline />
                    <Form.TextArea
                        placeholder="What Happening"
                        name="text"
                        value={newPost.text}
                        onChange={handleChange}
                        rows={4}
                        width={14}
                    />

                </Form.Group>
                <Form.Group>
                    <Form.Input
                        value={newPost.location}
                        name="location"
                        label="Add Location"
                        icon="map marker alternate"
                        placeholder="want to add Location"
                    />
                    <input
                        ref={inputRef}
                        onChange={handleChange}
                        name="media"
                        style={{ display: "none" }}
                        type="file"
                        accept="image/*"
                    />
                </Form.Group>
                <div
                    onclick={() => inputRef.current.click()}
                    style={addstyle()}
                    onDrage={(e) => {
                        e.preventDefault()
                        setHighligt(true)
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault()
                        setHighligt(false)
                    }}
                    onDrop={(e) => {
                        e.preventDefault()
                        setHighligt(true)
                        const droppedFile = Array.from(e.dataTransfer.files)
                        setMedia(droppedFile[0])
                        setMediaPreview(URL.createObjectURL(droppedFile[0]))
                    }}
                >

                    {media === null ? (

                        <Icon name="plus"
                            size="big" />

                    ) : (
                        <>
                            <Image
                                style={{ height: "150px", width: "200px" }}
                                src={mediaPreview}
                                alt="postImage"
                                centered
                                size="medium"
                                onclick={() => inputRef.current.click()}
                            />
                        </>
                    )}
                </div>
                <Divider hidden />

                <Button
                    circular
                    disabled={newPost.text === "" || loading}
                    content={<strong>Post</strong>}
                    style={{ backgroundColor: "#1DA1F2", color: "white" }}
                    icon="send"
                    loading={loading}
                />
            </Form>
        </>
    )
}
export default CreatePost