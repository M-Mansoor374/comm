# Frontend - Community Resource Hub

A modern, premium 3D Navbar component built with React, Vite, and Tailwind CSS.

## Features

- ✨ Glassmorphism design with backdrop blur
- 🎨 3D depth effects with smooth shadows
- 🎯 Smooth hover animations and micro-interactions
- 📱 Fully responsive (desktop first, mobile supported)
- ♿ Accessibility features (keyboard navigation, ARIA labels)
- 🔄 React Router integration
- 🎭 Sticky navbar with scroll behavior

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router DOM

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── Navbar.jsx      # Main navbar component
│   ├── App.jsx              # Main app component with routes
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind CSS imports
├── index.html               # HTML template
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Usage

The Navbar component accepts an `isLoggedIn` prop to toggle between logged-in and logged-out states:

```jsx
import Navbar from './components/Navbar';

// Logged out state
<Navbar isLoggedIn={false} />

// Logged in state
<Navbar isLoggedIn={true} />
```

## Routes

- `/` - Home
- `/resources` - Resources
- `/submit-resource` - Submit Resource
- `/login` - Login
- `/dashboard` - Dashboard (requires login)

