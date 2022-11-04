import React, {useState} from 'react'

const Toast = ({msg, handleShow, txtColor}) => {

    const [show, setShow] = useState(true)
    if(show){
        setTimeout(()=> {
            setShow(false)
        }, 2000)
    
    return (
        <div className={`toast show position-fixed  ${txtColor}`} 
         style={{top: '5px', right: '5px', minWidth: '300px', zIndex: 50,}} >
            <div className={`toast-header  ${txtColor}`} >
                <strong className="mr-auto ">{msg.title}</strong>
                <button className="ml-2 mb-1 close "
                data-dismiss="toast" style={{outline: 'none'}}
                onClick={handleShow}>
                    &times;
                </button>
            </div>
            <div className= {`toast-body  ${txtColor}`} >
                {msg.body}
            </div>
        </div>
    )
    }
    return null
}

export default Toast
