import React, { useState } from 'react'
import {
  Link, Routes, Route, useNavigate,
} from 'react-router-dom'
import Home from './Home/Home.jsx'
import Pricing from './Pricing/Pricing.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'
import Settings from './Settings/Settings.jsx'
import Login from './Login/Login.jsx'

import logo from './logo.svg'
import './App.css'
import { useAuth } from './AuthProvider.jsx'
import RequireAuth from './RequireAuth.jsx'

function Nav() {
  const { authed, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/pricing'>Pricing</Link>
        </li>
      </ul>
      {authed && (
        <button onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/dashboard' element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
        />
        <Route path='/settings' element={
          <RequireAuth>
            <Settings />
          </RequireAuth>
        }
        />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
