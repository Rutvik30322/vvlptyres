import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Phone, Calendar, ArrowRight, ShieldCheck, Award, Play, Pause, Activity, Sliders, Eye } from 'lucide-react';
import ThreeCanvas from './ThreeCanvas';

export default function Hero({ onBookClick, onQuoteClick }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Video State
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [videoFilter, setVideoFilter] = useState('dark'); // 'dark', 'neon', 'cyberpunk'

  // 3D Tyre Customization State
  const [rimColor, setRimColor] = useState('#d1d5db');
  const [caliperColor, setCaliperColor] = useState('#ff003c');
  const [show3dTyre, setShow3dTyre] = useState(false);

  // Telemetry Mock State
  const [telemetry, setTelemetry] = useState({
    pressure: 32.4,
    temperature: 42.1,
    grip: 0.97
  });

  // Motion values for tracking tilt angles
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map coordinate weights to rotations (degrees)
  const rotateX = useTransform(y, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-12, 12]);

  // Card glare effect calculation
  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (event) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates to ranges [-0.5, 0.5]
    const mouseX = (event.clientX - rect.left) / width - 0.5;
    const mouseY = (event.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Toggle Video Playback
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Adjust Speed
  const handleSpeedChange = (speed) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  // Run dynamic telemetry updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        pressure: parseFloat((32.2 + Math.random() * 0.6).toFixed(1)),
        temperature: parseFloat((41.0 + Math.random() * 3.5).toFixed(1)),
        grip: parseFloat((0.93 + Math.random() * 0.05).toFixed(2))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-dark-950 select-none"
    >
      
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          className={`w-full h-full object-cover transition-all duration-1000 ${
            videoFilter === 'neon' ? 'hue-rotate-90 brightness-[0.75] saturate-150' : 
            videoFilter === 'cyberpunk' ? 'hue-rotate-[260deg] brightness-[0.6] saturate-200' : 'opacity-[0.85]'
          }`}
        >
          <source src="/Video/backgorund_not_looking_good_an.mp4" type="video/mp4" />
        </video>

        {/* Dynamic Scanlines & HUD Glow Overlays */}
        {videoFilter === 'neon' && (
          <div className="absolute inset-0 bg-cyan-500/5 mix-blend-color-dodge pointer-events-none bg-scanlines animate-scanlines" />
        )}
        {videoFilter === 'cyberpunk' && (
          <div className="absolute inset-0 bg-purple-500/5 mix-blend-color-dodge pointer-events-none bg-scanlines animate-scanlines" />
        )}

        {/* Soft bottom fade to blend smoothly into the backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/20 via-dark-950/30 to-dark-950" />
      </div>

      {/* Floating Diagnostic HUD Hotspots overlaying the video */}
      {show3dTyre && (
        <div className="absolute inset-0 pointer-events-none z-[5] hidden lg:block select-none">
          {/* Hotspot 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: [0.3, 0.8, 0.3], 
              y: [0, -12, 0],
              x: 0
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-[22%] left-[12%] flex items-center gap-3 backdrop-blur-md bg-dark-950/40 border border-cyan-500/30 rounded-lg p-2.5 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <div className="flex flex-col text-left">
              <span className="text-[9px] font-orbitron font-bold tracking-widest text-cyan-400 uppercase">✦ RADIAL STEEL BELT</span>
              <span className="text-[8px] font-sans text-gray-400 uppercase tracking-wider">HIGH-SPEED STRUCTURAL STABILITY</span>
            </div>
          </motion.div>

          {/* Hotspot 2 */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.25, 0.7, 0.25], 
              y: [0, 15, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1 
            }}
            className="absolute bottom-[28%] left-[20%] flex items-center gap-3 backdrop-blur-md bg-dark-950/40 border border-accent-orange/30 rounded-lg p-2.5 shadow-[0_0_15px_rgba(255,102,0,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-orange"></span>
            </span>
            <div className="flex flex-col text-left">
              <span className="text-[9px] font-orbitron font-bold tracking-widest text-accent-orange uppercase">✦ SILICA-POLYMER MATRIX</span>
              <span className="text-[8px] font-sans text-gray-400 uppercase tracking-wider">MAXIMUM WET ROAD ADHESION</span>
            </div>
          </motion.div>

          {/* Hotspot 3 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: [0.3, 0.9, 0.3], 
              y: [0, -10, 0],
              x: 0
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2 
            }}
            className="absolute top-[35%] left-[53%] flex items-center gap-3 backdrop-blur-md bg-dark-950/40 border border-purple-500/30 rounded-lg p-2.5 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <div className="flex flex-col text-left">
              <span className="text-[9px] font-orbitron font-bold tracking-widest text-purple-400 uppercase">✦ THERMO-SHIELD WALL</span>
              <span className="text-[8px] font-sans text-gray-400 uppercase tracking-wider">ACTIVE THERMAL DISSIPATION</span>
            </div>
          </motion.div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Headline & Actions */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left w-full"
        >
          {/* Tagline Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-950/80 backdrop-blur-md border border-white/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent-orange animate-ping" />
            <span className="text-[10px] md:text-xs font-orbitron font-semibold tracking-widest text-gray-300 uppercase">
              Premium Authorized Dealer
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-orbitron font-black text-white leading-[1.05] mb-6 uppercase tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]"
          >
            Your Trusted Tyre Partner for <br />
            <span className="text-transparent bg-clip-text bg-gradient-orange-red text-glow-orange">
              Every Journey
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-gray-300 font-sans font-medium tracking-wide max-w-2xl mb-10 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
          >
            Premium Tyres & Professional Services for Two-Wheelers, Cars, SUVs and Commercial Vehicles. Experience safety and performance engineered to perfection.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start mb-12"
          >
            <button 
              onClick={onBookClick}
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-orange-red text-white font-orbitron font-bold text-xs tracking-wider uppercase shadow-glow-orange hover:shadow-glow-red hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              <Calendar size={16} />
              Book Service
            </button>
            
            <button 
              onClick={onQuoteClick}
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl border border-white/10 hover:border-accent-orange/50 hover:bg-white/5 text-white font-orbitron text-xs font-semibold tracking-wider uppercase transition-all duration-300 group"
            >
              Get Quote
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Key Trust Badges */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 border-t border-white/5 w-full max-w-md justify-items-center lg:justify-items-start"
          >
            <div className="flex flex-col items-center lg:items-start gap-1">
              <div className="flex items-center gap-1.5 text-accent-orange">
                <ShieldCheck size={16} />
                <span className="text-[10px] sm:text-xs font-orbitron font-semibold uppercase text-white">Genuine</span>
              </div>
              <span className="text-[9px] text-gray-500 font-sans text-center lg:text-left">100% Brand Warranty</span>
            </div>
            
            <div className="flex flex-col items-center lg:items-start gap-1">
              <div className="flex items-center gap-1.5 text-accent-orange">
                <Award size={16} />
                <span className="text-[10px] sm:text-xs font-orbitron font-semibold uppercase text-white">Certified</span>
              </div>
              <span className="text-[9px] text-gray-500 font-sans text-center lg:text-left">Expert Technicians</span>
            </div>

            <div className="flex flex-col items-center lg:items-start gap-1">
              <div className="flex items-center gap-1.5 text-accent-orange">
                <Phone size={16} />
                <span className="text-[10px] sm:text-xs font-orbitron font-semibold uppercase text-white">24/7 Road</span>
              </div>
              <span className="text-[9px] text-gray-500 font-sans text-center lg:text-left">Tyre Assistance</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: 3D Gesture HUD & Video Controller Dashboard */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 hidden lg:flex items-center justify-end relative perspective-1000"
          style={{ perspective: '1200px' }}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="w-full max-w-[380px] glass-card rounded-2xl p-5 border border-white/10 backdrop-blur-md relative overflow-hidden shadow-glass flex flex-col justify-between"
          >
            {/* Glossy Refraction Glare */}
            <motion.div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity"
              style={{
                background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.35) 0%, transparent 60%)`,
              }}
            />

            <div style={{ transform: 'translateZ(30px)' }}>
              {/* Header Info */}
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <Activity className="text-accent-orange animate-pulse" size={18} />
                  <span className="text-[10px] font-orbitron font-bold tracking-widest text-white uppercase">
                    Live Telemetry HUD
                  </span>
                </div>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider animate-pulse">
                  System Online
                </span>
              </div>

              {/* Toggle 3D Customizer Action */}
              <div className="mb-6">
                <button
                  onClick={() => setShow3dTyre(!show3dTyre)}
                  className={`w-full py-3 px-4 rounded-xl font-orbitron text-[10px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2.5 border ${
                    show3dTyre 
                      ? 'bg-accent-orange/20 border-accent-orange/50 text-accent-orange shadow-glow-orange/20' 
                      : 'bg-white/5 border-white/10 hover:border-accent-orange/40 text-gray-300 hover:text-white'
                  }`}
                >
                  <Eye size={12} className={show3dTyre ? "text-accent-orange" : "text-gray-400"} />
                  {show3dTyre ? 'Hide 3D Tyre Customizer' : 'Show 3D Tyre Customizer'}
                </button>
              </div>

              {/* 3D Interactive Tyre Canvas Viewer */}
              {show3dTyre && (
                <div className="relative mb-6 rounded-xl overflow-hidden bg-dark-950/40 border border-white/5 shadow-inner">
                  <ThreeCanvas rimColor={rimColor} caliperColor={caliperColor} heightClass="h-[230px]" />
                </div>
              )}

              {/* Live telemetry values display */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {/* Pressure */}
                <div className="bg-dark-950/60 rounded-xl p-3 border border-white/5 flex flex-col items-center">
                  <span className="text-[9px] font-sans text-gray-500 uppercase font-semibold">Tyre Psi</span>
                  <span className="text-sm font-mono font-black text-white mt-1.5 animate-pulse">
                    {telemetry.pressure}
                  </span>
                  <div className="w-full bg-white/5 h-[3px] rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-accent-orange h-full transition-all duration-500" 
                      style={{ width: `${(telemetry.pressure / 35) * 100}%` }} 
                    />
                  </div>
                </div>

                {/* Temp */}
                <div className="bg-dark-950/60 rounded-xl p-3 border border-white/5 flex flex-col items-center">
                  <span className="text-[9px] font-sans text-gray-500 uppercase font-semibold">Temp °C</span>
                  <span className="text-sm font-mono font-black text-white mt-1.5">
                    {telemetry.temperature}°
                  </span>
                  <div className="w-full bg-white/5 h-[3px] rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-accent-red h-full transition-all duration-500" 
                      style={{ width: `${(telemetry.temperature / 60) * 100}%` }} 
                    />
                  </div>
                </div>

                {/* Grip */}
                <div className="bg-dark-950/60 rounded-xl p-3 border border-white/5 flex flex-col items-center">
                  <span className="text-[9px] font-sans text-gray-500 uppercase font-semibold">Grip Coeff</span>
                  <span className="text-sm font-mono font-black text-white mt-1.5">
                    {telemetry.grip}
                  </span>
                  <div className="w-full bg-white/5 h-[3px] rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-green-500 h-full transition-all duration-500" 
                      style={{ width: `${(telemetry.grip / 1.1) * 100}%` }} 
                    />
                  </div>
                </div>
              </div>

              {/* HUD Controls */}
              <div className="space-y-5">
                <span className="text-[9px] font-orbitron font-bold text-gray-500 uppercase tracking-widest block">
                  Cinematic & 3D Controls
                </span>

                {/* 3D Tyre Customizer Controls */}
                {show3dTyre && (
                  <div className="bg-dark-950/50 p-3 rounded-xl border border-white/5 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-sans text-gray-400 font-semibold uppercase">Rim Alloy Color</span>
                      <div className="flex gap-2.5">
                        {[
                          { name: 'Chrome', value: '#d1d5db' },
                          { name: 'Gold', value: '#d4af37' },
                          { name: 'Matte Black', value: '#1e1b29' },
                          { name: 'Bronze', value: '#b25e24' },
                        ].map((color) => (
                          <button
                            key={color.value}
                            onClick={() => setRimColor(color.value)}
                            className={`w-4 h-4 rounded-full border transition-all duration-300 ${
                              rimColor === color.value 
                                ? 'border-white scale-125 ring-2 ring-accent-orange/80' 
                                : 'border-white/20 hover:scale-110'
                            }`}
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2.5 border-t border-white/5">
                      <span className="text-[10px] font-sans text-gray-400 font-semibold uppercase">Brake Caliper</span>
                      <div className="flex gap-2.5">
                        {[
                          { name: 'Brembo Red', value: '#ff003c' },
                          { name: 'Yellow', value: '#eab308' },
                          { name: 'Electric Blue', value: '#2563eb' },
                          { name: 'Green Acid', value: '#22c55e' },
                        ].map((color) => (
                          <button
                            key={color.value}
                            onClick={() => setCaliperColor(color.value)}
                            className={`w-4 h-4 rounded-full border transition-all duration-300 ${
                              caliperColor === color.value 
                                ? 'border-white scale-125 ring-2 ring-accent-orange/80' 
                                : 'border-white/20 hover:scale-110'
                            }`}
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Play Speed Control Row */}
                <div className="flex justify-between items-center bg-dark-950/50 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[10px] font-sans text-gray-400 font-semibold uppercase">Video Speed</span>
                  <div className="flex gap-1.5">
                    {[0.5, 1.0, 1.5].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => handleSpeedChange(speed)}
                        className={`px-2 py-1 rounded text-[9px] font-mono font-bold transition-all ${
                          playbackSpeed === speed
                            ? 'bg-accent-orange text-white'
                            : 'bg-white/5 text-gray-400 hover:text-white'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Video Filters Row */}
                <div className="flex justify-between items-center bg-dark-950/50 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[10px] font-sans text-gray-400 font-semibold uppercase">HUD Filters</span>
                  <div className="flex gap-1.5">
                    {['dark', 'neon', 'cyberpunk'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setVideoFilter(filter)}
                        className={`px-2.5 py-1 rounded text-[9px] font-orbitron font-bold uppercase transition-all ${
                          videoFilter === filter
                            ? 'bg-gradient-orange-red text-white shadow-sm'
                            : 'bg-white/5 text-gray-500 hover:text-white'
                        }`}
                      >
                        {filter === 'dark' ? 'Normal' : filter === 'neon' ? 'Neon' : 'Cyber'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Play/Pause control widget footer */}
            <div 
              style={{ transform: 'translateZ(20px)' }}
              className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center"
            >
              <span className="text-[10px] font-sans text-gray-500 font-semibold uppercase flex items-center gap-1.5">
                <Sliders size={12} /> Live Render Screen
              </span>
              <button 
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-accent-orange/10 hover:bg-accent-orange border border-accent-orange/20 hover:border-transparent text-white flex items-center justify-center transition-all duration-300"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
              </button>
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
