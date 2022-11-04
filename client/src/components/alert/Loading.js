import React from 'react'

const Loading = () => {
    return (
        <div className="position-fixed w-100 h-100 text-center loading"
        style={{ color: "#00E3BF", top: 0, left: 36, zIndex: 50, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',}}>

            <svg width="300" height="300" viewBox="0 0 40 50">
                <polygon stroke="#fff" strokeWidth="1" fill="#00E3BF"
                points="13,3 3,14 12,14 11,21 21,10 12,10" />
            </svg>
        </div>
    )
}

export default Loading
