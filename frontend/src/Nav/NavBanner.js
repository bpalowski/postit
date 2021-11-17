import React from 'react'
import { Link } from 'react-router-dom';
import '../scss/NavBanner.scss';


const NavBanner = () => {
  return (
    <div className="nameBannerContainer">
      <div >
        <Link to="/allPostLoggedIn">allPostLoggedIn</Link>
      </div>
      <div >
        <Link to="/logOut">logOut</Link>
      </div>
    </div>
  )
}
export default NavBanner