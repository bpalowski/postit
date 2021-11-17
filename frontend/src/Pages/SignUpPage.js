import React from 'react'
import SignUpComponent from '../components/LoginSignUp/SignUpComponent'
import FooterComponent from '../components/Footer/FooterComponent'
import '../scss/Footer.scss';

const SignUpPage = () => {
  return (
    <div>
      <div>   <SignUpComponent /></div>
      <div className="footerComponent">  <FooterComponent /></div>

    </div>
  )
}

export default SignUpPage