import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Compass, ShieldAlert, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

// 3D Tilt Card Subcomponent
function ProductCard({ title, badge, desc, specs, accentColor, imageClass }) {
  const cardRef = useRef(null);
  
  // Motion values for tracking tilt angles
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map coordinate weights to rotations (degrees)
  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  // Card glare effect calculation
  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
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

  return (
    <div 
      className="perspective-1000 h-full w-full"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="glass-card rounded-2xl p-6 h-full flex flex-col justify-between border border-white/5 relative overflow-hidden transition-all duration-300 hover:border-white/10 group select-none shadow-glass"
      >
        {/* Dynamic Glare Overlay */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
          }}
        />

        {/* Top Header */}
        <div style={{ transform: 'translateZ(30px)' }}>
          <div className="flex justify-between items-center mb-4">
            <span 
              className="text-[9px] font-orbitron font-bold tracking-widest px-2.5 py-1 rounded bg-white/5 border border-white/5 uppercase"
              style={{ color: accentColor }}
            >
              {badge}
            </span>
            <Zap size={14} style={{ color: accentColor }} />
          </div>
          
          <h3 className="text-xl font-orbitron font-black text-white mb-2 uppercase tracking-wide">
            {title}
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6">
            {desc}
          </p>
        </div>

        {/* Procedural Tread Visual Layer */}
        <div 
          className="w-full h-24 rounded-xl bg-dark-900 border border-white/5 relative overflow-hidden flex items-center justify-center mb-6"
          style={{ transform: 'translateZ(15px)' }}
        >
          {/* Subtle colored shadow */}
          <div 
            className="absolute inset-0 opacity-10 blur-xl pointer-events-none transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundColor: accentColor }}
          />

          {/* Tread drawing details */}
          <div className="absolute inset-x-0 h-8 flex flex-col justify-between opacity-30">
            {/* Tyre tread simulation pattern */}
            <div className={`w-full h-[6px] ${imageClass} opacity-80`} />
            <div className={`w-full h-[6px] ${imageClass} opacity-80`} />
          </div>
          <span className="text-[10px] font-orbitron tracking-widest text-gray-500 font-semibold uppercase relative z-10 group-hover:text-white transition-colors duration-300">
            Click to View Spec
          </span>
        </div>

        {/* Specs breakdown */}
        <div className="space-y-2 mb-6" style={{ transform: 'translateZ(25px)' }}>
          {specs.map((spec, index) => (
            <div key={index} className="flex justify-between text-[11px] font-sans">
              <span className="text-gray-500 uppercase">{spec.label}</span>
              <span className="text-gray-300 font-semibold">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="pt-4 border-t border-white/5" style={{ transform: 'translateZ(20px)' }}>
          <button className="flex items-center gap-1.5 text-xs font-orbitron font-bold text-white uppercase group-hover:text-accent-orange transition-colors duration-300">
            Explore Models
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function Products() {
  const categories = [
    {
      title: "Bike Tyres",
      badge: "Sport & Commute",
      desc: "Optimal cornering grip and high wet-weather safety engineered for motorcycles.",
      accentColor: "#ef4444",
      imageClass: "bg-[radial-gradient(circle_at_center,_#ef4444_20%,_transparent_100%)]",
      specs: [
        { label: "Rim Range", value: "12\" - 21\"" },
        { label: "Tread Class", value: "Street / Sport" },
        { label: "Warranty", value: "3-Year Unconditional" }
      ]
    },
    {
      title: "Scooter Tyres",
      badge: "City Ride",
      desc: "Long tread life, high durability, and safety for everyday city commuting.",
      accentColor: "#eab308",
      imageClass: "bg-[radial-gradient(circle_at_center,_#eab308_20%,_transparent_100%)]",
      specs: [
        { label: "Rim Range", value: "10\" - 14\"" },
        { label: "Tread Class", value: "Urban Block" },
        { label: "Warranty", value: "3-Year Standard" }
      ]
    },
    {
      title: "Car Tyres",
      badge: "UHP & Touring",
      desc: "Ultra High Performance and low noise touring tyres offering maximum driving comfort.",
      accentColor: "#3b82f6",
      imageClass: "bg-[radial-gradient(circle_at_center,_#3b82f6_20%,_transparent_100%)]",
      specs: [
        { label: "Rim Range", value: "13\" - 20\"" },
        { label: "Tread Class", value: "Asymmetrical / Silica" },
        { label: "Warranty", value: "5-Year Manufacturer" }
      ]
    },
    {
      title: "SUV Tyres",
      badge: "All-Terrain 4x4",
      desc: "Reinforced sidewalls and aggressive tread patterns built for off-road adventure.",
      accentColor: "#22c55e",
      imageClass: "bg-[radial-gradient(circle_at_center,_#22c55e_20%,_transparent_100%)]",
      specs: [
        { label: "Rim Range", value: "15\" - 22\"" },
        { label: "Tread Class", value: "A/T and Mud-Terrain" },
        { label: "Warranty", value: "5-Year Unconditional" }
      ]
    },
    {
      title: "Truck Tyres",
      badge: "Heavy Duty",
      desc: "High load-bearing capacity tyres customized for long haul commercial fleets.",
      accentColor: "#ec4899",
      imageClass: "bg-[radial-gradient(circle_at_center,_#ec4899_20%,_transparent_100%)]",
      specs: [
        { label: "Rim Range", value: "16\" - 24\"" },
        { label: "Tread Class", value: "Rib / Lug Rib" },
        { label: "Warranty", value: "1-Year retread guarantee" }
      ]
    },
    {
      title: "Agricultural Tyres",
      badge: "Tractor Max",
      desc: "High flotation, minimum soil compaction tyres built for heavy farm machines.",
      accentColor: "#a855f7",
      imageClass: "bg-[radial-gradient(circle_at_center,_#a855f7_20%,_transparent_100%)]",
      specs: [
        { label: "Rim Range", value: "24\" - 42\"" },
        { label: "Tread Class", value: "Aggressive R-1 Lug" },
        { label: "Warranty", value: "7-Year Structural" }
      ]
    }
  ];

  return (
    <section id="products" className="py-24 bg-dark-950 bg-grid relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-accent-orange/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-accent-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-orbitron font-bold tracking-widest text-accent-orange uppercase mb-3">
            Our Product Range
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-black text-white uppercase tracking-wide">
            engineered for <span className="text-transparent bg-clip-text bg-gradient-orange-red text-glow-orange">every surface</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-orange-red rounded-full mt-4 mb-6" />
          <p className="text-gray-400 font-sans text-sm sm:text-base max-w-xl">
            Browse through our premium tyre categories, customized to optimize safety, fuel efficiency, and vehicle control on any road.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              key={idx}
            >
              <ProductCard {...cat} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
