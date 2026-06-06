import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: "Marcus Aurelius",
      role: "Audi A6 Owner",
      review: "The 3D wheel alignment service here is top-tier. My steering wheel was slightly off-center after hit a pothole, but their digital calibration fixed it perfectly. Super premium waiting lounge and very fast service!",
      rating: 5
    },
    {
      name: "Sarah Jenkins",
      role: "KTM Duke 390 Rider",
      review: "Finding specialized sport bike tyres can be difficult, but VVLP Tyres had the Michelin Pilot Street Radials ready in stock. The staff treated my bike with absolute care and used specialized mounting equipment. 10/10!",
      rating: 5
    },
    {
      name: "Vikram Malhotra",
      role: "Ford Endeavour Owner",
      review: "Purchased a set of Yokohama Geolandar AT tyres for my truck. The pricing was very competitive and the installation was swift. The free nitrogen air filling and balancing that came with it was a massive bonus.",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Logistics Manager",
      review: "We buy all our commercial truck and trailer tyres from VVLP. Their warranty processing is extremely quick, and the doorstep assistance team saved our logistics operations twice during highway tyre blowouts.",
      rating: 5
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  // Slide animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Autoplay slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-dark-900 bg-grid relative overflow-hidden">
      
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent-orange/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-orbitron font-bold tracking-widest text-accent-orange uppercase mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-orbitron font-black text-white uppercase tracking-wide">
            what our <span className="text-transparent bg-clip-text bg-gradient-orange-red text-glow-orange">clients say</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-orange-red rounded-full mt-4" />
        </div>

        {/* Carousel Container */}
        <div className="relative h-[320px] sm:h-[260px] md:h-[240px] flex items-center justify-center">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full"
            >
              <div className="glass-card rounded-2xl p-8 sm:p-10 border border-white/5 shadow-glass relative flex flex-col justify-between">
                
                {/* Large Quote Symbol */}
                <div className="absolute top-6 right-8 text-accent-orange/15 select-none pointer-events-none">
                  <Quote size={80} strokeWidth={1} />
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1.5 mb-6 text-yellow-500">
                  {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-300 font-sans italic text-sm sm:text-base leading-relaxed mb-6">
                  "{reviews[activeIndex].review}"
                </p>

                {/* Client Profile Details */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-orange-red flex items-center justify-center font-orbitron font-bold text-white tracking-widest text-xs">
                    {reviews[activeIndex].name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-sm font-orbitron font-bold text-white uppercase">
                      {reviews[activeIndex].name}
                    </h4>
                    <span className="text-[10px] text-gray-500 font-sans font-semibold uppercase">
                      {reviews[activeIndex].role}
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center justify-between mt-8">
          {/* Arrow Left */}
          <button
            onClick={handlePrev}
            className="p-3 rounded-lg border border-white/10 hover:border-accent-orange/50 text-white transition-all bg-dark-950/40 hover:bg-white/5 active:scale-90"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex 
                    ? 'w-6 bg-accent-orange' 
                    : 'w-2 bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Arrow Right */}
          <button
            onClick={handleNext}
            className="p-3 rounded-lg border border-white/10 hover:border-accent-orange/50 text-white transition-all bg-dark-950/40 hover:bg-white/5 active:scale-90"
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
