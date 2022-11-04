import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'
import LoadIcon from '../../images/loading.gif'
import { getSuggestions } from '../../redux/actions/suggestionsAction'

const RightSideBar = () => {
    const { auth, suggestions } = useSelector(state => state)
    const dispatch = useDispatch()
    const { theme } = useSelector(state => state)

    return (
        <div className="mt-3">
            <UserCard user={auth.user} />

            <div className="d-flex justify-content-between align-items-center my-3">
                <h5 style={{filter: theme ? 'invert(1)' : 'invert(0)', color: "#00E3BF"}}>People you may know.</h5>
                {
                    !suggestions.loading &&
                    
                    <span className="mr-2" style={{ fontSize: "25px"}}><ion-icon style={{cursor: 'pointer'}}
                    onClick={ () => dispatch(getSuggestions(auth.token)) }  name="sync-outline"></ion-icon></span>
                }
            </div>

            {
                suggestions.loading
                ? <img style={{width: "200px"}} src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
                : <div className="suggestions">
                    {
                        suggestions.users.map(user => (
                            <UserCard key={user._id} user={user} >
                                <FollowBtn user={user} />
                            </UserCard>
                        ))
                    }
                </div>
            }

           

        </div>
    )
}

export default RightSideBar
