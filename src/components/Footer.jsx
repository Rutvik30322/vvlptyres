import React, { useState } from 'react';
import { Mail, Shield, CheckCircle2, ChevronRight, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

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

        {/* Newsletter Subscription Block */}
        <div className="lg:col-span-4 space-y-6">
          <h4 className="text-xs font-orbitron font-bold text-white uppercase tracking-wider">
            Newsletter
          </h4>
          <p className="text-xs text-gray-500 font-sans leading-relaxed">
            Subscribe to our newsletter to receive notification updates on brand coupons, tyre care guides, and seasonal cashbacks.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2 relative">
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full px-4 py-3 rounded-l-lg form-input text-xs border-r-0"
                required
              />
              <button
                type="submit"
                className="px-4 rounded-r-lg bg-gradient-orange-red text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-glow-orange"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            
            {subscribed && (
              <div className="flex items-center gap-1.5 text-[10px] text-green-500 font-semibold absolute -bottom-5 left-0">
                <CheckCircle2 size={12} />
                Subscribed to diagnostics newsletter!
              </div>
            )}
          </form>
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
