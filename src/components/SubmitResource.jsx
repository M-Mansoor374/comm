import { useState } from 'react'
import { motion } from 'framer-motion'
import './SubmitResource.css'

const SubmitResource = () => {
  const [formData, setFormData] = useState({
    resourceName: '',
    category: '',
    organizationName: '',
    location: '',
    contact: '',
    description: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const isFormValid = () => {
    return (
      formData.resourceName.trim() !== '' &&
      formData.category !== '' &&
      formData.organizationName.trim() !== '' &&
      formData.location.trim() !== '' &&
      formData.contact.trim() !== '' &&
      formData.description.trim() !== ''
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!isFormValid()) {
      return
    }

    console.log('Form submitted:', formData)
    
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        resourceName: '',
        category: '',
        organizationName: '',
        location: '',
        contact: '',
        description: '',
      })
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <div className="submit-resource-page">
      <div className="submit-resource-container">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="submit-header"
        >
          <h1 className="submit-title">Submit a Community Resource</h1>
          <p className="submit-subtitle">
            Help build our community by sharing local resources, services, and programs that can benefit your neighbors
          </p>
        </motion.div>

        {/* Success Message */}
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="success-message"
          >
            <div className="success-icon">✓</div>
            <p>Resource submitted successfully!</p>
          </motion.div>
        )}

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="form-card"
        >
          <form onSubmit={handleSubmit} className="resource-form">
            {/* Resource Name */}
            <div className="form-group">
              <label htmlFor="resourceName" className="form-label">
                Resource Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="resourceName"
                name="resourceName"
                value={formData.resourceName}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., Community Health Center"
                required
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category <span className="required">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select a category</option>
                <option value="Health Services">Health Services</option>
                <option value="Education">Education</option>
                <option value="Food Assistance">Food Assistance</option>
                <option value="Housing Support">Housing Support</option>
                <option value="Community Programs">Community Programs</option>
              </select>
            </div>

            {/* Organization Name */}
            <div className="form-group">
              <label htmlFor="organizationName" className="form-label">
                Organization / Provider Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., Community Health Foundation"
                required
              />
            </div>

            {/* Location */}
            <div className="form-group">
              <label htmlFor="location" className="form-label">
                Location <span className="required">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 123 Main Street, Downtown"
                required
              />
            </div>

            {/* Contact Information */}
            <div className="form-group">
              <label htmlFor="contact" className="form-label">
                Contact Information <span className="required">*</span>
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="form-input"
                placeholder="Email or phone number"
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description <span className="required">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Provide a detailed description of the resource, services offered, and how community members can benefit..."
                rows="6"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`submit-button ${!isFormValid() ? 'disabled' : ''}`}
            >
              Submit Resource
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default SubmitResource

