import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Brands from '../components/Brands';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';

export default function Home() {
  const handleBookClick = () => {
    window.location.hash = '#/services';
    // Small timeout to allow page change before scrolling
    setTimeout(() => {
      const el = document.getElementById('booking-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleQuoteClick = () => {
    window.location.hash = '#/products';
    // Small timeout to allow page change before scrolling
    setTimeout(() => {
      const el = document.getElementById('quote-calculator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="animate-fade-in">
      <Hero 
        onBookClick={handleBookClick} 
        onQuoteClick={handleQuoteClick} 
      />
      <About />
      <Brands />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}
