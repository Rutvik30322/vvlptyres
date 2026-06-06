import React from 'react';
import BrandLogo from './BrandLogo';

export default function Brands() {
  const brands = [
    { name: 'MRF', tagline: 'Tyres with Muscle' },
    { name: 'CEAT', tagline: 'It\'s Safe. It\'s CEAT.' },
    { name: 'Apollo', tagline: 'Go the Distance' },
    { name: 'JK Tyre', tagline: 'Total Control' },
    { name: 'Bridgestone', tagline: 'Solutions for Your Journey' },
    { name: 'Michelin', tagline: 'A Better Way Forward' },
    { name: 'Yokohama', tagline: 'Technology for Life' },
    { name: 'Continental', tagline: 'The Future in Motion' },
    { name: 'Firestone', tagline: 'Destination Adventure' },
    { name: 'BKT', tagline: 'Growing Together' }
  ];

  // Duplicate list to achieve seamless infinite scroll marquee
  const doubleBrands = [...brands, ...brands];

  return (
    <div className="py-12 bg-dark-950 border-y border-white/5 relative overflow-hidden select-none animate-fade-in">
      {/* Visual fading gradient overlays on left/right for marquee blending */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-dark-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-dark-950 to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-6">
        <h4 className="text-center text-[10px] md:text-xs font-orbitron font-bold tracking-[0.25em] text-gray-500 uppercase">
          Official Partner & Leading Brands Authorized Dealer
        </h4>
      </div>

      <div className="flex overflow-hidden relative">
        <div className="animate-marquee gap-6 py-2">
          {doubleBrands.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="flex flex-col justify-center items-center px-8 py-5 rounded-xl bg-dark-900/50 backdrop-blur-sm border border-white/5 w-52 md:w-60 h-24 hover:border-accent-orange/40 transition-colors duration-300 group"
            >
              {/* Brand logo SVG element styled to match the dark theme */}
              <div className="h-8 md:h-10 max-w-[160px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 text-gray-500 group-hover:text-white transition-colors duration-300">
                <BrandLogo brandId={brand.name} className="h-full max-w-full" />
              </div>
              <span className="text-[9px] text-gray-500 font-sans tracking-wide uppercase mt-2">
                {brand.tagline}
              </span>
              
              {/* Subtle underline hover effect */}
              <div className="w-0 group-hover:w-16 h-[2px] transition-all duration-300 mt-2 rounded-full bg-accent-orange" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
