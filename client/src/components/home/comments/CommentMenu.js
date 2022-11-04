import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../../../redux/actions/commentAction'
import Swal from 'sweetalert2';

const CommentMenu = ({post, comment, setOnEdit}) => {

    const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleRemove = () => {
        if(post.user._id === auth.user._id || comment.user._id === auth.user._id){
           
                dispatch(deleteComment({post, auth, comment, socket}))
                Swal.fire({
                    text: 'Comment deleted successfully.',
                    customClass: {
                      container: 'position-absolute'
                    },
                    toast: true,
                    position: 'top-right',
                    timer: 1500,
                    confirmButtonColor: "#00E3BF"
                  })
            }else{
                Swal.fire({
                    text: 'You cannot remove comment from other users.',
                    customClass: {
                      container: 'position-absolute'
                    },
                    toast: true,
                    position: 'top-right',
                    timer: 1500,
                    confirmButtonColor: "#00E3BF"
                  })
            }
    }

    const MenuItem = () => {
        return(
            <>
                <div className="dropdown-item" onClick={() => setOnEdit(true)}>
                    <span className="material-icons">create</span> Edit
                </div>
                <div className="dropdown-item" onClick={handleRemove}>
                    <span className="material-icons">delete_outline</span> Remove
                </div>
            </>
        )
    }


    return (
        <div className="menu">
            {
                ((post.user._id === auth.user._id || comment.user._id === auth.user._id)) &&
                <div className="nav-item dropdown">
                    <span className="material-icons" id="moreLink" data-toggle="dropdown">
                        more_vert
                    </span>

                    <div className="dropdown-menu" aria-labelledby="moreLink">
                        {
  post.user._id === auth.user._id ?  comment.user._id === auth.user._id ? MenuItem() : 
                                <div className="dropdown-item" onClick={handleRemove}>
                                    <span className="material-icons">delete_outline</span> Remove
                                </div>
                            : comment.user._id === auth.user._id && MenuItem()
                        }
                    </div>

                </div>
            }
            
        </div>
    )
}

export default CommentMenu
