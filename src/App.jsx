import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import Resources from './components/Resources'
import ResourceDetail from './components/ResourceDetail'
import SubmitResource from './components/SubmitResource'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check localStorage for login state
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(loggedIn)

    // Listen for storage changes (for when login happens in another tab)
    const handleStorageChange = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
      setIsLoggedIn(loggedIn)
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Also listen for custom event from Login component
    window.addEventListener('loginStateChange', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('loginStateChange', handleStorageChange)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} />
      
      <main className="pt-24 flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:id" element={<ResourceDetail />} />
          <Route path="/submit-resource" element={<SubmitResource />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </main>
      
      <Footer />
    </div>
  )
}

export default App

