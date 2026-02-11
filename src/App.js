import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GuidesPage from './pages/GuidesPage';
import RecommendationsPage from './pages/RecommendationsPage';
import CollabsPage from './pages/CollabsPage';
import ContactPage from './pages/ContactPage';
import './styles/global.css';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div style={{ minHeight: '100vh' }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/collabs" element={<CollabsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;