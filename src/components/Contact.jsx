import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'general',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000); // clear success state after 5s
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'general',
        message: ''
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-dark-900 bg-grid relative overflow-hidden">
      
      {/* Background glow flares */}
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-accent-orange/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-accent-red/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-orbitron font-bold tracking-widest text-accent-orange uppercase mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-black text-white uppercase tracking-wide">
            contact <span className="text-transparent bg-clip-text bg-gradient-orange-red text-glow-orange">vvlp team</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-orange-red rounded-full mt-4 mb-6" />
          <p className="text-gray-400 font-sans text-sm sm:text-base max-w-xl">
            Have questions about tyre sizes, models, or service availability? Reach out and our support crew will handle the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info & Map */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Details Cards Container */}
            <div className="glass-card rounded-2xl p-8 border border-white/5 space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-accent-orange">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-orbitron font-bold text-gray-400 uppercase tracking-widest">Support Line</h4>
                  <a href="tel:+919265344385" className="text-base font-orbitron font-semibold text-white hover:text-accent-orange transition-colors mt-1 block">
                    +91 92653 44385
                  </a>
                  <a href="tel:+919825091074" className="text-base font-orbitron font-semibold text-white hover:text-accent-orange transition-colors mt-1 block">
                    +91 98250 91074
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-accent-orange">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-orbitron font-bold text-gray-400 uppercase tracking-widest">Email Support</h4>
                  <a href="mailto:Vinodpunjabi017@gmail.com" className="text-sm font-orbitron font-semibold text-white hover:text-accent-orange transition-colors mt-1 block">
                    Vinodpunjabi017@gmail.com
                  </a>
                  <p className="text-[10px] text-gray-500 font-sans mt-0.5">Response within 3 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-accent-orange">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-orbitron font-bold text-gray-400 uppercase tracking-widest">Vadodara Center</h4>
                  <p className="text-sm font-sans text-white mt-1 leading-relaxed">
                    4, Kunjal Apartment,<br />
                    Opp. Ozone Building, Vadiwadi Genda Circle,<br />
                    Vadodara, Gujarat - 390007
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-accent-orange">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-orbitron font-bold text-gray-400 uppercase tracking-widest">Working Hours</h4>
                  <p className="text-sm font-sans text-white mt-1">
                    Monday - Saturday: 10:00 AM - 07:30 PM<br />
                    Sunday: 10:00 AM - 02:00 PM
                  </p>
                </div>
              </div>

            </div>

            {/* Styled Futuristic Interactive Map Mockup */}
            <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/5 relative bg-dark-950 flex flex-col items-center justify-center p-6 shadow-glass group">
              {/* Fake GPS grid background */}
              <div className="absolute inset-0 bg-grid opacity-25 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-radial-gradient opacity-60" />
              
              {/* Stylized map markers */}
              <div className="absolute top-1/3 left-1/2 w-4 h-4 rounded-full bg-accent-orange animate-ping" />
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent-orange border-2 border-white shadow-glow-orange relative z-10" />
              
              {/* Visual dashboard labels */}
              <div className="relative z-10 text-center select-none">
                <span className="text-[10px] font-orbitron font-bold text-accent-orange uppercase tracking-widest mb-1.5 block">
                  Interactive Radar
                </span>
                <h4 className="text-white font-orbitron font-black uppercase text-sm mb-1">
                  VVLP Main Service Bay
                </h4>
                <p className="text-[10px] text-gray-500 font-mono mb-4">GPS: 40.7128° N, 74.0060° W</p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-accent-orange/10 border border-white/10 hover:border-accent-orange/50 text-white font-orbitron text-[9px] font-bold tracking-widest uppercase transition-colors"
                >
                  Get Route Directions
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-8 border border-white/5 shadow-glass h-full">
              
              <h3 className="text-xl font-orbitron font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                <MessageSquare size={18} className="text-accent-orange" />
                Submit An Inquiry
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name */}
                <div>
                  <label className="block text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Liam Smith"
                    className="w-full px-4 py-3.5 rounded-lg form-input text-sm"
                    required
                  />
                </div>

                {/* Email & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. liam@example.com"
                      className="w-full px-4 py-3.5 rounded-lg form-input text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. (555) 0122"
                      className="w-full px-4 py-3.5 rounded-lg form-input text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Inquiry Type */}
                <div>
                  <label className="block text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Inquiry Category
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 rounded-lg form-input text-sm"
                    required
                  >
                    <option value="general" className="bg-dark-900">General Questions</option>
                    <option value="quote" className="bg-dark-900">Request Custom Quotation</option>
                    <option value="dealer" className="bg-dark-900">Dealership & Brand Warranties</option>
                    <option value="roadside" className="bg-dark-900">Doorstep Roadside Help</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    placeholder="Tell us about your vehicle model, tyre size, or service needs..."
                    className="w-full px-4 py-3.5 rounded-lg form-input text-sm resize-none"
                    required
                  />
                </div>

                {/* Submission CTA */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-orange-red text-white font-orbitron font-bold text-xs tracking-widest uppercase shadow-glow-orange hover:shadow-glow-red disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        Send Message
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex items-center gap-2 text-green-500 text-xs font-semibold"
                      >
                        <CheckCircle2 size={16} />
                        Message delivered successfully!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>

      {/* Floating WhatsApp Support Widget Button */}
      <motion.a
        href="https://wa.me/919265344385"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-2xl hover:bg-green-400 group cursor-pointer border border-white/10"
        title="Chat on WhatsApp"
      >
        {/* Pulsing glow ring around WhatsApp */}
        <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 blur-md group-hover:scale-125 transition-transform duration-500" />
        
        {/* WhatsApp Icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 448 512" 
          fill="currentColor" 
          className="w-7 h-7 filter drop-shadow"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </motion.a>
    </section>
  );
}
