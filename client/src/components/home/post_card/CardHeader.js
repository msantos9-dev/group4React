import React from 'react'
import Avatar from '../../Avatar'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'
import { deletePost } from '../../../redux/actions/postAction'
import { BASE_URL } from '../../../utils/config'
import Swal from 'sweetalert2';

const CardHeader = ({post}) => {
    const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const history = useHistory()

    const handleEditPost = () => {
        dispatch({ type: GLOBALTYPES.STATUS, payload: {...post, onEdit: true}})
       
    }

    const handleDeletePost = () => {

        Swal.fire({
            text: "Are you sure you want to delete this post?",
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
                    text: 'Post deleted successfully.',
                    customClass: {
                      container: 'position-absolute'
                    },
                    toast: true,
                    position: 'top-right',
                    timer: 1500,
                    confirmButtonColor: "#00E3BF"
                  })
                dispatch(deletePost({post, auth, socket}))
            return history.push("/")
            }
            
        })

        // if(window.confirm("Are you sure want to delete this post?")){
        //     dispatch(deletePost({post, auth, socket}))
        //     return history.push("/")
        // }
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`)
    }

    return (
        <div className="card_header">
            <div className="d-flex">
                <Avatar src={post.user.avatar} size="big-avatar" />

                <div className="card_name ml-2">
                    <h6 className="m-0">
                        <Link to={`/profile/${post.user._id}`} className="text-dark">
                            @{post.user.username}
                        </Link>
                    </h6>
                    <small className="text-muted">
                        {moment(post.createdAt).fromNow()}
                    </small>
                </div>
            </div>

            <div className="nav-item dropdown">
                <span className="material-icons" id="moreLink" data-toggle="dropdown">
                <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                </span>

                <div className="dropdown-menu">
                    {
                        auth.user._id === post.user._id &&
                        <>
                            <div className="dropdown-item" onClick={handleEditPost}>
                                <span className="material-icons mr-2"><ion-icon name="create-outline"> </ion-icon></span> Edit Post
                            </div>
                            <div className="dropdown-item" onClick={handleDeletePost} >
                                <span className="material-icons mr-2"><ion-icon name="close-circle-outline"> </ion-icon></span> Delete Post
                            </div>
                        </>
                    }

                    <div className="dropdown-item" onClick={handleCopyLink}>
                        <span className="material-icons mr-2"><ion-icon name="copy-outline"></ion-icon> </span> Copy Link
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardHeader
