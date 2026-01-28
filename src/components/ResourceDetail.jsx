import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import './ResourceDetail.css'

const ResourceDetail = () => {
  const { id } = useParams()
  const [isFavorite, setIsFavorite] = useState(false)

  // Dummy resource data (in real app, fetch by ID)
  const resourceData = {
    1: {
      title: 'Community Health Center',
      category: 'Health Services',
      shortDescription: 'Free health screenings, vaccinations, and wellness programs for all community members.',
      fullDescription: 'Our Community Health Center provides comprehensive healthcare services to all residents regardless of their ability to pay. We offer free health screenings including blood pressure, cholesterol, and diabetes testing. Our vaccination clinic provides routine immunizations for children and adults, as well as seasonal flu shots. We also host monthly wellness workshops covering topics such as nutrition, exercise, and mental health awareness. Our team of licensed healthcare professionals is dedicated to improving the health and well-being of our community.',
      location: '123 Main Street, Downtown',
      contact: {
        phone: '(555) 123-4567',
        email: 'info@communityhealth.org',
      },
      organizationType: 'Non-Profit Organization',
    },
    2: {
      title: 'Adult Education Program',
      category: 'Education',
      shortDescription: 'Free GED preparation, ESL classes, and job training workshops available year-round.',
      fullDescription: 'The Adult Education Program offers free educational opportunities to help adults achieve their academic and career goals. Our GED preparation classes cover all subject areas with flexible scheduling to accommodate working adults. ESL (English as a Second Language) classes are available at multiple levels, from beginner to advanced, helping non-native speakers improve their language skills. We also provide job training workshops covering resume writing, interview skills, computer literacy, and career planning. All programs are free and open to the community.',
      location: '456 Education Ave, North District',
      contact: {
        phone: '(555) 234-5678',
        email: 'education@communitycenter.org',
      },
      organizationType: 'Community Center',
    },
    3: {
      title: 'Food Assistance Network',
      category: 'Food Assistance',
      shortDescription: 'Weekly food distribution and emergency meal assistance for families in need.',
      fullDescription: 'The Food Assistance Network works to eliminate hunger in our community by providing nutritious food to individuals and families in need. We operate a weekly food distribution program every Saturday from 9 AM to 12 PM, offering fresh produce, canned goods, bread, and other essential food items. For emergency situations, we provide same-day food assistance. We also partner with local grocery stores and restaurants to rescue surplus food and distribute it to those in need. No documentation required - we serve anyone who needs assistance.',
      location: '789 Food Drive, East Side',
      contact: {
        phone: '(555) 345-6789',
        email: 'help@foodnetwork.org',
      },
      organizationType: 'Non-Profit Organization',
    },
    4: {
      title: 'Housing Support Services',
      category: 'Housing Support',
      shortDescription: 'Emergency shelter, rental assistance, and housing counseling services.',
      fullDescription: 'Housing Support Services provides comprehensive assistance to individuals and families facing housing challenges. We offer emergency shelter for those experiencing homelessness, with priority given to families with children. Our rental assistance program helps prevent evictions by providing temporary financial support. We also offer housing counseling services to help individuals find affordable housing, understand their rights as tenants, and navigate the housing application process. Our case managers work one-on-one with clients to develop personalized housing plans.',
      location: '321 Housing Blvd, West End',
      contact: {
        phone: '(555) 456-7890',
        email: 'housing@supportservices.org',
      },
      organizationType: 'Non-Profit Organization',
    },
    5: {
      title: 'Youth Mentorship Program',
      category: 'Community Programs',
      shortDescription: 'Mentoring and after-school programs for youth ages 12-18.',
      fullDescription: 'The Youth Mentorship Program connects young people with caring adult mentors who provide guidance, support, and encouragement. Our program serves youth ages 12-18, matching them with mentors based on shared interests and goals. We offer after-school programs including homework help, life skills workshops, and recreational activities. Our mentors help youth build confidence, set goals, and develop positive relationships. The program also includes college preparation workshops, career exploration, and leadership development opportunities.',
      location: '654 Youth Center, South Park',
      contact: {
        phone: '(555) 567-8901',
        email: 'youth@mentorship.org',
      },
      organizationType: 'Community Center',
    },
    6: {
      title: 'Senior Care Services',
      category: 'Health Services',
      shortDescription: 'Home care, meal delivery, and social activities for seniors.',
      fullDescription: 'Senior Care Services provides comprehensive support to help older adults maintain their independence and quality of life. We offer in-home care services including personal care assistance, medication reminders, and light housekeeping. Our meal delivery program provides nutritious meals to homebound seniors five days a week. We also host social activities and events at our community center, including exercise classes, game nights, and educational workshops. Transportation services are available for medical appointments and social outings.',
      location: '987 Senior Way, Central District',
      contact: {
        phone: '(555) 678-9012',
        email: 'seniors@care.org',
      },
      organizationType: 'Non-Profit Organization',
    },
    7: {
      title: 'Job Training Center',
      category: 'Education',
      shortDescription: 'Career counseling, resume building, and skills training programs.',
      fullDescription: 'The Job Training Center helps individuals develop the skills and knowledge needed to succeed in today\'s job market. We offer career counseling services to help individuals identify their strengths, explore career options, and set professional goals. Our resume building workshops teach participants how to create effective resumes and cover letters. We provide skills training in areas such as computer literacy, customer service, and workplace communication. We also host job fairs and networking events to connect job seekers with local employers.',
      location: '147 Career Path, Business District',
      contact: {
        phone: '(555) 789-0123',
        email: 'careers@jobtraining.org',
      },
      organizationType: 'Community Center',
    },
    8: {
      title: 'Emergency Food Pantry',
      category: 'Food Assistance',
      shortDescription: '24/7 emergency food assistance for families facing food insecurity.',
      fullDescription: 'The Emergency Food Pantry provides immediate food assistance to individuals and families in crisis. We operate 24/7 to ensure that no one in our community goes hungry. Our pantry offers a variety of non-perishable food items, fresh produce when available, and personal care items. We serve anyone in need, no questions asked. In addition to emergency food assistance, we also provide information about other community resources and programs that can help address long-term food security needs.',
      location: '258 Help Lane, Community Center',
      contact: {
        phone: '(555) 890-1234',
        email: 'emergency@foodpantry.org',
      },
      organizationType: 'Non-Profit Organization',
    },
    9: {
      title: 'Legal Aid Clinic',
      category: 'Community Programs',
      shortDescription: 'Free legal consultation and assistance for low-income residents.',
      fullDescription: 'The Legal Aid Clinic provides free legal services to low-income individuals and families who cannot afford private attorneys. Our team of volunteer attorneys and legal professionals offers consultations on a wide range of legal issues including housing, family law, employment, and consumer rights. We help clients understand their legal rights and options, prepare legal documents, and provide representation in court when necessary. We also offer legal education workshops on topics such as tenant rights, employment law, and immigration.',
      location: '369 Justice St, Civic Center',
      contact: {
        phone: '(555) 901-2345',
        email: 'legal@aidclinic.org',
      },
      organizationType: 'Non-Profit Organization',
    },
  }

  const resource = resourceData[id] || resourceData[1]

  return (
    <div className="resource-detail-page">
      <div className="resource-detail-container">
        {/* Top Section */}
        <div className="detail-top-section">
          <Link to="/resources" className="back-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Resources
          </Link>

          <div className="detail-header">
            <span className="detail-category-badge">{resource.category}</span>
            <h1 className="detail-title">{resource.title}</h1>
            <p className="detail-short-description">{resource.shortDescription}</p>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="detail-main-content">
          <div className="detail-description-card">
            <h2 className="section-title">About This Resource</h2>
            <p className="detail-full-description">{resource.fullDescription}</p>
          </div>

          <div className="info-cards-grid">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3 className="info-title">Location</h3>
              <p className="info-text">{resource.location}</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3 className="info-title">Contact</h3>
              <p className="info-text">{resource.contact.phone}</p>
              <p className="info-text">{resource.contact.email}</p>
            </div>

            <div className="info-card">
              <div className="info-icon">🏢</div>
              <h3 className="info-title">Organization Type</h3>
              <p className="info-text">{resource.organizationType}</p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <div className="map-card">
            <div className="map-icon">🗺️</div>
            <h3 className="map-title">Location on Map</h3>
            <p className="map-text">{resource.location}</p>
            <div className="map-placeholder">
              <div className="map-pin">📍</div>
              <p>Interactive map coming soon</p>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="actions-section">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`action-favorite-btn ${isFavorite ? 'active' : ''}`}
            aria-label="Save resource"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {isFavorite ? 'Saved' : 'Save Resource'}
          </button>

          <button className="action-map-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            View on Map
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResourceDetail

