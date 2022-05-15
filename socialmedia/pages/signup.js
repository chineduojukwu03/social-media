import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Form, Button, Message, Segment, TextArea, Divider } from 'semantic-ui-react'
import Input from '../component/common/Input'
import { HeaderMessage, FooterMessage } from '../components/common/WecomeMessage'
import { registerUser } from '../utils/authUser'
import uploadPic from '../utils/uploadPicToCloudindinary'
const regexUsername = /^(?|.*\.\.)(|.*\.$)[^\w][\w.]{0,29}$/;
const cancel


function SignUp() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        bio: '',
        facebook: '',
        twitter: '',
        instagram: '',
        youtube: ''
    })

    const { name, email, password, bio } = user

    const handleChange = (e) => {
        const { name, value, files } = e.target.value
        if (name === "media") {
            setMedia(files[0])
            setMediaPreview(URL.createObjectURL(files[0]))
        }
        setUser(prev => ({ ...prev, [name]: value }))
    }

    const { name, email, password, bio } = user

    const [showSocialLink, setShowSocialLink] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [formloading, setFormloading] = useState(false)
    const [submitDisable, setSubmitDisable] = useState(true)

    const [username, setUsername] = useState('')
    const [usernameLoading, setUsernameLoading] = (false)
    const [usernameAvailable, setUsernameAvailable] = useState(false)
    const [media, setMedia] = usetste(null)
    const [mediaPreview, setMediaPreview] = useState(null)
    const [highlight, setHighligt] = useState(false)
    const inputRef = useRef()

    useEffect(() => {
        const isUser = Object.values({ email, name, password, bio }).every(item => Boolean(item))
        isUser ? setSubmitDisable(false) : setSubmitDisable(true)
    }, [user])

    const checkUsername = () => {
        setUsernameLoading(true)

        try {
            cancel && cancel()
            const CancelToken = axios.CancelToken
            const res = await axios.get(`${baseUrl}/api/signup ${username}`, {
                cancelToken: new CancelToken(canceler => {
                    cancel = canceler
                })
            })
            if (errorMsg !== null) {
                setErrorMsg(null)
            }
            if (res.data === "Availabel") {
                setUsernameAvailble(true)
                setUser(prev => [{ ...prev, username }])
            }
        } catch (error) {
            setUsernameAvailble(false)
            setUsernameLoading(false)

        }
        setFormloading(false)
    }
    useEffect(() => {
        username === "" ? setUsernameAvailable(false) : checkUsername()
    }, [username])

    const submitHandler = (e) => {
        e.preventDefault()
        setFormloading(true)

        let profilePicUrl;
        if (media !== null) {
            profilePicUrl = await uploadPic(media)
        }
        if (media !== null && !profilePicUrl) {
            setFormloading(false)
            return setErrorMsg('Error uploading image')
        }
        await registerUser(user, profilePicUrl, setErrorMsg, setFormloading)
    }
    return (
        <>
            <HeaderMessage />
            <Form
                loading={formloading}
                error={errorMeg !== null}
                onSubmit={submitHandler}>
                <Message
                    error header='Oop'
                    content={errorMsg}
                    onDismiss={() => setErrorMsg(null)}
                />
                <Segment>
                    <Image mediaPreview={mediaPreview}
                        setMediaPreview={setMediaPreview}
                        setMedia={setMedia}
                        inputRef={inputRef}
                        highlight={highlight}
                        setHighligt={setHighligt}
                        handleChange={handleChange}
                    />

                    <Form.Input

                        require
                        label='name'
                        placeHolder='Name'
                        name='name'
                        value={name}
                        onChange={handleChange}
                        fluid icon='user'
                        iconPosition='left' />

                    <Form.Input
                        require
                        label='email'
                        placeHolder="Email"
                        name='email'
                        value={email}
                        onChange={handleChange}
                        fluid icon='envloped'
                        iconPosition='left' />


                    <Form.Input
                        require
                        label='password'
                        placeHolder="Password"
                        name='password'
                        value={password}
                        onChange={handleChange}
                        fluid icon={{
                            name: 'eye',
                            link: true,
                            onClick: () => setShowPassword(!showPassword)
                        }}
                        iconPosition='left'
                        type={showPassword ? 'text' : 'password'}
                    />
                    <Form.Input
                        loading={usernameLoading}
                        error={usernameAvaiable}
                        required
                        label='username'
                        placeHolder='Username'
                        value={username}
                        onChange={e => {
                            setUsername(e.target.value)
                            if (regexUsername.test()) {
                                setUsernameAvailble(true)
                            } else {
                                setUsernameAvailble(false)
                            }

                        }}
                        fluid
                        Icon={usernameAvaiable ? 'Check' : 'Close'}
                        iconPosition='left'

                    />
                    <Input user={user}
                        showSocialLink={showSocialLink}
                        setShowSocialLink={setShowSocialLink}
                        handleChange={handleChange}
                    />
                    <Divider hidden />
                    <Button
                        content='signup'
                        type='submit' color='orange'
                        disabled={submitDisable || !usernameAvailable} />

                </Segment>
            </Form>
            <FooterMessage />
        </>


    )
}

export default SignUp