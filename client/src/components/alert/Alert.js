import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

import Loading from './Loading'
import Toast from './Toast'


const Notify = () => {
    const { alert } = useSelector(state => state, 2500)
    const dispatch = useDispatch()

    return (
        <div>
            {alert.loading && <Loading />}

            {
                alert.error && 
                <Toast msg={{title: 'Error', body: alert.error}} 
                handleShow={() => dispatch({type: GLOBALTYPES.ALERT, payload: {}})} 
                txtColor="text-danger" />
            }

            {
                alert.success && 
                <Toast msg={{title: 'Success', body: alert.success, }} 
                handleShow={() => dispatch({type: GLOBALTYPES.ALERT, payload: {}})}
                txtColor="text-success" />
            }
            
        </div>
    )
}

export default Notify
