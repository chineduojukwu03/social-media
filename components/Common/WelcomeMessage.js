import { Message, Icon, Divider } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import Link from 'next/link'


export const HeaderMessage = () => {
    const router = useRouter()
    const signupRouter = router.pathname === '/signup'

    return (
        <Message attached
            header={signupRouter ? 'Get Started' : 'Welcome Back'}
            icon={signupRouter ? 'Setting' : 'Privacy'}
            content={signupRouter ? 'Create New Account' : 'Login with Email and Password'} />

    )
}

export const FooterMessage = () => {
    const router = useRouter()
    const signupRouter = router.pathname === '/signup'

    return (
        <>
            {signupRouter ?
                <>
                    <Message attached='bottom' warning>
                        <Icon name='help' />
            Existing User?<Link href='/login'>Login Here</Link>

                        <Divider hidden />
                    </Message>
                </>
                :
                <>
                    <Message attached='bottom' warning>
                        <Icon name='lock' />
                        <Link href='/reset'>Forget Password</Link>
                    </Message>

                    <Message attached='bottom' warning>
                        <Icon name='help'>
                            New User? <Link href='/signup'>SignUp here </Link>
                        </Icon>
                    </Message>
                </>
            }
        </>
    )

}