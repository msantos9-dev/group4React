import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import Search from './Search'
import brandLogo from '../../images/justMe.png'

const Header = () => {
const [color, setColor] = useState(false)
const changeColor = () => {
    if(window.scrollY >= 30){
        setColor(true)
    }else{
        setColor(false)
    }
}
window.addEventListener("scroll", changeColor)
    return (
        <div className="header"  >
            <nav style={{borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px"}} className={`navbar navbar-expand-sm navbar-light 
        justify-content-between align-middle ${color ? 'bg-white': ''}`}>

                <Link to="/" className="logo">
                    <h1 className="navbar-brand  p-0 m-0"
                    onClick={() => window.scrollTo({top: 0})}>
                        <span ><img  style={{width: '180px'}} alt="" src={brandLogo} /></span>
                    </h1>
                </Link>

                <Search />

                <Menu />
            </nav>
        </div>
    )
}

export default Header
