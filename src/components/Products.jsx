import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronRight, Zap } from 'lucide-react';

// Import real tyre images for featured section
import michelinSportImg from '../assets/Tyres Size/MICHELIN CAR TYRES/MICHELIN R18.png';
import yokohamaCarImg from '../assets/Tyres Size/YOKOHAMA CAR TYRES/YOKOHAMA R14.png';
import michelinBikeImg from '../assets/Tyres Size/MICHELIN BIKE TYRES/MICHELIN BIKE 1.png';

// 3D Tilt Card Subcomponent
function ProductCard({ title, badge, desc, specs, accentColor, image, targetHash }) {
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

  const handleCardClick = () => {
    window.location.hash = targetHash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        onClick={handleCardClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="glass-card rounded-2xl p-6 h-full flex flex-col justify-between border border-white/5 relative overflow-hidden transition-all duration-300 hover:border-white/10 group select-none shadow-glass cursor-pointer"
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
          
          <h3 className="text-xl font-orbitron font-black text-white mb-2 uppercase tracking-wide group-hover:text-accent-orange transition-colors">
            {title}
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6 line-clamp-2">
            {desc}
          </p>
        </div>

        {/* Product Image Frame */}
        <div 
          className="w-full h-44 rounded-xl bg-gradient-to-b from-dark-905 to-black border border-white/5 relative overflow-hidden flex items-center justify-center mb-6 p-4"
          style={{ transform: 'translateZ(15px)' }}
        >
          {/* Subtle colored shadow */}
          <div 
            className="absolute inset-0 opacity-[0.08] blur-2xl pointer-events-none transition-transform duration-500 group-hover:scale-125"
            style={{ backgroundColor: accentColor }}
          />
          <img 
            src={image} 
            alt={title}
            className="h-full object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] group-hover:scale-[1.08] transition-all duration-500"
          />
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
            View Catalogue
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function Products() {
  const featuredProducts = [
    {
      title: "Michelin Pilot Sport 5",
      badge: "Ultra Performance Car",
      desc: "Premium sports tyre designed for high steering responsiveness, dry grip, and high wet-braking safety.",
      accentColor: "#3b82f6",
      image: michelinSportImg,
      specs: [
        { label: "Rim Range", value: "17\" - 20\"" },
        { label: "Starting Price", value: "₹9,500" },
        { label: "Grip Class", value: "Wet Grip A / Dry A" }
      ],
      targetHash: "#/products"
    },
    {
      title: "Yokohama Geolandar A/T",
      badge: "All-Terrain SUV",
      desc: "Severe snow certified all-terrain radial with orange-oil compounds for high offroad durability.",
      accentColor: "#22c55e",
      image: yokohamaCarImg,
      specs: [
        { label: "Rim Range", value: "15\" - 18\"" },
        { label: "Starting Price", value: "₹6,800" },
        { label: "Tread Pattern", value: "Rugged Offroad Block" }
      ],
      targetHash: "#/products"
    },
    {
      title: "Michelin Pilot Road 6",
      badge: "Sport Touring Bike",
      desc: "The reference sport touring motorcycle tyre. Uncompromising wet grip and longevity with dual-compound technology.",
      accentColor: "#ef4444",
      image: michelinBikeImg,
      specs: [
        { label: "Rim Range", value: "17\" Radial" },
        { label: "Starting Price", value: "₹6,800" },
        { label: "Technology", value: "2CT+ Dual Compound" }
      ],
      targetHash: "#/products"
    },
    {
      title: "Neo Carbon Matrix Alloys",
      badge: "ARAI Certified Alloys",
      desc: "High-grade diamond-cut alloy rims structured with carbon black. Built for ultimate impact resistance.",
      accentColor: "#ec4899",
      image: "/images/alloy_neo_carbon.png",
      specs: [
        { label: "Rim Range", value: "14\" - 17\"" },
        { label: "Starting Price", value: "₹28,000 / Set" },
        { label: "PCD Patterns", value: "4x100 / 5x114.3" }
      ],
      targetHash: "#/products"
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
            Featured Products
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-black text-white uppercase tracking-wide">
            authorized <span className="text-transparent bg-clip-text bg-gradient-orange-red text-glow-orange">tyres & alloys</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-orange-red rounded-full mt-4 mb-6" />
          <p className="text-gray-400 font-sans text-sm sm:text-base max-w-xl">
            Check out some of our best-selling premium tyres and custom styled alloy wheels, chosen to maximize your vehicle's stance and safety.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((cat, idx) => (
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
