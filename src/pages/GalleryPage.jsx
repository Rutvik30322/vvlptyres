import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, ChevronLeft, ChevronRight, Image as ImageIcon, Sparkles } from 'lucide-react';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const galleryItems = [
    {
      id: 1,
      src: "/images/tyre_installation.png",
      title: "Precision Tyre Installation",
      category: "workshop",
      categoryLabel: "Workshop",
      desc: "Automatic touchless mounting systems ensuring zero rim contact and scratch-free tyre installation.",
      sizeClass: "md:col-span-2 md:row-span-1"
    },
    {
      id: 2,
      src: "/images/service_center.png",
      title: "VVLP Diagnostics Center",
      category: "diagnostics",
      categoryLabel: "Diagnostics",
      desc: "Our clean luxury-tier workshop floor featuring hydraulic servicing platforms and laser check bays.",
      sizeClass: "md:col-span-1 md:row-span-2"
    },
    {
      id: 3,
      src: "/images/wheel_alignment.png",
      title: "3D Wheel Alignment Sensor Setup",
      category: "diagnostics",
      categoryLabel: "Diagnostics",
      desc: "Multi-camera laser sensor measurement rig verifying toe, camber, and caster to 0.1mm accuracy.",
      sizeClass: "md:col-span-1 md:row-span-1"
    },
    {
      id: 4,
      src: "/images/customer_vehicles.png",
      title: "High Performance Track Tuning",
      category: "client-cars",
      categoryLabel: "Client Cars",
      desc: "Preparing client high-performance vehicles with track-approved compound configurations.",
      sizeClass: "md:col-span-2 md:row-span-1"
    },
    {
      id: 5,
      src: "/images/service_center.png",
      title: "Premium Alloy Wheels Fitting",
      category: "alloys",
      categoryLabel: "Alloy Wheels",
      desc: "Custom fitting of Neo and Uno Minda alloys to premium sedans, fully balanced and verified for offset.",
      sizeClass: "md:col-span-1 md:row-span-1"
    },
    {
      id: 6,
      src: "/images/wheel_alignment.png",
      title: "Suspension & Steering Calibration",
      category: "workshop",
      categoryLabel: "Workshop",
      desc: "Comprehensive multi-point checkup of tie rods, ball joints, and steering links prior to alignment.",
      sizeClass: "md:col-span-1 md:row-span-1"
    },
    {
      id: 7,
      src: "/images/tyre_installation.png",
      title: "Heavy-Duty Truck Mount",
      category: "workshop",
      categoryLabel: "Workshop",
      desc: "Pneumatic tyre fitment machines designed for heavy commercial and agricultural wheels.",
      sizeClass: "md:col-span-1 md:row-span-1"
    },
    {
      id: 8,
      src: "/images/customer_vehicles.png",
      title: "Custom Off-Road Tyre Setup",
      category: "client-cars",
      categoryLabel: "Client Cars",
      desc: "Fitment of high-flotation mud-terrain tyres to 4x4 SUVs for off-road durability.",
      sizeClass: "md:col-span-2 md:row-span-1"
    }
  ];

  // Filtering logic
  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const handleOpenLightbox = (item) => {
    // Find index in filtered list to support slider navigation within filtered results
    const idx = filteredItems.findIndex(i => i.id === item.id);
    setActiveIndex(idx);
    setSelectedImage(item);
  };

  const handleCloseLightbox = () => {
    setSelectedImage(null);
    setActiveIndex(null);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const nextIdx = (activeIndex + 1) % filteredItems.length;
    setActiveIndex(nextIdx);
    setSelectedImage(filteredItems[nextIdx]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const prevIdx = (activeIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveIndex(prevIdx);
    setSelectedImage(filteredItems[prevIdx]);
  };

  const filters = [
    { value: 'all', label: 'All Media' },
    { value: 'workshop', label: 'Workshop Action' },
    { value: 'diagnostics', label: 'Laser Diagnostics' },
    { value: 'alloys', label: 'Alloy Showcase' },
    { value: 'client-cars', label: 'Client Showroom' }
  ];

  return (
    <div className={`pt-24 min-h-screen bg-dark-950 text-white bg-grid relative overflow-hidden ${selectedImage ? 'z-50' : ''}`}>
      
      {/* Background elements */}
      <div className="absolute top-1/3 left-1/4 w-[30vw] h-[30vw] rounded-full bg-accent-orange/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[30vw] h-[30vw] rounded-full bg-accent-red/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-12">
          <span className="text-xs font-orbitron font-bold tracking-widest text-accent-orange uppercase mb-3 block">
            Media Showroom
          </span>
          <h1 className="text-4xl sm:text-5xl font-orbitron font-black uppercase tracking-wide">
            our service <span className="text-transparent bg-clip-text bg-gradient-orange-red text-glow-orange">gallery</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-orange-red rounded-full mt-4 mb-6 mx-auto" />
          <p className="text-gray-400 font-sans text-sm sm:text-base max-w-2xl mx-auto">
            Take a visual tour through our advanced diagnostic shop. Watch our laser calibration platforms and custom wheel assemblies in action.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 border-b border-white/5 pb-8">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => {
                setActiveFilter(f.value);
                handleCloseLightbox(); // Reset lightbox if changing filter
              }}
              className={`px-5 py-2.5 rounded-lg font-orbitron text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                activeFilter === f.value
                  ? 'bg-gradient-orange-red border-transparent text-white shadow-glow-orange scale-105'
                  : 'border-white/5 bg-dark-900 text-gray-400 hover:border-white/10 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px] md:auto-rows-[320px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                onClick={() => handleOpenLightbox(item)}
                className={`group relative rounded-2xl overflow-hidden border border-white/5 bg-dark-900 cursor-pointer shadow-glass ${item.sizeClass}`}
              >
                {/* Image element */}
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Hover overlay panel */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 select-none">
                  <span className="text-[9px] font-orbitron font-bold text-accent-orange uppercase tracking-widest mb-1.5 flex items-center gap-1">
                    <Sparkles size={10} />
                    {item.categoryLabel}
                  </span>
                  <h3 className="text-lg font-orbitron font-bold text-white uppercase tracking-wide mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed mb-4 line-clamp-2">
                    {item.desc}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs text-white font-orbitron uppercase font-bold text-glow-orange">
                    <Eye size={14} className="text-accent-orange" />
                    Maximize View
                  </div>
                </div>

                {/* Top Corner category indicator */}
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-dark-950/75 border border-white/5 text-[9px] font-orbitron text-gray-300 uppercase tracking-widest group-hover:opacity-0 transition-opacity duration-300">
                  {item.categoryLabel}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox full-screen Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseLightbox}
              className="fixed inset-0 bg-dark-950/95 backdrop-blur-sm"
            />

            {/* Lightbox Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-dark-900 border border-white/10 z-10 shadow-2xl flex flex-col"
            >
              
              {/* Image Viewport */}
              <div className="relative h-[250px] sm:h-[400px] md:h-[480px] bg-black flex items-center justify-center">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />

                {/* Close Overlay Button */}
                <button
                  onClick={handleCloseLightbox}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-dark-950/80 border border-white/10 hover:border-accent-orange text-gray-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>

                {/* Left Navigation Arrow */}
                {filteredItems.length > 1 && (
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-dark-950/80 border border-white/5 hover:border-accent-orange text-white transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                )}

                {/* Right Navigation Arrow */}
                {filteredItems.length > 1 && (
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-dark-950/80 border border-white/5 hover:border-accent-orange text-white transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                )}
              </div>

              {/* Lower Details Area */}
              <div className="p-6 bg-dark-900 border-t border-white/5">
                <span className="text-[10px] font-orbitron font-bold text-accent-orange uppercase tracking-wider mb-2 block">
                  {selectedImage.categoryLabel}
                </span>
                <h3 className="text-xl font-orbitron font-black text-white uppercase tracking-wide mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
                  {selectedImage.desc}
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
