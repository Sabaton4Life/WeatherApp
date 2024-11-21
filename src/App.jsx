import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage'
import LogIn from './pages/login/LogIn'
import Register from './pages/register/Register'


const App = () => {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<LogIn/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/Homepage' element={<Homepage/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App