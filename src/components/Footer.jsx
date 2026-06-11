import React, { useState } from 'react';
import { Mail, Shield, CheckCircle2, ChevronRight, Phone, MapPin } from 'lucide-react';

export default function Footer() {

  return (
    <footer className="bg-dark-950 border-t border-white/5 pt-20 pb-10 relative overflow-hidden select-none">
      
      {/* Background glow flares */}
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-accent-orange/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
        
        {/* Brand Block */}
        <div className="lg:col-span-5 space-y-6">
          <a href="#/" className="flex items-center gap-2 group w-max">
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
          
          <div className="space-y-3 font-sans text-xs text-gray-500">
            <p className="leading-relaxed">
              Authorized multi-brand dealer and precision 3D alignment station located at Vadodara, Gujarat.
            </p>
            
            <div className="space-y-2 pt-2 border-t border-white/5 text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-accent-orange" />
                <span>4, Kunjal Apartment, Opp. Ozone Bldg, Genda Circle, Vadodara</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={12} className="text-accent-orange" />
                <span>+91 92653 44385 (Main Line)</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={12} className="text-accent-orange" />
                <span>GSTIN: 24AEUPP9822K1ZP</span>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 pt-2">
            {[
              { icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>, href: "https://facebook.com" },
              { icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>, href: "https://twitter.com" },
              { icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, href: "https://instagram.com" }
            ].map((soc, index) => (
              <a
                key={index}
                href={soc.href}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-white/5 bg-dark-900 flex items-center justify-center text-gray-400 hover:text-accent-orange hover:border-accent-orange/40 transition-colors duration-300"
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-3 space-y-6">
          <h4 className="text-xs font-orbitron font-bold text-white uppercase tracking-wider">
            Quick Navigation
          </h4>
          <ul className="space-y-3 text-xs sm:text-sm font-sans">
            {[
              { name: 'Home Landing', href: '#/' },
              { name: 'Tyre & Alloy Catalog', href: '#/products' },
              { name: 'Laser Services', href: '#/services' },
              { name: 'Workshop Gallery', href: '#/gallery' },
              { name: 'Get In Touch', href: '#/contact' }
            ].map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-gray-500 hover:text-white transition-colors duration-200 block">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* WhatsApp Helpdesk Block */}
        <div className="lg:col-span-4 space-y-6">
          <h4 className="text-xs font-orbitron font-bold text-white uppercase tracking-wider">
            WhatsApp Helpdesk
          </h4>
          <p className="text-xs text-gray-500 font-sans leading-relaxed">
            Chat directly with our service coordinators for instant tyre stock checks, custom pricing, or roadside alignment bookings.
          </p>

          <a
            href="https://wa.me/919265344385?text=Hello%20VVLP%20Tyres,%20I'm%20contacting%20you%20from%20the%20website%20footer.%20Please%20assist."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-orbitron font-bold text-xs tracking-wider uppercase shadow-glow-green transition-all duration-300 w-full justify-center group"
          >
            {/* WhatsApp Icon */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 448 512" 
              fill="currentColor" 
              className="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
            >
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>
            <span>Start Live Chat</span>
          </a>
        </div>

      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto px-6 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] sm:text-xs text-gray-600 font-sans">
        <p>© {new Date().getFullYear()} VVLP Tyres & Alloy Wheels. All rights reserved.</p>
        
        <div className="flex items-center gap-2">
          <Shield size={12} className="text-accent-orange" />
          <span>Authorized Dealer of Premium Automotive Brands</span>
        </div>

        <div className="flex gap-4">
          <a href="#/" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#/" className="hover:text-gray-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
