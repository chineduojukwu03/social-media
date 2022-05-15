import React, { createRef } from 'react'
import HeadTags from './HeadTags'
import NavBar from './NavBar'
import {
    Container,
    Visibility,
    Grid,
    Sticky,
    Ref,
    Divider,
    Segmentn
} from 'semantic-ui-react'
import Router from 'next/router'
import nprogress from 'nprogress'
import SideMenu from './Common/SideMenu'


function Layout({ children, user }) {
    const contextRef = createRef()


    Router.onRouteChangeStart = nprogress.start()
    Router.onRouteChangeComplete = nprogress.done()
    Router.onRouteChangeError = nprogress.done()
    return (
        <>
            <HeadTags />
            {user ? <>
                <div style={{ marginLeft: '1rem', marginRight: '1rem' }}>
                    <Ref innerRef={contextRef}>
                        <Grid>
                            <Grid.Column floated='left' width={2}>
                                <Sticky context={contextRef}>
                                    <SideMenu user={user} />
                                </Sticky>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Visibility context={contextRef}>{children}</Visibility>
                            </Grid.Column>
                            <Grid.Column floated='left' width={4}>

                                <Sticky context={contextRef}>
                                    <Segment basic>
                                        <Search />
                                    </Segment>
                                </Sticky>
                            </Grid.Column>
                        </Grid>

                    </Ref>


                </div>
            </>

                :
                <>
                    <NavBar />
                    <Container style={{ paddingTop: "1rem" }}>
                        {children}
                    </Container>
                </>
            }

        </>
    )
}

export default Layout