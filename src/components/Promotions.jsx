import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Compass, Activity, ArrowRight, Zap, Shield, Flame } from 'lucide-react';

export default function Promotions() {
  const ads = [
    {
      title: "Monsoon Safety Sale",
      tag: "Limited Time Promo",
      desc: "Prepare for Gujarat rains. Get flat ₹1,000 off on any set of 4 tyres. Includes free 3D Laser Wheel Alignment.",
      cta: "Book Safety Check",
      color: "from-cyan-500/10 to-blue-500/5",
      borderColor: "group-hover:border-cyan-500/40 border-cyan-500/10",
      glowColor: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      buttonColor: "bg-cyan-500 hover:bg-cyan-600 shadow-cyan-500/20",
      targetHash: "#/services",
      animation: (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {/* Simulated Rain Droplets */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1.5px] h-4 bg-cyan-400 rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `-20px`
              }}
              animate={{
                top: ['-20px', '120%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5 + Math.random() * 1.5,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )
    },
    {
      title: "Alloy Styling Upgrades",
      tag: "Zero-Cost EMI",
      desc: "Stance your ride with diamond-cut alloys from Neo & Minda. Avail zero-downpayment & zero-interest financing schemes.",
      cta: "Explore Alloy Wheels",
      color: "from-accent-orange/10 to-accent-red/5",
      borderColor: "group-hover:border-accent-orange/40 border-accent-orange/10",
      glowColor: "shadow-[0_0_20px_rgba(234,88,12,0.15)]",
      badgeColor: "bg-accent-orange/10 text-accent-orange border-accent-orange/20",
      buttonColor: "bg-accent-orange hover:bg-accent-red shadow-accent-orange/20",
      targetHash: "#/products",
      animation: (
        <div className="absolute -right-8 -bottom-8 w-24 h-24 pointer-events-none opacity-10 flex items-center justify-center">
          {/* Spinning 3D Alloy Pattern */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="w-full h-full rounded-full border-4 border-dashed border-white"
          />
        </div>
      )
    },
    {
      title: "24/7 Roadside Assistance",
      tag: "Highway Emergency",
      desc: "Stuck with a puncture? Drive stress-free across Vadodara and highway zones. Dynamic mobile backup dispatch at your service.",
      cta: "Save Emergency Line",
      color: "from-accent-red/10 to-purple-500/5",
      borderColor: "group-hover:border-accent-red/40 border-accent-red/10",
      glowColor: "shadow-[0_0_20px_rgba(239,68,68,0.15)]",
      badgeColor: "bg-accent-red/10 text-accent-red border-accent-red/20",
      buttonColor: "bg-accent-red hover:bg-red-700 shadow-accent-red/20",
      targetHash: "#/contact",
      animation: (
        <div className="absolute top-2 right-2 flex gap-1 pointer-events-none">
          {/* Animated red alert warning beacon */}
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-2.5 h-2.5 rounded-full bg-accent-red shadow-[0_0_8px_#ef4444]"
          />
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]"
          />
        </div>
      )
    }
  ];

  return (
    <section className="py-12 bg-dark-950 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className={`group relative rounded-2xl p-6 bg-gradient-to-br ${ad.color} border ${ad.borderColor} transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer hover:${ad.glowColor}`}
              onClick={() => {
                window.location.hash = ad.targetHash;
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {/* Background animations */}
              {ad.animation}

              <div>
                {/* Header Tag */}
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-[8px] font-orbitron font-bold tracking-widest px-2.5 py-0.5 rounded border uppercase ${ad.badgeColor}`}>
                    {ad.tag}
                  </span>
                  <Zap size={12} className="text-white/30 group-hover:text-accent-orange transition-colors" />
                </div>

                {/* Ad Content */}
                <h3 className="text-lg font-orbitron font-black text-white uppercase tracking-wide mb-2 group-hover:text-white/90">
                  {ad.title}
                </h3>
                <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6">
                  {ad.desc}
                </p>
              </div>

              {/* Action button */}
              <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-auto">
                <span className="text-[10px] font-orbitron font-bold uppercase tracking-wider text-gray-400 group-hover:text-white transition-colors flex items-center gap-1">
                  {ad.cta} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[9px] font-mono text-white/10 uppercase font-semibold">VVLP Special</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
