import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const galleryItems = [
    {
      id: 1,
      src: "/images/tyre_installation.png",
      title: "Precision Tyre Installation",
      category: "Workshop",
      desc: "Automatic touchless mounting systems ensuring zero rim contact and scratch-free tyre installation.",
      sizeClass: "md:col-span-2 md:row-span-1"
    },
    {
      id: 2,
      src: "/images/service_center.png",
      title: "VVLP Diagnostics Center",
      category: "Diagnostics",
      desc: "Our clean luxury-tier workshop floor featuring hydraulic servicing platforms and laser check bays.",
      sizeClass: "md:col-span-1 md:row-span-2"
    },
    {
      id: 3,
      src: "/images/wheel_alignment.png",
      title: "3D Wheel Alignment",
      category: "Alignment",
      desc: "Multi-camera laser sensor measurement rig verifying toe, camber, and caster to 0.1mm accuracy.",
      sizeClass: "md:col-span-1 md:row-span-1"
    },
    {
      id: 4,
      src: "/images/customer_vehicles.png",
      title: "Supercar Track Tuning",
      category: "Client Cars",
      desc: "Preparing client high-performance vehicles with track-approved compound configurations.",
      sizeClass: "md:col-span-2 md:row-span-1"
    }
  ];

  const handleOpenLightbox = (index) => {
    setActiveIndex(index);
    setSelectedImage(galleryItems[index]);
  };

  const handleCloseLightbox = () => {
    setSelectedImage(null);
    setActiveIndex(null);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const nextIdx = (activeIndex + 1) % galleryItems.length;
    setActiveIndex(nextIdx);
    setSelectedImage(galleryItems[nextIdx]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const prevIdx = (activeIndex - 1 + galleryItems.length) % galleryItems.length;
    setActiveIndex(prevIdx);
    setSelectedImage(galleryItems[prevIdx]);
  };

  return (
    <section id="gallery" className="py-24 bg-dark-950 bg-grid relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-accent-orange/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-orbitron font-bold tracking-widest text-accent-orange uppercase mb-3">
            Service Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-black text-white uppercase tracking-wide">
            tour our <span className="text-transparent bg-clip-text bg-gradient-orange-red text-glow-orange">workshop</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-orange-red rounded-full mt-4 mb-6" />
          <p className="text-gray-400 font-sans text-sm sm:text-base max-w-xl">
            Take a look inside our high-performance facility equipped with laser-precision calibration technologies.
          </p>
        </div>

        {/* Masonry-like Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px] md:auto-rows-[320px]">
          {galleryItems.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              key={item.id}
              onClick={() => handleOpenLightbox(idx)}
              className={`group relative rounded-2xl overflow-hidden border border-white/5 bg-dark-900 cursor-pointer shadow-glass ${item.sizeClass}`}
            >
              {/* Image element */}
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />

              {/* Hover Overlay Detail Panel */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 select-none">
                <span className="text-[9px] font-orbitron font-bold text-accent-orange uppercase tracking-widest mb-1.5">
                  {item.category}
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

              {/* Static top corner category indicator */}
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-dark-950/75 border border-white/5 text-[9px] font-orbitron text-gray-300 uppercase tracking-widest group-hover:opacity-0 transition-opacity duration-300">
                {item.category}
              </div>
            </motion.div>
          ))}
        </div>

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

            {/* Lightbox Card container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-dark-900 border border-white/10 z-10 shadow-2xl flex flex-col"
            >
              
              {/* Image Frame */}
              <div className="relative h-[250px] sm:h-[400px] md:h-[480px] bg-black">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />

                {/* Close Button */}
                <button
                  onClick={handleCloseLightbox}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-dark-950/80 border border-white/10 hover:border-accent-orange text-gray-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>

                {/* Left Navigation Arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-dark-950/80 border border-white/5 hover:border-accent-orange text-white transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Right Navigation Arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-dark-950/80 border border-white/5 hover:border-accent-orange text-white transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Lower Info Area */}
              <div className="p-6 bg-dark-900 border-t border-white/5">
                <span className="text-[10px] font-orbitron font-bold text-accent-orange uppercase tracking-wider mb-2 block">
                  {selectedImage.category}
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
    </section>
  );
}
