import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    // Check if already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    if (isLoggedIn) {
      navigate('/dashboard')
    }
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const isFormValid = () => {
    return formData.email.trim() !== '' && formData.password.trim() !== ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!isFormValid()) {
      return
    }

    // Simulate login
    console.log('Login attempt:', { email: formData.email })
    
    // Set login state in localStorage
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userEmail', formData.email)
    
    // Dispatch custom event to update navbar
    window.dispatchEvent(new Event('loginStateChange'))
    
    // Navigate to dashboard
    navigate('/dashboard')
    
    // Force page reload to update navbar state
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="login-header"
        >
          <h1 className="login-title">Login</h1>
          <p className="login-subtitle">
            Login to save resources and access your dashboard.
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="login-card"
        >
          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="your.email@example.com"
                required
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`login-button ${!isFormValid() ? 'disabled' : ''}`}
            >
              Login
            </button>
          </form>

          {/* Helper Text */}
          <p className="helper-text">
            You can browse resources without logging in.
          </p>

          {/* Continue as Guest Link */}
          <Link to="/resources" className="guest-link">
            Continue as Guest
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Login

