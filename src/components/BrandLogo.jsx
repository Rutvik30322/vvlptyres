import React from 'react';

/**
 * Procedural Vector SVG Brand Logo component.
 * Allows displaying high-resolution brand logos completely offline without external network dependencies.
 */
export default function BrandLogo({ brandId, className = "h-6" }) {
  const id = brandId.toLowerCase();

  switch (id) {
    case 'michelin':
      return (
        <svg viewBox="0 0 140 35" className={className} fill="currentColor">
          {/* Michelin stylized typography and Bibendum outline */}
          <path d="M5 10c0-2 2-4 4-4h18c2 0 4 2 4 4v15c0 2-2 4-4 4H9c-2 0-4-2-4-4V10z" fill="#0056b3" />
          <path d="M12 14c0-.5.5-1 1-1s1 .5 1 1v5c0 .5-.5 1-1 1s-1-.5-1-1v-5zm4-2c0-.5.5-1 1-1s1 .5 1 1v7c0 .5-.5 1-1 1s-1-.5-1-1v-7zm4 4c0-.5.5-1 1-1s1 .5 1 1v3c0 .5-.5 1-1 1s-1-.5-1-1v-3z" fill="#ffffff" />
          <text x="38" y="25" fontFamily="sans-serif" fontWeight="900" fontSize="15" fill="#ffffff" letterSpacing="0.5">MICHELIN</text>
        </svg>
      );

    case 'bridgestone':
      return (
        <svg viewBox="0 0 160 30" className={className} fill="currentColor">
          {/* Bridgestone keystone B logo and wordmark */}
          <path d="M5 25 L15 5 L28 5 L20 25 Z" fill="#ff0000" />
          <path d="M15 25 L23 7 L32 7 L26 25 Z" fill="#ffffff" opacity="0.8" />
          <text x="38" y="22" fontFamily="sans-serif" fontWeight="900" fontSize="13" fontStyle="italic" fill="#ffffff" letterSpacing="0.5">BRIDGESTONE</text>
        </svg>
      );

    case 'mrf':
      return (
        <svg viewBox="0 0 100 30" className={className} fill="currentColor">
          {/* MRF bold block lettering with muscle slash */}
          <path d="M5 5h12l5 10l5-10h12v20h-8V13l-5 8h-4l-5-8v12H5V5z" fill="#ff0000" />
          <path d="M44 5h16c4 0 6 2 6 5s-2 5-6 5h-8v10h-8V5zm8 7h6c1.5 0 2-.5 2-1.5s-.5-1.5-2-1.5h-6v3z" fill="#ff0000" />
          <path d="M72 5h20v6H80v3h10v5H80v6h-8V5z" fill="#ff0000" />
        </svg>
      );

    case 'apollo':
      return (
        <svg viewBox="0 0 100 30" className={className} fill="currentColor">
          {/* Apollo clean round wordmark */}
          <circle cx="12" cy="15" r="7" fill="none" stroke="#ffffff" strokeWidth="4" />
          <circle cx="28" cy="15" r="7" fill="none" stroke="#ffffff" strokeWidth="4" />
          <text x="40" y="21" fontFamily="sans-serif" fontWeight="700" fontSize="16" fill="#ffffff" letterSpacing="-0.5">apollo</text>
        </svg>
      );

    case 'continental':
      return (
        <svg viewBox="0 0 150 30" className={className} fill="currentColor">
          {/* Continental prancing horse logo and wordmark */}
          <circle cx="15" cy="15" r="11" fill="none" stroke="#ffa500" strokeWidth="2.5" />
          <path d="M11 20 c1-3 3-5 5-5 c1 1 2 2 1 4 c-1 1-2 2-2 3 c2-1 4-1 5-2 c-1 2-3 3-5 4 c2 0 3 0 4-1" fill="#ffa500" />
          <text x="34" y="21" fontFamily="sans-serif" fontWeight="800" fontSize="13" fill="#ffffff" letterSpacing="0.2">Continental</text>
        </svg>
      );

    case 'yokohama':
      return (
        <svg viewBox="0 0 140 30" className={className} fill="currentColor">
          {/* Yokohama stylized stripes Y logo and wordmark */}
          <path d="M5 5h7l6 9l6-9h7l-10 13v7h-6v-7z" fill="#ff0000" />
          <text x="36" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="13" fill="#ffffff" letterSpacing="0.8">YOKOHAMA</text>
        </svg>
      );

    case 'ceat':
      return (
        <svg viewBox="0 0 100 30" className={className} fill="currentColor">
          {/* CEAT geometric blocks */}
          <path d="M5 5h22v6H13v3h12v5H13v5h14v6H5V5zm30 0h6l8 20h-7l-2-5H36l-2 5h-7l8-20zm5 10l-2-6l-2 6h4zm16-10h22v6H68v14h-8V5z" fill="#ffffff" />
          <rect x="76" y="5" width="16" height="6" fill="#ff6600" />
        </svg>
      );

    case 'jk_tyre':
    case 'jk':
      return (
        <svg viewBox="0 0 110 30" className={className} fill="currentColor">
          {/* JK Tyre bold italic logo */}
          <path d="M5 5h7v8l7-8h8l-8 8l9 12h-8l-7-10v10H5V5zm24 0h18v5H36v10h-7V5zm25 0h5l4 8l4-8h5l-6 10v10h-6V15z" fill="#eab308" />
          <text x="65" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="14" fontStyle="italic" fill="#ffffff">TYRE</text>
        </svg>
      );

    case 'firestone':
      return (
        <svg viewBox="0 0 130 30" className={className} fill="currentColor">
          {/* Firestone shield and typography */}
          <path d="M5 15 L15 5 L25 15 L15 25 Z" fill="#ff003c" />
          <text x="8" y="18" fontFamily="sans-serif" fontWeight="900" fontSize="10" fill="#ffffff">F</text>
          <text x="32" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="14" fontStyle="italic" fill="#ffffff">Firestone</text>
        </svg>
      );

    case 'bkt':
      return (
        <svg viewBox="0 0 80 30" className={className} fill="currentColor">
          {/* BKT bold orange square layout */}
          <rect x="5" y="5" width="20" height="20" rx="3" fill="#ff6600" />
          <text x="8" y="19" fontFamily="sans-serif" fontWeight="900" fontSize="12" fill="#ffffff">B</text>
          <text x="30" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="16" fill="#ffffff">K-T</text>
        </svg>
      );

    case 'tvs':
    case 'tvs_eurogrip':
      return (
        <svg viewBox="0 0 140 30" className={className} fill="currentColor">
          {/* TVS bold red logo and horse silhouette */}
          <path d="M5 10 L15 5 L20 15 L12 20 Z" fill="#ff0000" />
          <text x="28" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="14" fill="#ffffff" letterSpacing="0.2">TVS EUROGRIP</text>
        </svg>
      );

    case 'neo':
    case 'neo_alloys':
      return (
        <svg viewBox="0 0 90 30" className={className} fill="currentColor">
          {/* Neo Alloys custom styling */}
          <text x="5" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="18" fill="#ffffff" letterSpacing="2">NEO</text>
          <text x="52" y="21" fontFamily="sans-serif" fontWeight="500" fontSize="10" fill="#ff6600">ALLOYS</text>
        </svg>
      );

    case 'uno_minda':
    case 'minda':
      return (
        <svg viewBox="0 0 130 30" className={className} fill="currentColor">
          {/* Minda corporate logo text */}
          <path d="M5 5 L15 15 L25 5 Z" fill="#005bb7" />
          <text x="30" y="21" fontFamily="sans-serif" fontWeight="800" fontSize="14" fill="#ffffff">UNO MINDA</text>
        </svg>
      );

    default:
      return (
        <span className="font-orbitron font-black text-sm uppercase tracking-wider text-white">
          {brandId}
        </span>
      );
  }
}
