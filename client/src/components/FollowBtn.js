import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { follow, unfollow } from '../redux/actions/profileAction'

const FollowBtn = ({user}) => {
    const [followed, setFollowed] = useState(false)

    const { auth, profile, socket } = useSelector(state => state)
    const dispatch = useDispatch()
    const { theme } = useSelector(state => state)
    
    const [load, setLoad] = useState(false)

    useEffect(() => {
        if(auth.user.following.find(item => item._id === user._id)){
            setFollowed(true)
        }
        return () => setFollowed(false)
    }, [auth.user.following, user._id])

    const handleFollow =  async () => {
        if(load) return;

        setFollowed(true)
        setLoad(true)
        await dispatch(follow({users: profile.users, user, auth, socket}))
        setLoad(false)
    }

    const handleUnFollow = async () => {
        if(load) return;

        setFollowed(false)
        setLoad(true)
        await dispatch(unfollow({users: profile.users, user, auth, socket}))
        setLoad(false)
    }

    return (
        <>
        {
            followed
            ? <button className="btn " style={{filter: theme ? 'invert(1)' : 'invert(0)',color: '00E3BF', outline: "solid", outlineWidth: "1px", outlineColor: "gray"}}
            onClick={handleUnFollow}>
                UnFollow
            </button>
            : <button className="btn "  style={{filter: theme ? 'invert(1)' : 'invert(0)', color: '#00E3BF', outline: "solid", outlineWidth: "1px", outlineColor: "00E3BF"}}
            onClick={handleFollow}>
                Follow
            </button>
        }
        </>
    )
}

export default FollowBtn
