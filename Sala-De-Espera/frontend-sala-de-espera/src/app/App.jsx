import { useState } from 'react'
import Navbar from '../common/navbar/Navbar'
import { BrowserRouter as Router } from 'react-router-dom'
import Routing from '../routes/Routing'
import AuthProvider from '../contexts/auth/AuthProvider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <AuthProvider>
      <Navbar />
      <Routing />
      </AuthProvider>
    </Router>
  )
}

export default App;
