import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, ArrowRight, ShieldCheck, Award, Zap } from 'lucide-react';

export default function Hero({ onBookClick, onQuoteClick }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-dark-950 select-none">
      
      {/* Background Video Layer - Max Visibility & Clean Cinematic Presentation */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-[0.85] scale-[1.01] transition-opacity duration-1000"
        >
          <source src="/Video/backgorund_not_looking_good_an.mp4" type="video/mp4" />
        </video>
        {/* Soft bottom fade to blend smoothly into the dark section backdrop below */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/25 via-dark-950/15 to-dark-950/95" />
      </div>

      <div className="max-w-4xl mx-auto px-6 w-full relative z-10 text-center flex flex-col items-center">
        
        {/* Main Content Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          {/* Tagline Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-950/80 backdrop-blur-md border border-white/10 mb-8"
          >
            <Zap size={14} className="text-accent-orange animate-pulse" />
            <span className="text-[10px] md:text-xs font-orbitron font-semibold tracking-widest text-gray-300 uppercase">
              Premium Authorized Dealer
            </span>
          </motion.div>

          {/* Main Title - Centered & Enlarged with Premium Drop Shadow */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-orbitron font-black text-white leading-[1.05] mb-6 uppercase tracking-tight max-w-3xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
          >
            Your Trusted Tyre Partner for <br />
            <span className="text-transparent bg-clip-text bg-gradient-orange-red text-glow-orange">
              Every Journey
            </span>
          </motion.h1>

          {/* Subheading - Centered with High-Contrast Backdrop Shadow */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-gray-200 font-sans font-medium tracking-wide max-w-2xl mb-12 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
          >
            Premium Tyres & Professional Services for Two-Wheelers, Cars, SUVs and Commercial Vehicles. Experience safety and performance engineered to perfection.
          </motion.p>

          {/* CTA Buttons - Centered */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mb-16"
          >
            <button 
              onClick={onBookClick}
              className="flex items-center justify-center gap-2.5 px-10 py-4.5 rounded-xl bg-gradient-orange-red text-white font-orbitron font-bold text-sm tracking-wider uppercase shadow-glow-orange hover:shadow-glow-red hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              <Calendar size={18} />
              Book Service
            </button>
            
            <button 
              onClick={onQuoteClick}
              className="flex items-center justify-center gap-2.5 px-10 py-4.5 rounded-xl border border-white/10 hover:border-accent-orange/50 hover:bg-white/5 text-white font-orbitron text-sm font-semibold tracking-wider uppercase transition-all duration-300 group"
            >
              Get Quote
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Key Trust Badges - Centered row */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 sm:gap-8 pt-10 border-t border-white/5 w-full max-w-xl justify-items-center"
          >
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-accent-orange">
                <ShieldCheck size={18} />
                <span className="text-xs font-orbitron font-semibold uppercase text-white">Genuine</span>
              </div>
              <span className="text-[10px] text-gray-500 font-sans">100% Brand Warranty</span>
            </div>
            
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-accent-orange">
                <Award size={18} />
                <span className="text-xs font-orbitron font-semibold uppercase text-white">Certified</span>
              </div>
              <span className="text-[10px] text-gray-500 font-sans">Expert Technicians</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-accent-orange">
                <Phone size={18} />
                <span className="text-xs font-orbitron font-semibold uppercase text-white">24/7 Road</span>
              </div>
              <span className="text-[10px] text-gray-500 font-sans">Roadside Assistance</span>
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* Elegant scroll-down indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-55">
        <span className="text-[9px] font-orbitron tracking-widest text-gray-500 uppercase">Scroll Down</span>
        <div className="w-5 h-8 rounded-full border border-gray-600 flex justify-center p-1.5">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-accent-orange" 
          />
        </div>
      </div>
    </section>
  );
}
