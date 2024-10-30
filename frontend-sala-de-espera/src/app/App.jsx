import { useState } from 'react'
import Navbar from '../common/navbar/Navbar'
import { BrowserRouter as Router } from 'react-router-dom'
import Routing from '../routes/Routing'
import AuthProvider from '../contexts/auth/AuthProvider'
import SocketProvider from '../contexts/sockets/SocketProvider'

function App() {

  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <Navbar />
          <Routing />
      </SocketProvider>
      </AuthProvider>
    </Router>
  )
}

export default App;
