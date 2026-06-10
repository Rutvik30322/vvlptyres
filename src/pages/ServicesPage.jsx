import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Scale, Scissors, Gauge, Wrench, Calendar, User, Phone, Mail, Car, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ServicesPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: 'car',
    service: 'Wheel Alignment',
    date: '',
    time: '09:00 AM',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  // Primary services list based on handwritten notes
  const servicesList = [
    {
      id: "alignment",
      title: "Wheel Alignment",
      icon: <Compass size={28} />,
      desc: "3D laser sensor technology to measure and align all wheel angles. Adjusting camber, caster, and toe-in corrects vehicle drift, minimizes tread wear, and improves fuel economy.",
      price: "₹150 onwards",
      benefit: "Saves tyres, corrects steering pull"
    },
    {
      id: "balancing",
      title: "Wheel Balancing",
      icon: <Scale size={28} />,
      desc: "Computerized wheel balancer monitors dynamic weight distribution. Small counterweights are attached to the rim edges to neutralize vibration in steering wheel and chassis at high speeds.",
      price: "₹50 onwards",
      benefit: "Eliminates steering wheel vibration"
    },
    {
      id: "nitrogen",
      title: "Nitrogen Filling",
      icon: <Gauge size={28} />,
      desc: "Inflation with 99% dry nitrogen. Unlike standard air, nitrogen has larger molecules that do not permeate through rubber easily, maintaining stable pressures and running cooler.",
      price: "₹50 per tyre",
      benefit: "Stable tyre pressure & cooler run"
    },
    {
      id: "puncture",
      title: "Puncture Repair",
      icon: <Scissors size={28} />,
      desc: "Professional inside-out tubeless puncture repair. We dismount the tyre, clean the inner liner, and seal the puncture tunnel with high-grade vulcanized rubber plug-patches.",
      price: "₹100 onwards",
      benefit: "Secure and durable safety seals"
    },
    {
      id: "rim-straightening",
      title: "Rim Straightening",
      icon: <Wrench size={28} />,
      desc: "Hydro-mechanical straightening of alloy and steel rims bent by potholes. This restores the wheel's roundness and radial runout to factory specification, stopping tubeless air leaks.",
      price: "₹200 onwards",
      benefit: "Restores bent alloy wheels"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `VVLP-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingId(generatedId);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Confetti blast on successful scheduling
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff6600', '#ff003c', '#ffffff', '#12121e']
      });
    }, 1500);
  };

  return (
    <div className="pt-24 min-h-screen bg-dark-950 text-white bg-grid relative overflow-hidden">
      
      {/* Background glow filters */}
      <div className="absolute top-1/4 left-0 w-[40vw] h-[40vw] rounded-full bg-accent-orange/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[40vw] h-[40vw] rounded-full bg-accent-red/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <span className="text-xs font-orbitron font-bold tracking-widest text-accent-orange uppercase mb-3 block">
            Dealer Workshop Services
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-black uppercase tracking-wide">
            precision <span className="text-transparent bg-clip-text bg-gradient-orange-red text-glow-orange">car diagnostics</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-orange-red rounded-full mt-4 mb-6 mx-auto" />
          <p className="text-gray-400 font-sans text-sm sm:text-base max-w-2xl mx-auto">
            Get your alignment, balancing, and nitrogen refills done with state-of-the-art diagnostic machinery. Schedule your appointment below.
          </p>
        </div>

        {/* Detailed Services Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {servicesList.map((service, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              key={service.id}
              className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between glass-card-hover"
            >
              <div>
                <div className="p-3 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border bg-white/5 border-white/10 text-accent-orange">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-orbitron font-bold text-white uppercase tracking-wide mb-2">
                  {service.title}
                </h3>
                
                <span className="text-[10px] font-mono text-accent-orange uppercase tracking-wider block mb-4">
                  ✦ {service.benefit}
                </span>
                
                <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed mb-6">
                  {service.desc}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <span className="text-xs font-mono text-gray-500 uppercase">Estimated price:</span>
                <span className="text-sm font-orbitron font-bold text-white uppercase">{service.price}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Booking Form Layout Section */}
        <div id="booking-form" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start scroll-mt-24">
          
          {/* Diagnostic trust column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-orbitron font-bold tracking-widest text-accent-orange uppercase mb-3 block">
                Appointment Desk
              </span>
              <h2 className="text-3xl font-orbitron font-black text-white uppercase tracking-wider">
                Schedule Diagnostics
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm font-sans mt-2">
                Secure your slot in our advanced service bays at Vadodara. Our team will verify tyre availability and schedule your technician.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4 font-sans text-xs text-gray-400">
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-accent-orange shrink-0 mt-0.5" size={18} />
                <div>
                  <strong className="text-white block uppercase mb-0.5">Laser-Guided Precision</strong>
                  Every alignment is handled by computerized 3D diagnostic sensors mapping parameters.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-accent-orange shrink-0 mt-0.5" size={18} />
                <div>
                  <strong className="text-white block uppercase mb-0.5">Quick turnaround</strong>
                  Standard maintenance takes less than 45 minutes, with nitrogen fills completed in minutes.
                </div>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-white/5 leading-relaxed text-gray-400">
                Authorized dealer warranty claims and tyre fitting guidelines are strictly complied with. For emergency puncture roadside service, call <a href="tel:+919265344385" className="text-accent-orange font-bold font-mono">92653 44385</a>.
              </div>
            </div>
          </div>

          {/* Form Entry */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-8 border border-white/5 shadow-glass h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-radial-gradient pointer-events-none" />
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Select Service */}
                    <div>
                      <label className="block text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Select Diagnostic Service
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
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

                    {/* Vehicle Type */}
                    <div>
                      <label className="block text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Vehicle Category
                      </label>
                      <select
                        name="vehicle"
                        value={formData.vehicle}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg form-input text-sm"
                        required
                      >
                        <option value="two-wheeler" className="bg-dark-900">Two-Wheeler (Motorcycle/Scooter)</option>
                        <option value="car" className="bg-dark-900">Car / Hatchback / Sedan</option>
                        <option value="suv" className="bg-dark-900">SUV / Crossover / 4x4</option>
                        <option value="commercial" className="bg-dark-900">Heavy Truck / Commercial</option>
                        <option value="tractor" className="bg-dark-900">Agricultural Tractor</option>
                      </select>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Customer Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 text-gray-500" size={16} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter full name"
                        className="w-full pl-10 pr-4 py-3 rounded-lg form-input text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Phone Line
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 text-gray-500" size={16} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. 98250 91074"
                          className="w-full pl-10 pr-4 py-3 rounded-lg form-input text-sm font-semibold tracking-wide"
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
                          placeholder="e.g. Vinodpunjabi017@gmail.com"
                          className="w-full pl-10 pr-4 py-3 rounded-lg form-input text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Date & Time Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg form-input text-sm text-gray-300 font-semibold"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Preferred Time Slot
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg form-input text-sm font-semibold text-gray-300"
                        required
                      >
                        <option value="09:00 AM" className="bg-dark-900">09:00 AM - 11:00 AM</option>
                        <option value="11:00 AM" className="bg-dark-900">11:00 AM - 01:00 PM</option>
                        <option value="02:00 PM" className="bg-dark-900">02:00 PM - 04:00 PM</option>
                        <option value="04:00 PM" className="bg-dark-900">04:00 PM - 06:00 PM</option>
                        <option value="06:00 PM" className="bg-dark-900">06:00 PM - 08:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Additional notes */}
                  <div>
                    <label className="block text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Car Model & Size Requirements (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="e.g. Maruti Swift Dzire, tyre size 185/65 R15, need fast alignment check..."
                      className="w-full px-4 py-3 rounded-lg form-input text-sm resize-none"
                    />
                  </div>

                  {/* Booking CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-orange-red text-white font-orbitron font-bold text-sm tracking-wider uppercase shadow-glow-orange hover:shadow-glow-red transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Transmitting Schedule...
                      </>
                    ) : (
                      "Confirm Service Appointment"
                    )}
                  </button>
                </form>
              ) : (
                /* Success Layout */
                <div className="flex flex-col items-center text-center py-6 font-sans">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>
                  
                  <h4 className="text-2xl font-orbitron font-bold text-white uppercase tracking-wider mb-2">
                    Appointment Registered!
                  </h4>
                  <p className="text-xs text-gray-400 max-w-sm mb-6 leading-relaxed">
                    Your appointment has been registered at the Vadodara dealer computer. A service rep will dial you back shortly.
                  </p>

                  <div className="w-full p-5 rounded-xl bg-dark-900 border border-white/5 space-y-3.5 mb-8 text-left text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500 uppercase font-orbitron text-[10px] font-bold">Booking ID</span>
                      <span className="text-accent-orange font-orbitron font-bold tracking-wider">{bookingId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service Selection</span>
                      <span className="text-white font-medium">{formData.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date & Slot</span>
                      <span className="text-white font-medium">{formData.date} at {formData.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Customer</span>
                      <span className="text-white font-medium">{formData.name} ({formData.phone})</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-3 rounded-lg border border-white/10 hover:border-accent-orange/50 text-white font-orbitron text-xs font-semibold uppercase tracking-wider transition-all duration-300"
                  >
                    Schedule Another Vehicle
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
