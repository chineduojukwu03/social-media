import React from 'react'
import { Form, Segment, Image, Icon, Header } from 'semantic-ui-react'


function Image({
    highlight,
    setHighligt,
    mediaPreview,
    setMediaPreview,
    media,
    setMedia,
    handleChange,
    inputRef }) {

    return (
        <>
            <Form.Field>
                <Segment placeholder basic secondary>
                    <input
                        style={{ display: 'none' }}
                        type='file'
                        accept='image/*'
                        onChange={handleChange}
                        name='media' />

                    <div onDrageOver={(e) => {
                        e.preventDefault()
                        setHighligt(true)
                    }}
                        onDrageLeave={(e) => {
                            e.preventDefault()
                            setHighligt(false)
                        }}
                        onDrop={(e) => {
                            e.preventDefault()
                            setHighligt(true)
                            const dropedFile = Array.from(e.dataTransfer.files)
                            setMedia(dropedFile[0])
                            setMediaPreview(URL.createObjectURL(dropedFile[0]))
                        }}
                    >


                        {mediaPreview === null ? (
                            <>
                                <Segment color={highlight ? 'green' : ''} placeholder basic>
                                    <Header icon>
                                        <Icon
                                            name='file image outline'
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => inputRef.current.click()}
                                        />
                            Drag Drop or click to   upload Image
                        </Header>
                                </Segment>
                            </>

                        ) : (
                            <>
                                <Segment color='green' placeholder basic>
                                    <Image src={mediaPreview}
                                        size='medium'
                                        contered style={{ cursor: 'pointer' }} onClick={() => inputRef.current.click()} />
                                </Segment>
                            </>
                        )}
                    </div>

                </Segment>
            </Form.Field>
        </>

    )
}

export default Image