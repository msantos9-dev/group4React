import React from 'react'
import { useSelector } from 'react-redux'

const Avatar = ({src, size}) => {
    const { theme } = useSelector(state => state)

    return (
        <img src={src} alt="avatar" className={size}
        style={{filter: `${theme ? 'invert(1)' : 'invert(0)'}`, borderStyle: 'double', borderColor: " #ececec", borderWidth: "3px"}} />
    )
}

export default Avatar
