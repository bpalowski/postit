import React from 'react'
import LoginComponent from '../components/LoginSignUp/LoginComponent'
import FooterComponent from '../components/Footer/FooterComponent'


const LoginPage = () => {
  return (
    <div>
      <div><LoginComponent /></div>
      <div className="footerComponent">  <FooterComponent /></div>

    </div>
  )
}
export default LoginPage