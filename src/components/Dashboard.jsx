import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Dashboard.css'

const Dashboard = () => {
  const [savedResources, setSavedResources] = useState([
    {
      id: 1,
      name: 'Community Health Center',
      category: 'Health Services',
      location: '123 Main Street, Downtown',
      icon: '🏥',
    },
    {
      id: 3,
      name: 'Food Assistance Network',
      category: 'Food Assistance',
      location: '789 Food Drive, East Side',
      icon: '🍎',
    },
    {
      id: 5,
      name: 'Youth Mentorship Program',
      category: 'Community Programs',
      location: '654 Youth Center, South Park',
      icon: '🤝',
    },
  ])

  const [submittedResources, setSubmittedResources] = useState([
    {
      id: 101,
      title: 'Local Library Reading Program',
      category: 'Education',
      status: 'Approved',
      date: '2024-02-15',
      views: 124,
    },
    {
      id: 102,
      title: 'Community Garden Initiative',
      category: 'Community Programs',
      status: 'Pending Review',
      date: '2024-03-01',
      views: 89,
    },
  ])

  const handleRemoveFavorite = (id) => {
    setSavedResources(savedResources.filter((resource) => resource.id !== id))
  }

  const handleDeleteSubmitted = (id) => {
    setSubmittedResources(submittedResources.filter((resource) => resource.id !== id))
  }

  const stats = {
    savedCount: savedResources.length,
    submittedCount: submittedResources.length,
    approvedCount: submittedResources.filter(r => r.status === 'Approved').length,
    totalViews: submittedResources.reduce((sum, r) => sum + (r.views || 0), 0),
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="dashboard-header"
        >
          <div className="header-content">
            <div>
              <h1 className="dashboard-title">Dashboard</h1>
              <p className="dashboard-subtitle">
                Manage your saved and submitted resources
              </p>
            </div>
            <div className="header-actions">
              <Link to="/resources" className="quick-action-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                Browse Resources
              </Link>
              <Link to="/submit-resource" className="quick-action-btn primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Submit New
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="stat-card"
          >
            <div className="stat-icon saved">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Saved Resources</p>
              <p className="stat-value">{stats.savedCount}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="stat-card"
          >
            <div className="stat-icon submitted">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Submitted</p>
              <p className="stat-value">{stats.submittedCount}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="stat-card"
          >
            <div className="stat-icon approved">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Approved</p>
              <p className="stat-value">{stats.approvedCount}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="stat-card"
          >
            <div className="stat-icon views">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Total Views</p>
              <p className="stat-value">{stats.totalViews}</p>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Layout */}
        <div className="dashboard-layout">
          {/* Section 1: Saved Resources */}
          <motion.section
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="dashboard-section"
          >
            <div className="section-header">
              <div>
                <h2 className="section-title">
                  <span className="section-icon">💚</span>
                  Saved Resources
                </h2>
                <p className="section-description">Your favorite community resources</p>
              </div>
            </div>

            {savedResources.length > 0 ? (
              <div className="saved-resources-grid">
                {savedResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="saved-resource-card"
                  >
                    <div className="card-icon-wrapper">
                      <div className="card-icon">{resource.icon}</div>
                    </div>
                    <div className="card-content">
                      <span className="resource-category-badge">{resource.category}</span>
                      <h3 className="resource-name">{resource.name}</h3>
                      <p className="resource-location">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {resource.location}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveFavorite(resource.id)}
                      className="remove-button"
                      aria-label="Remove from favorites"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="empty-state"
              >
                <div className="empty-icon-wrapper">
                  <div className="empty-icon">💚</div>
                </div>
                <h3 className="empty-title">No saved resources yet</h3>
                <p className="empty-text">Start exploring and save resources you find helpful</p>
                <Link to="/resources" className="empty-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  Browse Resources
                </Link>
              </motion.div>
            )}
          </motion.section>

          {/* Section 2: Submitted Resources */}
          <motion.section
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="dashboard-section"
          >
            <div className="section-header">
              <div>
                <h2 className="section-title">
                  <span className="section-icon">📝</span>
                  Your Submitted Resources
                </h2>
                <p className="section-description">Track your community contributions</p>
              </div>
            </div>

            {submittedResources.length > 0 ? (
              <div className="submitted-resources-list">
                {submittedResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    className="submitted-resource-item"
                  >
                    <div className="item-icon-wrapper">
                      <div className="item-icon">📄</div>
                    </div>
                    <div className="item-content">
                      <div className="item-header">
                        <h3 className="item-title">{resource.title}</h3>
                        <span className={`status-badge ${resource.status.toLowerCase().replace(' ', '-')}`}>
                          {resource.status === 'Approved' && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          )}
                          {resource.status}
                        </span>
                      </div>
                      <div className="item-details">
                        <span className="item-category">{resource.category}</span>
                        <span className="item-divider">•</span>
                        <span className="item-date">{resource.date}</span>
                        <span className="item-divider">•</span>
                        <span className="item-views">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          {resource.views} views
                        </span>
                      </div>
                    </div>
                    <div className="item-actions">
                      <button className="action-btn edit-btn" aria-label="Edit resource">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSubmitted(resource.id)}
                        className="action-btn delete-btn"
                        aria-label="Delete resource"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="empty-state"
              >
                <div className="empty-icon-wrapper">
                  <div className="empty-icon">📝</div>
                </div>
                <h3 className="empty-title">No submitted resources yet</h3>
                <p className="empty-text">Share valuable resources with your community</p>
                <Link to="/submit-resource" className="empty-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Submit a Resource
                </Link>
              </motion.div>
            )}
          </motion.section>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
