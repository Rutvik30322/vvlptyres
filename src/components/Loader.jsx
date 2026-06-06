import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const duration = 2000; // 2 seconds loading duration
    const intervalTime = 20;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600); // Allow fade out animation to finish
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-950 bg-grid"
        >
          {/* Subtle glow */}
          <div className="absolute inset-0 bg-radial-gradient opacity-80 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center px-4">
            {/* Spinning Tyre SVG */}
            <div className="w-32 h-32 md:w-40 md:h-40 mb-8 relative flex items-center justify-center">
              {/* Glow filter behind the tyre */}
              <div className="absolute inset-0 rounded-full bg-gradient-orange-red opacity-20 blur-xl animate-pulse-slow" />
              
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-white spinning-tyre-svg filter drop-shadow-[0_0_12px_rgba(255,102,0,0.5)]"
              >
                {/* Tyre Outer Edge */}
                <circle cx="50" cy="50" r="45" fill="none" stroke="#2c2c3e" strokeWidth="6" />
                {/* Tyre Treads (Small notches along the rim) */}
                <circle cx="50" cy="50" r="45" fill="none" stroke="#ff6600" strokeWidth="2" strokeDasharray="3, 4" />
                
                {/* Tyre Sidewall */}
                <circle cx="50" cy="50" r="38" fill="#0f0f15" stroke="#1b1b2a" strokeWidth="8" />
                
                {/* Inner metallic Rim */}
                <circle cx="50" cy="50" r="30" fill="#1b1b2a" stroke="#cccccc" strokeWidth="2" />
                
                {/* Spokes of the alloy wheel */}
                <g stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="50" y1="20" x2="50" y2="80" />
                  <line x1="20" y1="50" x2="80" y2="50" />
                  <line x1="29" y1="29" x2="71" y2="71" />
                  <line x1="29" y1="71" x2="71" y2="29" />
                </g>
                
                {/* Rim Center Cap and Lug Nuts */}
                <circle cx="50" cy="50" r="10" fill="#12121e" stroke="#cccccc" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="4" fill="#ff6600" />
                
                {/* Small Lug Nuts */}
                <circle cx="50" cy="45" r="1.2" fill="#ffffff" />
                <circle cx="50" cy="55" r="1.2" fill="#ffffff" />
                <circle cx="45" cy="50" r="1.2" fill="#ffffff" />
                <circle cx="55" cy="50" r="1.2" fill="#ffffff" />
              </svg>
            </div>

            {/* VVLP Brand Text */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-orbitron font-black tracking-widest text-white mb-1 text-center"
            >
              VVLP
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-transparent bg-clip-text bg-gradient-orange-red text-glow-orange font-orbitron font-black text-xs sm:text-sm uppercase tracking-widest mb-8 text-center"
            >
              TYRES & ALLOY WHEELS
            </motion.p>

            {/* Progress Container */}
            <div className="w-64 md:w-80">
              <div className="flex justify-between items-end mb-2">
                <span className="text-gray-500 text-xs font-orbitron uppercase tracking-wider">Loading Assets</span>
                <span className="text-accent-orange font-orbitron text-lg font-bold text-glow-orange">
                  {Math.round(progress)}%
                </span>
              </div>
              
              {/* Progress Bar Track */}
              <div className="w-full h-1.5 bg-dark-800 rounded-full overflow-hidden border border-white/5 relative">
                {/* Progress Fill */}
                <motion.div
                  className="h-full bg-gradient-orange-red"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>
            
            {/* Ambient Info */}
            <div className="mt-12 text-[10px] text-gray-600 font-mono space-y-1">
              <p>INITIALIZING ENGINE CACHE... OK</p>
              <p>LOADING PROCEDURAL 3D SHADERS... OK</p>
              <p>READY TO ROLL</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
