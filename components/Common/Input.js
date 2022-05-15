import React from 'react'
import { Form, Button, Message, TextArea, Divider } from 'semantic-ui-react'

function Input({ user: { bio, facebook, instagram, youtube, twitter, },
    handleChange,
    showSocialLink, setShowSocialLink }) {
    return (
        <>
            <Form.Field
                required
                control={TextArea}
                name='bio'
                value={bio}
                onChange={handleChange}
                placeholder="Bio" />
            <Button
                content='Add Social Links'
                color='red'
                icon='at'
                type='button'
                onClick={() => setShowSocialLink(!showSocialLink)} />
            {showSocialLink && (
                <>
                    <Divider />
                    <Form.Input
                        icon='facebook f'
                        iconPosition='left'
                        name='facebook'
                        value={facebook}
                        onChange={handleChange}
                    />
                    <Form.Input
                        icon='twitter t'
                        iconPosition='left'
                        name='twitter'
                        value={twitter}
                        onChange={handleChange}
                    />
                    <Form.Input
                        icon='instagram i'
                        iconPosition='left'
                        name='instagram'
                        value={instagram}
                        onChange={handleChange}
                    />
                    <Form.Input
                        icon='youtube'
                        iconPosition='left'
                        name='youtube'
                        value={youtube}
                        onChange={handleChange}
                    />
                    <Message
                        icon='attention'
                        info
                        size='small'
                        header="Social Media Link Are optional"
                    />
                </>
            )}

        </>
    )
}

export default Input