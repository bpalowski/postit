import React from 'react'
import LoginNav from '../Nav/LoginNav'
import SignUpNav from '../Nav/SignUpNav'

const EnteryPage = () => {
  return (
    <div>
      <div className="nameBannerContainer">
        <SignUpNav />
        <LoginNav />

      </div>
    </div>
  )
}
export default EnteryPage