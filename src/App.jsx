import React, { useState } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useHashRouter } from './components/Router';
import Chatbot from './components/Chatbot';

// Page Components
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { hash, page, navigate } = useHashRouter();

  const handleBookClick = () => {
    navigate('#/services');
    // Allow route shift before scrolling
    setTimeout(() => {
      const el = document.getElementById('booking-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleQuoteClick = () => {
    navigate('#/products');
    // Allow route shift before scrolling
    setTimeout(() => {
      const el = document.getElementById('quote-calculator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <>
      {/* Loader splash screen overlay */}
      <Loader onComplete={() => setIsLoading(false)} />

      {/* Main app body */}
      {!isLoading && (
        <div className="bg-dark-950 text-white min-h-screen flex flex-col justify-between">
          <div>
            {/* Header Navbar */}
            <Navbar 
              activePage={page}
              onBookClick={handleBookClick} 
              onQuoteClick={handleQuoteClick} 
            />

            {/* Dynamic Page Routing */}
            <main>
              {page === 'home' && <Home />}
              {page === 'products' && <ProductsPage />}
              {page === 'services' && <ServicesPage />}
              {page === 'gallery' && <GalleryPage />}
              {page === 'contact' && <ContactPage />}
            </main>
          </div>

          {/* Footer Branding block */}
          <Footer />

          {/* AI Chatbot Assistant Widget */}
          <Chatbot />
        </div>
      )}
    </>
  );
}
