import React from 'react'
import { Menu, Container, Icon } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import Link from 'next/link'

function NavBar() {
    const router = useRouter()
    const isActive = route => router.pathname === route

    return (
        <Menu fluid borderless>
            <Container>
                <Link href='/login'>
                    <Menu.Item active={isActive('/login')} />
                    <Icon size='large' name='sign in'>
                        Login
                    </Icon>
                </Link>
                <Link href='/signup'>
                    <Menu.Item active={isActive('/signup')}>
                        <Icon size='large' name='signup'>
                            SignUP
                        </Icon>
                    </Menu.Item>
                </Link>

            </Container>
        </Menu>

    )


}
export default NavBar