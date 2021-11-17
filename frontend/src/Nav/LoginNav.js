import React from 'react'
import { Link } from 'react-router-dom';
import '../scss/NavBanner.scss';

export default function LoginNav() {
  return (
    <div className="nameBannerContainer">
      <div className="LoginComponentContainer">
        <Link to="/login">LoginComponentContainer</Link>
      </div>
    </div>
  )
}
