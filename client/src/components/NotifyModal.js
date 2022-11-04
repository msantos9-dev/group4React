import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NoNotice from '../images/notice.png'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import moment from 'moment'
import { isReadNotify, NOTIFY_TYPES, deleteAllNotifies } from '../redux/actions/notifyAction'
import Swal from 'sweetalert2';

const NotifyModal = () => {
    const { auth, notify } = useSelector(state => state)
    const dispatch = useDispatch()
    const { theme } = useSelector(state => state)

    const handleIsRead = (msg) => {
        dispatch(isReadNotify({msg, auth}))
    }

    const handleSound = () => {
        dispatch({type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound})
    }

    const handleDeleteAll = () => {
        const newArr = notify.data.filter(item => item.isRead === false)
        if(newArr.length === 0) return dispatch(deleteAllNotifies(auth.token))

        Swal.fire({
            text: "Are you sure you want to delete all notifications?",
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
                return dispatch(deleteAllNotifies(auth.token))
            }
            
        })

     
    }

    return (
        <>
        <div style={{minWidth: '350px', borderRadius: "50px"}}>
            <div className="d-flex justify-content-between align-items-center px-3" >
                <h3>Notifications</h3>
                {
                    notify.sound 
                    ? <i className="fas fa-bell " 
                    style={{filter: theme ? 'invert(1)' : 'invert(0)', fontSize: '1.2rem', cursor: 'pointer', color: "#00E3BF"}}
                    onClick={handleSound} />

                    : <i className="fas fa-bell-slash"
                    style={{filter: theme ? 'invert(1)' : 'invert(0)', fontSize: '1.2rem', cursor: 'pointer', color: "#00E3BF"}}
                    onClick={handleSound} />
                }
            </div>
            <hr className="mt-0" />

            {
                notify.data.length === 0 &&
                <span className='ml-3 mb-5'>You have no notifications.</span>
           
            }

            <div style={{maxHeight: 'calc(100vh - 200px)', overflow: 'auto'}}>
                {
                    notify.data.map((msg, index) => (
                        <div key={index} className="px-2 mb-3" >
                            <Link to={`${msg.url}`} className="d-flex text-dark align-items-center"
                            onClick={() => handleIsRead(msg)}>
                                <Avatar src={msg.user.avatar} size="big-avatar" />

                                <div className="mx-1 flex-fill ml-3">
                                    <div>
                                        <strong className="mr-1">{msg.user.username}</strong>
                                        <span>{msg.text}</span>
                                    </div>
                                    {msg.content && <small>{msg.content.slice(0,20)}...</small>}
                                </div>

                                {
                                    msg.image &&
                                    <div style={{width: '30px'}} >
                                        {
                                            msg.image.match(/video/i)
                                            ? <video src={msg.image} width="100%" />
                                            : <Avatar  src={msg.image} size="medium-avatar" />
                                        }
                                    </div>
                                }
                                
                            </Link>
                            <small className="text-muted d-flex justify-content-between px-2">
                                {moment(msg.createdAt).fromNow()}
                                {
                                    !msg.isRead && <i style={{filter: theme ? 'invert(1)' : 'invert(0)', color: "#00E3BF"}} className="fas fa-circle" />
                                }
                            </small>
                        </div>
                    ))
                }

            </div>

            <hr className="my-1" />
            <div className="text-right mr-2" style={{filter: theme ? 'invert(1)' : 'invert(0)', cursor: 'pointer',color: "#00E3BF"}}
            onClick={handleDeleteAll}>
                Delete Notifications
            </div>

        </div>
        </>
    )
}

export default NotifyModal
