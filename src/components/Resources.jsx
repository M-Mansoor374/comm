import { useState } from 'react'
import ResourceCard from './ResourceCard'
import './Resources.css'

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Dummy resource data
  const allResources = [
    {
      id: 1,
      title: 'Community Health Center',
      category: 'Health Services',
      description: 'Free health screenings, vaccinations, and wellness programs for all community members.',
      location: '123 Main Street, Downtown',
    },
    {
      id: 2,
      title: 'Adult Education Program',
      category: 'Education',
      description: 'Free GED preparation, ESL classes, and job training workshops available year-round.',
      location: '456 Education Ave, North District',
    },
    {
      id: 3,
      title: 'Food Assistance Network',
      category: 'Food Assistance',
      description: 'Weekly food distribution and emergency meal assistance for families in need.',
      location: '789 Food Drive, East Side',
    },
    {
      id: 4,
      title: 'Housing Support Services',
      category: 'Housing Support',
      description: 'Emergency shelter, rental assistance, and housing counseling services.',
      location: '321 Housing Blvd, West End',
    },
    {
      id: 5,
      title: 'Youth Mentorship Program',
      category: 'Community Programs',
      description: 'Mentoring and after-school programs for youth ages 12-18.',
      location: '654 Youth Center, South Park',
    },
    {
      id: 6,
      title: 'Senior Care Services',
      category: 'Health Services',
      description: 'Home care, meal delivery, and social activities for seniors.',
      location: '987 Senior Way, Central District',
    },
    {
      id: 7,
      title: 'Job Training Center',
      category: 'Education',
      description: 'Career counseling, resume building, and skills training programs.',
      location: '147 Career Path, Business District',
    },
    {
      id: 8,
      title: 'Emergency Food Pantry',
      category: 'Food Assistance',
      description: '24/7 emergency food assistance for families facing food insecurity.',
      location: '258 Help Lane, Community Center',
    },
    {
      id: 9,
      title: 'Legal Aid Clinic',
      category: 'Community Programs',
      description: 'Free legal consultation and assistance for low-income residents.',
      location: '369 Justice St, Civic Center',
    },
  ]

  const categories = ['All', 'Health Services', 'Education', 'Food Assistance', 'Housing Support', 'Community Programs']

  // Filter resources
  const filteredResources = allResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="resources-page">
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Page Header */}
        <div className="resources-header">
          <h1 className="resources-title">Community Resources</h1>
          <p className="resources-subtitle">
            Discover local resources, services, and programs available in your community
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="search-filter-container">
          <div className="search-filter-row">
            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="Search resources by name, description, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-select"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="results-count">
            Showing {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Resource Grid */}
        {filteredResources.length > 0 ? (
          <div className="resources-grid">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No resources found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Resources
