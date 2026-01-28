import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ isLoggedIn = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/resources', label: 'Resources' },
    { path: '/submit-resource', label: 'Submit Resource' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-3 shadow-2xl' : 'py-4 shadow-lg'
      }`}
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        backgroundColor: '#4ade80',
        borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 text-2xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
            style={{
              textShadow: '0 2px 10px rgba(34, 197, 94, 0.3)',
            }}
          >
            Resource Hub
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-lg font-medium text-gray-700 transition-all duration-300 hover:text-green-600 ${
                  isActive(link.path)
                    ? 'text-green-600'
                    : 'hover:bg-white/50'
                }`}
                style={{
                  transform: 'translateY(0)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow =
                    '0 4px 12px rgba(34, 197, 94, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {link.label}
                {isActive(link.path) && (
                  <span
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"
                    style={{
                      animation: 'slideIn 0.3s ease-out',
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  localStorage.removeItem('isLoggedIn')
                  localStorage.removeItem('userEmail')
                  window.dispatchEvent(new Event('loginStateChange'))
                  window.location.href = '/'
                }}
                className="px-5 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{
                  transform: 'translateY(0)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 20px rgba(34, 197, 94, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow =
                    '0 4px 12px rgba(34, 197, 94, 0.3)';
                }}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{
                  transform: 'translateY(0)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 20px rgba(34, 197, 94, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow =
                    '0 4px 12px rgba(34, 197, 94, 0.3)';
                }}
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-white/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <span
                className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div
            className="py-4 space-y-2 rounded-xl backdrop-blur-xl bg-white/60 border border-white/20 shadow-xl"
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-green-600 bg-green-50/50'
                    : 'text-gray-700 hover:bg-white/50 hover:text-green-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-200/50">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    localStorage.removeItem('isLoggedIn')
                    localStorage.removeItem('userEmail')
                    window.dispatchEvent(new Event('loginStateChange'))
                    window.location.href = '/'
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg text-center"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 2rem;
            opacity: 1;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;

