import React, { PureComponent } from 'react'
import EnteryPage from './Pages/EnteryPage'
import LoginNav from './Nav/LoginNav'
import SignUpNav from './Nav/SignUpNav'

// import NavBanner from './Nav/NavBanner'
import { Route, Routes } from 'react-router-dom'

import Login from './Pages/LoginPage'
import Signup from './Pages/SignUpPage'
import Main from './Pages/MainPage'

import './App.scss'


class App extends PureComponent {

  render() {
    return (
      <div className="mainBody">


        <div>
          <Routes>
            <Route exact path="/" element={<EnteryPage />} />
            <Route path="/allPostLoggedIn" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    )
  }
}

export default App