import React, { useState } from 'react'
import { List, Image, Search } from 'semantic-ui-react'
import axios from 'axios'
import cookie from 'js-cookie'
import Router from 'next/router'
import baseUrl from '../../utils/baseURL'
let cancel


function Search() {

    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState([])

    const handleChange = async e => {
        const { value } = e.target
        setText(value)
        setLoading(true)

        try {
            cancel && cancel()
            const CancelToken = axios.CancelToken
            const token = cookie.get('token')
            const res = await axios.get(`${baseUrl}/api/search/${value}`, {
                headers: { Authorization: token },
                CancelToken: new CancelToken(canceler => {
                    cancel = canceler
                })

            });

            if (res.data.length === 0) {
                return setLoading(false)
            } else {
                setResults(res.data)
            }


        } catch (error) {
            console.log('Error Searching')

        }
        setLoading(false)
    }

    return (
        <Search
            onBlur={() => {
                results.length > 0 && setResults([]);
                loading && setLoading(false)
                setText("")
            }}
            loading={loading}
            value={value}
            resultRenderer={ResultRenderer}
            results={results}
            onSearchChange={handleChange}
            minCharacters={1}
            onResultChange={(e, data) => Router.push(`${data.result.username}`)}

        />

    )
}

const ResultRenderer = ({ _id, profilePicUrl, name }) => {
    return (
        <List key={_id}>
            <List.Item>
                <Image src={profilePicUrl} alt='profilePic' avatar />
                <List.Content header={name} as='a' />
            </List.Item>
        </List>
    )
}

export default Search