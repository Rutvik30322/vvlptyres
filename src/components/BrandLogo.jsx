import React from 'react';

// Import actual brand logo image assets
import apolloLogo from '../assets/Brand Logos/APOLLO.jpg';
import bktLogo from '../assets/Brand Logos/BKT.png';
import bridgestoneLogo from '../assets/Brand Logos/BRIDGESTONE.png';
import ceatLogo from '../assets/Brand Logos/CEAT.png';
import continentalLogo from '../assets/Brand Logos/CONTINENTAL.png';
import jkLogo from '../assets/Brand Logos/JK.png';
import michelinLogo from '../assets/Brand Logos/MICHELIN.png';
import mrfLogo from '../assets/Brand Logos/MRF.jpg';
import tvsLogo from '../assets/Brand Logos/TVS.png';
import yokohamaLogo from '../assets/Brand Logos/YOKOHAMA.png';

/**
 * Procedural Vector SVG or Real Image Brand Logo component.
 * Allows displaying high-resolution brand logos completely offline without external network dependencies.
 */
export default function BrandLogo({ brandId, className = "h-6" }) {
  const id = brandId.toLowerCase();

  switch (id) {
    case 'michelin':
      return (
        <img src={michelinLogo} alt="Michelin" className={`${className} object-contain inline-block`} />
      );

    case 'bridgestone':
      return (
        <img src={bridgestoneLogo} alt="Bridgestone" className={`${className} object-contain inline-block`} />
      );

    case 'mrf':
      return (
        <img src={mrfLogo} alt="MRF" className={`${className} object-contain inline-block`} />
      );

    case 'apollo':
      return (
        <img src={apolloLogo} alt="Apollo" className={`${className} object-contain inline-block`} />
      );

    case 'continental':
      return (
        <img src={continentalLogo} alt="Continental" className={`${className} object-contain inline-block`} />
      );

    case 'yokohama':
      return (
        <img src={yokohamaLogo} alt="Yokohama" className={`${className} object-contain inline-block`} />
      );

    case 'ceat':
      return (
        <img src={ceatLogo} alt="CEAT" className={`${className} object-contain inline-block`} />
      );

    case 'jk_tyre':
    case 'jk':
    case 'jk tyre':
      return (
        <img src={jkLogo} alt="JK Tyre" className={`${className} object-contain inline-block`} />
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
        <img src={bktLogo} alt="BKT" className={`${className} object-contain inline-block`} />
      );

    case 'tvs':
    case 'tvs_eurogrip':
      return (
        <img src={tvsLogo} alt="TVS Eurogrip" className={`${className} object-contain inline-block`} />
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

    case 'momo':
      return (
        <svg viewBox="0 0 100 30" className={className} fill="currentColor">
          <text x="5" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="20" fontStyle="italic" fill="#ff6600" letterSpacing="1">MOMO</text>
        </svg>
      );

    case 'bbs':
      return (
        <svg viewBox="0 0 100 30" className={className} fill="currentColor">
          <text x="5" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="22" fill="#ff003c" letterSpacing="1">BBS</text>
        </svg>
      );

    case 'enkei':
      return (
        <svg viewBox="0 0 100 30" className={className} fill="currentColor">
          <text x="5" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="18" fill="#ffffff" letterSpacing="2">ENKEI</text>
        </svg>
      );

    case 'taiwan_import':
    case 'taiwan':
      return (
        <svg viewBox="0 0 145 30" className={className} fill="currentColor">
          <text x="5" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="18" fill="#ffffff" letterSpacing="2">TAIWAN</text>
          <text x="92" y="21" fontFamily="sans-serif" fontWeight="500" fontSize="10" fill="#ff6600">ALLOYS</text>
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
