import { Link } from 'react-router-dom'
import { useState } from 'react'

const ResourceCard = ({ resource }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="resource-card">
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        aria-label="Save resource"
      >
        <svg
          fill={isFavorite ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ color: isFavorite ? '#ec4899' : '#9ca3af' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      <div>
        <span className="category-badge">{resource.category}</span>
        <h3 className="card-title">{resource.title}</h3>
        <p className="card-description">{resource.description}</p>
        <p className="card-location">
          <span>📍</span>
          {resource.location}
        </p>
      </div>

      <div className="card-actions">
        <button className="action-btn btn-map">View on Map</button>
        <Link to={`/resources/${resource.id}`} className="action-btn btn-details">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default ResourceCard
