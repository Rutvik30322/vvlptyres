import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ShieldCheck, Users, Wrench } from 'lucide-react';

// Animated Counter Subcomponent
function Counter({ targetValue, duration = 1500, suffix = "" }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * targetValue));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(targetValue);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isInView, targetValue, duration]);

  return (
    <span ref={elementRef} className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-orange-red text-glow-orange">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function About() {
  const stats = [
    { 
      target: 10000, 
      suffix: "+", 
      label: "Happy Customers", 
      icon: <Users className="text-accent-orange" size={24} />,
      desc: "Delivering safety & trust nationwide." 
    },
    { 
      target: 5000, 
      suffix: "+", 
      label: "Tyres Installed", 
      icon: <Wrench className="text-accent-orange" size={24} />,
      desc: "Precisely aligned & balanced setups." 
    },
    { 
      target: 15, 
      suffix: "+", 
      label: "Leading Brands", 
      icon: <Award className="text-accent-orange" size={24} />,
      desc: "Global tyre manufacturers catalog." 
    },
    { 
      target: 24, 
      suffix: "/7 Support", 
      label: "Roadside Support", 
      icon: <ShieldCheck className="text-accent-orange" size={24} />,
      desc: "Emergency doorstep assistance." 
    },
  ];

  return (
    <section id="about" className="py-24 bg-dark-900 bg-grid relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-accent-orange/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-accent-red/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Brand Story */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <span className="text-xs font-orbitron font-bold tracking-widest text-accent-orange uppercase mb-3">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-black text-white leading-tight uppercase mb-6">
              REDEFINING YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-orange-red">DRIVING EXPERIENCE</span>
            </h2>
            <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed mb-6">
              For over a decade, **VVLP Tyres & Alloy Wheels** has stood as a beacon of quality and professional expertise in the automotive sector. As an authorized distributor of the world’s leading tyre brands, we connect you to superior traction, fuel efficiency, and structural safety.
            </p>
            <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed mb-8">
              We aren’t just a retail store; we are a full-fledged **Tyre Diagnostics & Service Center**. Outfitted with 3D Wheel Alignment sensors, dynamic balancing systems, and premium Nitrogen filling rigs, our certified technicians ensure every vehicle rolls out with absolute safety.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full pt-6 border-t border-white/5">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-accent-orange">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-orbitron font-bold text-white uppercase">100% Genuine Tyres</h4>
                  <p className="text-xs text-gray-500 mt-1">Direct from manufacturers with original serials and brand warranties.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-accent-orange">
                  <Wrench size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-orbitron font-bold text-white uppercase">Advanced Service Center</h4>
                  <p className="text-xs text-gray-500 mt-1">Laser precision 3D alignment systems for perfect handling dynamics.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Statistics Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
          >
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="glass-card rounded-2xl p-8 flex flex-col items-start border border-white/5 shadow-glass glass-card-hover"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-6 flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <Counter targetValue={stat.target} suffix={stat.suffix} />
                </div>
                <h3 className="text-base font-orbitron font-bold text-white uppercase tracking-wider mb-2">
                  {stat.label}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">
                  {stat.desc}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
