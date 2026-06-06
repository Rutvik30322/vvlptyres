import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Scale, Scissors, Gauge, RefreshCw, Battery, ShieldAlert, X, Calendar, User, Phone, Mail, Car } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Services({ isModalOpen, setIsModalOpen, selectedService, setSelectedService }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: 'car',
    date: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const servicesList = [
    {
      id: "alignment",
      title: "Wheel Alignment",
      icon: <Compass size={24} />,
      desc: "3D laser sensor technology to adjust your tyre angles, reducing wear and ensuring perfect driving line stability.",
      price: "$45 onwards"
    },
    {
      id: "balancing",
      title: "Wheel Balancing",
      icon: <Scale size={24} />,
      desc: "Precise computerized weight distribution around the wheels to eliminate high-speed steering vibration.",
      price: "$30 onwards"
    },
    {
      id: "puncture",
      title: "Puncture Repair",
      icon: <Scissors size={24} />,
      desc: "Inside-out tubeless plug and patch repairs meeting high safety standards for secure tyre rehabilitation.",
      price: "$15 onwards"
    },
    {
      id: "nitrogen",
      title: "Nitrogen Filling",
      icon: <Gauge size={24} />,
      desc: "99% pure nitrogen inflation to maintain stable tyre pressure, cooler running temperatures, and better mileage.",
      price: "$5 per tyre"
    },
    {
      id: "rotation",
      title: "Tyre Rotation",
      icon: <RefreshCw size={24} />,
      desc: "Strategic front-to-back cross swapping of wheels to ensure uniform wear patterns and prolong tyre tread lifespan.",
      price: "$20 onwards"
    },
    {
      id: "battery",
      title: "Battery Services",
      icon: <Battery size={24} />,
      desc: "Diagnostics, charging checks, and replacements of multi-brand car batteries with onsite warranty logging.",
      price: "Free checkup"
    },
    {
      id: "roadside",
      title: "Emergency Roadside Assistance",
      icon: <ShieldAlert size={24} className="animate-pulse text-accent-red" />,
      desc: "On-call flat tyre repairs, spare wheel mounting, and jump starts directly at your location, 24/7.",
      price: "On-Call Pricing",
      isPremium: true
    }
  ];

  const handleOpenModal = (serviceTitle) => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset form after exit transition
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        email: '',
        vehicle: 'car',
        date: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 300);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate backend network delay
    setTimeout(() => {
      const generatedId = `VVLP-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingId(generatedId);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Trigger canvas-confetti blast
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff6600', '#ff003c', '#ffffff', '#12121e']
      });
    }, 1500);
  };

  return (
    <section id="services" className="py-24 bg-dark-900 bg-grid relative overflow-hidden">
      
      {/* Visual background flares */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-accent-orange/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-orbitron font-bold tracking-widest text-accent-orange uppercase mb-3">
            Service Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-black text-white uppercase tracking-wide">
            professional <span className="text-transparent bg-clip-text bg-gradient-orange-red text-glow-orange">tyre care</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-orange-red rounded-full mt-4 mb-6" />
          <p className="text-gray-400 font-sans text-sm sm:text-base max-w-xl">
            From laser 3D alignments to emergency roadside help, our service center provides precision support for all vehicle classes.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              key={service.id}
              className={`glass-card rounded-2xl p-6 border flex flex-col justify-between glass-card-hover ${
                service.isPremium 
                  ? 'border-accent-red/30 shadow-[0_0_20px_rgba(255,0,60,0.1)] hover:border-accent-red/50' 
                  : 'border-white/5 hover:border-accent-orange/40'
              }`}
            >
              <div>
                <div 
                  className={`p-3 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${
                    service.isPremium
                      ? 'bg-accent-red/10 border-accent-red/20 text-accent-red'
                      : 'bg-white/5 border-white/10 text-accent-orange'
                  }`}
                >
                  {service.icon}
                </div>
                
                <h3 className="text-lg sm:text-xl font-orbitron font-bold text-white uppercase tracking-wide mb-3">
                  {service.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed mb-6">
                  {service.desc}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <span className="text-xs font-mono text-gray-500 uppercase">{service.price}</span>
                <button
                  onClick={() => handleOpenModal(service.title)}
                  className={`px-4 py-2 rounded-lg text-xs font-orbitron font-bold uppercase transition-all duration-300 ${
                    service.isPremium
                      ? 'bg-accent-red hover:bg-accent-red/80 shadow-glow-red text-white'
                      : 'border border-white/10 hover:border-accent-orange hover:bg-accent-orange/10 text-white'
                  }`}
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Booking Modal Dialog */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Modal Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm"
            />

            {/* Modal content box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg glass-card rounded-2xl border border-white/10 shadow-glass overflow-hidden z-10"
            >
              {/* Heading */}
              <div className="flex justify-between items-center p-6 border-b border-white/5 bg-dark-900/50">
                <h3 className="text-lg font-orbitron font-black text-white uppercase tracking-wider">
                  {isSubmitted ? "Booking Confirmed" : "Schedule Service"}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-6">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Selected Service */}
                    <div>
                      <label className="block text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Selected Service
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg form-input font-sans text-sm font-semibold"
                        required
                      >
                        {servicesList.map((s) => (
                          <option key={s.id} value={s.title} className="bg-dark-900 text-white">
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 text-gray-500" size={16} />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Alex Carter"
                          className="w-full pl-10 pr-4 py-3 rounded-lg form-input text-sm"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone & Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-3.5 text-gray-500" size={16} />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. +1 555-0199"
                            className="w-full pl-10 pr-4 py-3 rounded-lg form-input text-sm"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3.5 text-gray-500" size={16} />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="e.g. alex@example.com"
                            className="w-full pl-10 pr-4 py-3 rounded-lg form-input text-sm"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Vehicle Type & Preferred Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                          Vehicle Type
                        </label>
                        <div className="relative">
                          <Car className="absolute left-3.5 top-3.5 text-gray-500" size={16} />
                          <select
                            name="vehicle"
                            value={formData.vehicle}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 rounded-lg form-input text-sm"
                            required
                          >
                            <option value="two-wheeler" className="bg-dark-900 text-white">Two-Wheeler</option>
                            <option value="car" className="bg-dark-900 text-white">Car / Sedan</option>
                            <option value="suv" className="bg-dark-900 text-white">SUV / Crossover</option>
                            <option value="commercial" className="bg-dark-900 text-white">Truck / Commercial</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                          Preferred Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3.5 top-3.5 text-gray-500" size={16} />
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 rounded-lg form-input text-sm"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Additional Requirements (Optional)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="e.g. Specific tyre size, battery brand details..."
                        className="w-full px-4 py-3 rounded-lg form-input text-sm resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-orange-red text-white font-orbitron font-bold text-sm tracking-wider uppercase shadow-glow-orange hover:shadow-glow-red disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing Booking...
                        </>
                      ) : (
                        "Confirm Appointment"
                      )}
                    </button>
                  </form>
                ) : (
                  /* Confirmation State */
                  <div className="flex flex-col items-center text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 flex items-center justify-center mb-6 animate-bounce">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    
                    <h4 className="text-xl font-orbitron font-bold text-white uppercase tracking-wider mb-2">
                      Appointment Scheduled!
                    </h4>
                    <p className="text-xs text-gray-400 font-sans max-w-sm mb-6">
                      Your booking request has been registered in the VVLP Tyres diagnostic system. A service representative will contact you shortly to confirm the slot.
                    </p>

                    {/* Invoice-like summary block */}
                    <div className="w-full p-4 rounded-xl bg-dark-900 border border-white/5 space-y-3 mb-8 text-left text-xs font-sans">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Booking ID</span>
                        <span className="text-accent-orange font-orbitron font-bold tracking-wider">{bookingId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Service Class</span>
                        <span className="text-white font-medium">{selectedService}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Scheduled Date</span>
                        <span className="text-white font-medium">{formData.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Client Name</span>
                        <span className="text-white font-medium">{formData.name}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCloseModal}
                      className="px-6 py-2.5 rounded-lg border border-white/10 hover:border-accent-orange/50 text-white font-orbitron text-xs font-semibold tracking-wider uppercase transition-all duration-300"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
