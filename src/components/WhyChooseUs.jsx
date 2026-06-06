import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, Banknote, Timer, ShieldAlert, BadgeCheck, Wrench } from 'lucide-react';

export default function WhyChooseUs() {
  const differentiators = [
    {
      title: "Genuine Products",
      icon: <ShieldCheck size={24} className="text-accent-orange" />,
      desc: "Every single tyre we install is sourced directly from manufacturers, complete with original product codes and brand-registered warranties."
    },
    {
      title: "Certified Technicians",
      icon: <UserCheck size={24} className="text-accent-orange" />,
      desc: "Our automotive engineering staff are trained and certified directly by tyre manufacturing partners in advanced diagnostic machinery operations."
    },
    {
      title: "Competitive Pricing",
      icon: <Banknote size={24} className="text-accent-orange" />,
      desc: "Get authorized dealership rates and exclusive seasonal manufacturer cashbacks, ensuring the best value for premium tyre brands."
    },
    {
      title: "Quick Service",
      icon: <Timer size={24} className="text-accent-orange" />,
      desc: "We respect your time. Standard wheel alignments, balancing, and tyre fittings are typically completed within 30-45 minutes."
    },
    {
      title: "Warranty Support",
      icon: <BadgeCheck size={24} className="text-accent-orange" />,
      desc: "Enjoy seamless claim processing directly at our service center. We help log manufacturer warranty issues instantly."
    },
    {
      title: "Trusted Brands",
      icon: <Wrench size={24} className="text-accent-orange" />,
      desc: "We house over 15+ globally recognized brands. We are authorized dealer for MRF, CEAT, Michelin, Yokohama, and Bridgestone."
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-dark-950 bg-grid relative overflow-hidden">
      
      {/* Glow effects */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-accent-orange/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-accent-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-orbitron font-bold tracking-widest text-accent-orange uppercase mb-3">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-black text-white uppercase tracking-wide">
            the vvlp <span className="text-transparent bg-clip-text bg-gradient-orange-red text-glow-orange">standard of care</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-orange-red rounded-full mt-4 mb-6" />
          <p className="text-gray-400 font-sans text-sm sm:text-base max-w-xl">
            We hold ourselves to the highest benchmarks of diagnostic precision, product authenticity, and customer support.
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.map((diff, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              key={idx}
              className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col items-start glass-card-hover"
            >
              {/* Icon */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-6 flex items-center justify-center">
                {diff.icon}
              </div>

              <h3 className="text-lg font-orbitron font-bold text-white uppercase tracking-wider mb-3">
                {diff.title}
              </h3>
              
              <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed">
                {diff.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
