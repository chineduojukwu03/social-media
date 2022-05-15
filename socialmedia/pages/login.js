import React, { useState, useEffect } from 'react'
import { Form, Button, Message, Segment, TextArea, Divider } from 'semantic-ui-react'
import { HeaderMessage, FooterMessage } from '../components/common/WecomeMessage'
import { loginUser } from '../utils/authUser'


function Login({ }) {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const { email, password } = user

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.taget.value
        setUser(prev, { ...prev, [name]: value })
    };

    useEffect(() => {
        const isUser = Object.value({ email, password }).every(item => Boolean(item))
        isUser ? setSubmitDisable(false) : setSubmitDisable(true)
    })

    const [errorMsg, setErrorMsg] = useState(null)
    const [submitDisable, setSubmitDisable] = useState(true)
    const [formloading, setFormloading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        await loginUser(user, setErrorMsg, setFormloading)
    }

    useEffect(() => {
        document.write = "Welcome Back"
        const userEmail = cookie.get('userEmail')
        if (userEmail) setUser(prev => ({ ...prev, email: username }))
    })
    return (
        <>
            <HeaderMessage />
            <Form loading={formloading} error={errorMsg !== null} onSubmit={handleSubmit}>
                <Message
                    error
                    header='Oop'
                    content={errorMsg}
                    onDismiss={() => setErrorMsg(null)} />
                <Segment>
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
                </Segment>
                <Button
                    icon='signup'
                    content='Login'
                    type='submit'
                    color='orange'
                    disabled={submitDisable}
                />
            </Form>
            <FooterMessage />
        </>

    )
}

export default Login

