import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';

export default function Navbar({ activePage, onBookClick, onQuoteClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll position to apply solid glass background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#/', id: 'home' },
    { name: 'Products', href: '#/products', id: 'products' },
    { name: 'Services', href: '#/services', id: 'services' },
    { name: 'Gallery', href: '#/gallery', id: 'gallery' },
    { name: 'Contact', href: '#/contact', id: 'contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-dark-950/80 backdrop-blur-md border-white/5 py-4' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="#/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-dark-900 border border-white/10 flex items-center justify-center shadow-glow-orange group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <img src="/images/vvlp_logo.png" alt="VVLP Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-orbitron font-black tracking-widest text-white leading-none">
                VVLP
              </span>
              <span className="text-[8px] sm:text-[9px] text-accent-orange font-orbitron font-bold tracking-widest uppercase mt-1.5 whitespace-nowrap">
                TYRES & ALLOY WHEELS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-sans font-medium transition-colors duration-300 tracking-wide uppercase text-[12px] relative py-1 ${
                    isActive 
                      ? 'text-accent-orange font-bold' 
                      : 'text-gray-300 hover:text-accent-orange'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-orange"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={onQuoteClick}
              className="px-5 py-2.5 rounded-lg border border-white/10 hover:border-accent-orange/50 text-white font-orbitron text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-white/5"
            >
              Get Quote
            </button>
            <button 
              onClick={onBookClick}
              className="px-5 py-2.5 rounded-lg bg-gradient-orange-red text-white font-orbitron text-xs font-bold tracking-wider uppercase shadow-glow-orange hover:shadow-glow-red hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Book Service
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-accent-orange transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[73px] z-30 lg:hidden w-full h-[calc(100vh-73px)] bg-dark-950 bg-grid flex flex-col justify-between p-8 border-t border-white/5"
          >
            {/* Nav Menu */}
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link, idx) => {
                const isActive = activePage === link.id;
                return (
                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-lg font-orbitron font-semibold uppercase tracking-widest transition-colors ${
                      isActive ? 'text-accent-orange' : 'text-gray-300 hover:text-accent-orange'
                    }`}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
            </div>

            {/* Mobile CTAs */}
            <div className="flex flex-col gap-4 mt-auto">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onQuoteClick();
                }}
                className="w-full py-4 rounded-xl border border-white/10 text-white font-orbitron font-semibold text-sm tracking-wider uppercase bg-dark-900"
              >
                Get Quote
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full py-4 rounded-xl bg-gradient-orange-red text-white font-orbitron font-bold text-sm tracking-wider uppercase shadow-glow-orange"
              >
                Book Service
              </button>
              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-mono mt-4">
                <Shield size={12} className="text-accent-orange" />
                VVLP Certified Dealership
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
