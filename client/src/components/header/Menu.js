import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";
import NotifyModal from "../NotifyModal";

const Menu = () => {
  
  const navLinks = [
    { label: "Home", icon: "home-outline", path: "/" },
    { label: "Message", icon: "chatbubble-ellipses-outline", path: "/message" },
    { label: "Discover", icon: "planet-outline", path: "/discover" },
  ];

  const { auth, theme, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  

  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };

  return (
    <div className="menu mt-2">
      
      <ul className="navbar-nav flex-row">
        {navLinks.map((link, index) => (
          <li className={`nav-item px-2 ${isActive(link.path)} `} key={index}>
            <Link className="nav-link" to={link.path}>
             <span className="material-icons"
             style={{ filter: theme ? 'invert(1)' : 'invert(0)', color: `${isActive(link.path)? "#00E3BF":"gray"}` }}><ion-icon name={`${link.icon}`}></ion-icon></span>
            </Link>
          </li>
        ))}

        <li className="nav-item dropdown" style={{ opacity: 1 }}>
          <span
            className="nav-link position-relative"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="material-icons" style={{ filter: theme ? 'invert(1)' : 'invert(0)', color: notify.data.length > 0 ? "#00E3BF" : " #bababa" }} >
              {notify.data.length > 0 ? <ion-icon name="notifications"></ion-icon> : <ion-icon name="notifications-outline"></ion-icon>}
            </span>
            
            <span className="notify_length" style={{ color: notify.data.length > 0 ? "#00E3BF" : "#00E3BF" }}></span>
            
          </span>
          
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdown"
            style={{ transform: "translateX(75px)" }}
          >
            <NotifyModal />
          </div>
        </li>

        <li className="nav-item dropdown" style={{ opacity: 1 }}>
          <span
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <Avatar src={auth.user.avatar} size="medium-avatar" />
          </span>

          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
            {theme ? <span ><ion-icon  name="person-outline"></ion-icon> Profile</span>  : <span><ion-icon name="person-outline"></ion-icon> Profile</span>}
            </Link>

            <label
              htmlFor="theme"
              className="dropdown-item"
              onClick={() =>
                dispatch({
                  type: GLOBALTYPES.THEME,
                  payload: !theme,
                })
              }
            >
              {theme ? <span ><ion-icon  name="sunny-outline"></ion-icon> Light Mode
              {localStorage.setItem("mode", theme)}</span>  : <span><ion-icon name="moon-outline"></ion-icon> 
              {localStorage.setItem("mode", theme)} Dark Mode</span>}
            </label>

            <div className="dropdown-divider"></div>
            <Link
              className="dropdown-item"
              to="/"
              onClick={() => dispatch(logout())}
            >
               {theme ? <span ><ion-icon  name="exit-outline"></ion-icon> Sign-out</span>  : <span><ion-icon name="exit-outline"></ion-icon> Sign-out</span>}
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
