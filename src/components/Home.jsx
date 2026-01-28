import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import videoBackground from '../assests/mixkit-flying-over-a-relaxing-creek-full-of-rock-on-the-51585-hd-ready.mp4'
import './Home.css'

// Reusable TiltCard Component with 3D Tilt Hover Effect
const TiltCard = ({ children, className = '', style = {}, ...props }) => {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const isMobileRef = useRef(false)
  const rafId = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 768
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [])

  const updateTransform = (rotateX, rotateY, scale = 1.03) => {
    if (!cardRef.current) return
    
    const transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
    cardRef.current.style.transform = transform
  }

  const handleMouseMove = (e) => {
    if (isMobileRef.current || !cardRef.current) return

    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
    }

    rafId.current = requestAnimationFrame(() => {
      const card = cardRef.current
      if (!card) return

      const rect = card.getBoundingClientRect()
      const cardWidth = rect.width
      const cardHeight = rect.height
      
      // Calculate mouse position relative to card center
      const mouseX = e.clientX - rect.left - cardWidth / 2
      const mouseY = e.clientY - rect.top - cardHeight / 2
      
      // Calculate rotation (max 12 degrees for subtle effect)
      const rotateX = (mouseY / (cardHeight / 2)) * -12
      const rotateY = (mouseX / (cardWidth / 2)) * 12
      
      updateTransform(rotateX, rotateY, 1.03)
      card.style.transition = 'transform 0.1s ease-out'
    })
  }

  const handleMouseEnter = () => {
    if (!isMobileRef.current) {
      setIsHovered(true)
      if (cardRef.current) {
        cardRef.current.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease-out'
      }
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (cardRef.current) {
      updateTransform(0, 0, 1)
      cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease-out'
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        boxShadow: isHovered
          ? '0 20px 40px rgba(0, 0, 0, 0.12), 0 0 15px rgba(34, 197, 94, 0.08)'
          : undefined,
        transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease-out',
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Category Card Component with 3D Tilt Effect
const CategoryCard = ({ category, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])
  
  const handleMouseMove = (e) => {
    if (!isHovered) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      className="p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-md hover:shadow-2xl cursor-pointer"
    >
      <motion.div
        style={{
          transform: 'translateZ(20px)',
        }}
        className={`text-4xl mb-3 bg-gradient-to-br ${category.color} bg-clip-text text-transparent`}
      >
        {category.icon}
      </motion.div>
      <motion.h3
        style={{
          transform: 'translateZ(10px)',
        }}
        className="font-semibold text-gray-800 text-sm md:text-base"
      >
        {category.name}
      </motion.h3>
    </motion.div>
  )
}

const Home = () => {
  // Dummy data for featured resources
  const featuredResources = [
    {
      id: 1,
      name: 'Community Health Center',
      description: 'Free health screenings, vaccinations, and wellness programs for all community members.',
      category: 'Health Services',
      icon: '🏥',
    },
    {
      id: 2,
      name: 'Adult Education Program',
      description: 'Free GED preparation, ESL classes, and job training workshops available year-round.',
      category: 'Education',
      icon: '📚',
    },
    {
      id: 3,
      name: 'Food Assistance Network',
      description: 'Weekly food distribution and emergency meal assistance for families in need.',
      category: 'Food Assistance',
      icon: '🍎',
    },
  ]

  // Dummy data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Community Health Fair',
      date: 'March 15, 2024',
      time: '10:00 AM - 2:00 PM',
      location: 'Community Center',
    },
    {
      id: 2,
      title: 'Housing Assistance Workshop',
      date: 'March 22, 2024',
      time: '6:00 PM - 8:00 PM',
      location: 'City Hall',
    },
    {
      id: 3,
      title: 'Job Fair & Career Expo',
      date: 'April 5, 2024',
      time: '9:00 AM - 4:00 PM',
      location: 'Convention Center',
    },
  ]

  // Category previews
  // 3D Realistic Icons for Categories
  const CategoryIcon = ({ category }) => {
    const icons = {
      'Health Services': (
        <svg viewBox="0 0 100 100" className="category-3d-icon health-icon">
          <defs>
            <linearGradient id="healthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="50%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <filter id="healthShadow">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#4ade80" floodOpacity="0.4" />
            </filter>
          </defs>
          {/* Hospital Building - 3D Perspective */}
          <rect x="25" y="30" width="50" height="50" fill="url(#healthGrad)" filter="url(#healthShadow)" rx="4" />
          <rect x="30" y="35" width="40" height="40" fill="#34d399" opacity="0.8" rx="2" />
          {/* Cross */}
          <rect x="45" y="40" width="10" height="30" fill="#fff" rx="2" />
          <rect x="40" y="50" width="20" height="10" fill="#fff" rx="2" />
          {/* Windows */}
          <rect x="35" y="45" width="8" height="8" fill="#fff" opacity="0.6" rx="1" />
          <rect x="57" y="45" width="8" height="8" fill="#fff" opacity="0.6" rx="1" />
          <rect x="35" y="60" width="8" height="8" fill="#fff" opacity="0.6" rx="1" />
          <rect x="57" y="60" width="8" height="8" fill="#fff" opacity="0.6" rx="1" />
        </svg>
      ),
      'Education': (
        <svg viewBox="0 0 100 100" className="category-3d-icon education-icon">
          <defs>
            <linearGradient id="eduGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <filter id="eduShadow">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#22c55e" floodOpacity="0.4" />
            </filter>
          </defs>
          {/* Stacked Books - 3D */}
          <rect x="20" y="50" width="25" height="8" fill="url(#eduGrad)" filter="url(#eduShadow)" rx="2" transform="skewY(-5)" />
          <rect x="25" y="45" width="25" height="8" fill="#34d399" filter="url(#eduShadow)" rx="2" transform="skewY(-5)" />
          <rect x="30" y="40" width="25" height="8" fill="#4ade80" filter="url(#eduShadow)" rx="2" transform="skewY(-5)" />
          {/* Book Pages Lines */}
          <line x1="30" y1="44" x2="45" y2="42" stroke="#fff" strokeWidth="1" opacity="0.6" />
          <line x1="30" y1="49" x2="45" y2="47" stroke="#fff" strokeWidth="1" opacity="0.6" />
          <line x1="30" y1="54" x2="45" y2="52" stroke="#fff" strokeWidth="1" opacity="0.6" />
        </svg>
      ),
      'Housing Support': (
        <svg viewBox="0 0 100 100" className="category-3d-icon housing-icon">
          <defs>
            <linearGradient id="houseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <filter id="houseShadow">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#34d399" floodOpacity="0.4" />
            </filter>
          </defs>
          {/* House Roof - 3D Triangle */}
          <polygon points="50,20 20,50 80,50" fill="url(#houseGrad)" filter="url(#houseShadow)" />
          <polygon points="50,20 25,50 75,50" fill="#4ade80" opacity="0.7" />
          {/* House Body */}
          <rect x="30" y="50" width="40" height="30" fill="url(#houseGrad)" filter="url(#houseShadow)" rx="2" />
          <rect x="35" y="55" width="30" height="25" fill="#34d399" opacity="0.8" rx="1" />
          {/* Door */}
          <rect x="42" y="60" width="16" height="20" fill="#059669" rx="2" />
          <circle cx="55" cy="70" r="1.5" fill="#fff" />
          {/* Windows */}
          <rect x="37" y="57" width="6" height="6" fill="#fff" opacity="0.7" rx="1" />
          <rect x="57" y="57" width="6" height="6" fill="#fff" opacity="0.7" rx="1" />
        </svg>
      ),
      'Food Assistance': (
        <svg viewBox="0 0 100 100" className="category-3d-icon food-icon">
          <defs>
            <linearGradient id="foodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="50%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <filter id="foodShadow">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#4ade80" floodOpacity="0.4" />
            </filter>
          </defs>
          {/* Apple - 3D */}
          <ellipse cx="50" cy="50" rx="20" ry="25" fill="url(#foodGrad)" filter="url(#foodShadow)" />
          <ellipse cx="50" cy="50" rx="18" ry="23" fill="#34d399" opacity="0.8" />
          {/* Apple Highlight */}
          <ellipse cx="45" cy="45" rx="8" ry="10" fill="#fff" opacity="0.3" />
          {/* Apple Stem */}
          <rect x="48" y="28" width="4" height="8" fill="#059669" rx="2" />
          {/* Apple Leaf */}
          <ellipse cx="55" cy="30" rx="6" ry="8" fill="#22c55e" transform="rotate(-30 55 30)" />
          <ellipse cx="55" cy="30" rx="4" ry="6" fill="#34d399" opacity="0.7" transform="rotate(-30 55 30)" />
        </svg>
      ),
      'Community Programs': (
        <svg viewBox="0 0 100 100" className="category-3d-icon community-icon">
          <defs>
            <linearGradient id="commGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <filter id="commShadow">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#10b981" floodOpacity="0.4" />
            </filter>
          </defs>
          {/* Connected Hands/People - 3D */}
          <circle cx="30" cy="50" r="12" fill="url(#commGrad)" filter="url(#commShadow)" />
          <circle cx="30" cy="50" r="10" fill="#4ade80" opacity="0.8" />
          <circle cx="50" cy="50" r="12" fill="url(#commGrad)" filter="url(#commShadow)" />
          <circle cx="50" cy="50" r="10" fill="#34d399" opacity="0.8" />
          <circle cx="70" cy="50" r="12" fill="url(#commGrad)" filter="url(#commShadow)" />
          <circle cx="70" cy="50" r="10" fill="#22c55e" opacity="0.8" />
          {/* Connection Lines */}
          <line x1="38" y1="50" x2="42" y2="50" stroke="#fff" strokeWidth="3" opacity="0.8" />
          <line x1="58" y1="50" x2="62" y2="50" stroke="#fff" strokeWidth="3" opacity="0.8" />
          {/* Heart Symbol */}
          <path d="M50,60 C45,55 40,50 40,45 C40,42 42,40 45,40 C46,40 47,40.5 48,41.5 C49,40.5 50,40 51,40 C54,40 56,42 56,45 C56,50 51,55 50,60 Z" fill="#fff" opacity="0.9" />
        </svg>
      ),
    }
    return icons[category] || null
  }

  const categories = [
    { name: 'Health Services', color: 'from-green-400 to-emerald-500' },
    { name: 'Education', color: 'from-green-500 to-teal-500' },
    { name: 'Housing Support', color: 'from-emerald-500 to-green-600' },
    { name: 'Food Assistance', color: 'from-green-400 to-lime-500' },
    { name: 'Community Programs', color: 'from-teal-500 to-green-500' },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          style={{
            minHeight: '100%',
            minWidth: '100%',
          }}
        >
          <source src={videoBackground} type="video/mp4" />
        </video>
        
        {/* Overlay for better text readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-10"></div>
        
        <div className="max-w-7xl mx-auto relative z-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              style={{
                textShadow: '0 4px 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(99, 102, 241, 0.4)',
              }}
            >
              Connecting Our Community to
              <br />
              Local Resources & Support
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
            >
              Discover local non-profits, support services, programs, and community events
              that help you and your neighbors thrive. Find the help you need, when you need it.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/resources"
                className="px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                style={{
                  boxShadow: '0 4px 20px rgba(74, 222, 128, 0.4)',
                }}
              >
                Search Community Resources
              </Link>
              <Link
                to="/submit-resource"
                className="px-8 py-4 rounded-xl font-semibold text-gray-900 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-white/30"
                style={{
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
              >
                Submit a Resource
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Resource Hub Preview */}
      <section className="resource-hub-section py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="section-heading text-4xl md:text-5xl font-bold mb-4">
                Explore Our Resource Hub
              </h2>
              <p className="section-description text-xl max-w-2xl mx-auto">
                Search, filter, and discover community resources by category. Find exactly what
                you need with our interactive directory.
              </p>
            </motion.div>

            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10"
              style={{ perspective: '1000px' }}
            >
              {categories.map((category, index) => (
                <div key={category.name} className="category-card-wrapper">
                  <div className="category-card">
                    <div className="category-icon-container">
                      <CategoryIcon category={category.name} />
                    </div>
                    <h3 className="category-name">{category.name}</h3>
                  </div>
                </div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="text-center">
              <Link
                to="/resources"
                className="inline-block px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-green-400/30"
                style={{
                  boxShadow: '0 4px 20px rgba(74, 222, 128, 0.4)',
                }}
              >
                View Full Resource Directory →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Community Resources */}
      <section className="featured-resources-section py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="section-heading text-4xl md:text-5xl font-bold mb-12 text-center"
            >
              Featured Community Resources
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: '1000px' }}>
              {featuredResources.map((resource, index) => (
                <div key={resource.id} className="featured-resource-card">
                  <span className="resource-icon-large">{resource.icon}</span>
                  <div className="mb-2">
                    <span className="category-badge-green">
                      {resource.category}
                    </span>
                  </div>
                  <h3 className="resource-title">
                    {resource.name}
                  </h3>
                  <p className="resource-description">
                    {resource.description}
                  </p>
                  <button className="view-details-btn">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Community Events */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center"
            >
              Upcoming Community Events
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
              {upcomingEvents.map((event, index) => (
                <div key={event.id} className="event-card">
                  <h3 className="event-title">
                    {event.title}
                  </h3>
                  <div className="event-details">
                    <p className="event-detail">
                      <span className="event-detail-icon">📅</span>
                      {event.date}
                    </p>
                    <p className="event-detail">
                      <span className="event-detail-icon">🕐</span>
                      {event.time}
                    </p>
                    <p className="event-detail">
                      <span className="event-detail-icon">📍</span>
                      {event.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Participation CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="text-center p-12 rounded-3xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 shadow-2xl"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Help Build Our Community Resource Hub
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Your knowledge makes our community stronger. Share local resources, programs,
              and services that can help your neighbors. Together, we create a more connected
              and supportive community.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                to="/submit-resource"
                className="inline-block px-10 py-5 rounded-xl font-bold text-green-600 bg-white hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
                style={{
                  boxShadow: '0 8px 30px rgba(255, 255, 255, 0.3)',
                }}
              >
                Submit a New Resource
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home

