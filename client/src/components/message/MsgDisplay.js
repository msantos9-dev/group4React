import React from 'react'
import Avatar from '../Avatar'
import { imageShow, videoShow } from '../../utils/mediaShow'
import { useSelector, useDispatch } from 'react-redux'
import { deleteMessages } from '../../redux/actions/messageAction'
import Times from './Times'
import Swal from 'sweetalert2';

const MsgDisplay = ({user, msg, theme, data}) => {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleDeleteMessages = () => {
        if(!data) return;
        Swal.fire({
            text: "Are you sure you want to delete this message?",
            showCancelButton: true,
            confirmButtonColor: '#00E3BF',
            cancelButtonColor: 'gray',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            allowEnterKey: true,
            timer: 3000,
            timerProgressBar: true,
            
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    text: 'Message deleted successfully.',
                    customClass: {
                      container: 'position-absolute'
                    },
                    toast: true,
                    position: 'top-right',
                    timer: 1500,
                    confirmButtonColor: "#00E3BF"
                  })
                dispatch(deleteMessages({msg, data, auth}))
                
            }
        })
      
    }

    return (
        <>
            <div className="chat_title" >
                <Avatar src={user.avatar} size="small-avatar" />
                <span className='ml-2'>@{user.username}</span>
            </div>

            <div className="you_content">
                { 
                    user._id === auth.user._id && 
                    <i className="fas fa-trash text-secondary"
                    onClick={handleDeleteMessages} />
                }

                <div className='outline-none'>
                    {
                        msg.text && 
                        <div className="chat_text"
                        style={{filter: theme ? 'invert(1)' : 'invert(0)'}}
                        >
                            <span style={{filter: theme ? 'invert(1)' : 'invert(0)'}}>{msg.text}</span>
                        </div>
                    }
                    {
                        msg.media.map((item, index) => (
                            <div key={index}>
                                {
                                    item.url.match(/video/i)
                                    ? videoShow(item.url, theme)
                                    : imageShow(item.url, theme)
                                }
                            </div>
                        ))
                    }
                </div>
            
                {
                    msg.call &&
                    <button className="btn d-flex align-items-center py-3"
                    style={{background: '#eee', borderRadius: '10px'}}>

                        <span className="material-icons font-weight-bold mr-1"
                        style={{ 
                            fontSize: '1.5rem', color: msg.call.times === 0 ? 'gray' : '#00E3BF',
                            filter: theme ? 'invert(1)' : 'invert(0)'
                        }}>
                            {
                                msg.call.times === 0
                                ? msg.call.video ? 'videocam_off' : 'phone_disabled'
                                : msg.call.video ? 'video_camera_front' : 'call'
                            }
                        </span>

                        <div className="text-left">
                            <h6>{msg.call.video ? 'Video Call' : 'Audio Call'}</h6>
                            <small>
                                {
                                    msg.call.times > 0 
                                    ? <Times total={msg.call.times} />
                                    : new Date(msg.createdAt).toLocaleTimeString()
                                }
                            </small>
                        </div>

                    </button>
                }
            
            </div>

            <div className="chat_time">
                {new Date(msg.createdAt).toLocaleString()}
            </div>
        </>
    )
}

export default MsgDisplay
