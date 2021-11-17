import React from 'react'
import { Link } from 'react-router-dom';
import '../scss/NavBanner.scss';

export default function SignUpNav() {
  return (
    <div className="nameBannerContainer">

      <div className="SignUpComponentContainer">
        <Link to="/signup">SignUpComponent</Link>
      </div>

    </div>
  )
}
