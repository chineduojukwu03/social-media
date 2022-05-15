import React from 'react'
import { Icon, List } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import authUser from '../../utils/authUser'
import Link from 'next/link'

function SideMenu({ user: unreadNotification, email, unreadMessage, username }) {
    const router = useRouter()
    const isActive = route => router.pathname === route

    return (
        <>
            <List style={{ padding: '1rem' }}
                size='big'
                verticalAlign='middle'
                selection>
                <Link href="/">
                    <List.Item active={isActive('/')}>
                        <Icon name='home' size='large' color={isActive('/') && 'teal'} />
                        <List.Content>
                            <List.Header content='Home' />
                        </List.Content>
                    </List.Item>
                </Link>
                <br />

                <Link href="/message">
                    <List.Item active={isActive('/message')}>
                        <Icon name={unreadMessage ? 'hand point right' : 'mail outline'} size='large'
                            color={
                                (isActive('/message') && 'teal') || (unreadMessage && 'orange')} />
                        <List.Content>
                            <List.Header content="Message" />
                        </List.Content>
                    </List.Item>
                </Link>
                <Link href="/notification">
                    <List.Item active={isActive('/nofication')}>
                        <Icon name={unreadNotification ? 'handd point right' : 'bell outline'}
                            size='large ' color={(isActive('/notification') && 'teal') || (unreadNotification && 'yellow')} />
                        <List.Content>
                            <List.Header content='Notification' />
                        </List.Content>
                    </List.Item>
                </Link>
                <br />

                <Link href={`${username}`}>
                    <List.Item active={router.query.username === username}>
                        <Icon name='user'
                            size='large'
                            color={router.query.username === username && 'teal'} />
                        <List.Content>
                            <List.Header content='Account' />
                        </List.Content>
                    </List.Item>
                    <br />

                </Link>
                <List.Item onClick={() => logout(email)}>
                    <Icon name='log out' size='large' />
                    <List.Content>
                        <List.Header content='Logout' />
                    </List.Content>
                </List.Item>
            </List>
        </>
    )
}

export default SideMenu
