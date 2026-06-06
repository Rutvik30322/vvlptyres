import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Search, Calculator, Check, ShoppingBag, Info, PhoneCall, Download, Printer, ChevronLeft, ChevronRight, X, Eye, ListFilter } from 'lucide-react';
import BrandLogo from '../components/BrandLogo';

export default function ProductsPage() {
  // Tab selector state ('tyres' or 'alloys')
  const [activeCatalog, setActiveCatalog] = useState('tyres');
  
  // Product details modal state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Stock Batch Lookup State
  const [searchCode, setSearchCode] = useState('');
  const [lookupResult, setLookupResult] = useState(null);

  // Quote Calculator State
  const [calcBrand, setCalcBrand] = useState('apollo');
  const [calcQty, setCalcQty] = useState(4);
  const [deliveryType, setDeliveryType] = useState('normal'); 
  const [includeAlignment, setIncludeAlignment] = useState(true);
  const [includeBalancing, setIncludeBalancing] = useState(true);
  const [includeNitrogen, setIncludeNitrogen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [logoBase64, setLogoBase64] = useState('');

  useEffect(() => {
    fetch('/images/vvlp_logo.png')
      .then((res) => {
        if (!res.ok) throw new Error("Logo fetch failed");
        return res.blob();
      })
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoBase64(reader.result);
        };
        reader.readAsDataURL(blob);
      })
      .catch((err) => {
        console.error("Failed to load logo image to base64:", err);
      });
  }, []);

  // Expanded Tyres database with multiple images for EVERY brand
  const tyresCatalog = [
    {
      id: "michelin",
      name: "Michelin",
      modelName: "Pilot Sport 5",
      badge: "Ultra Performance",
      desc: "Premium sports tyre designed for high steering responsiveness, excellent dry grip, and high wet-braking safety.",
      rating: 5.0,
      specs: [
        { label: "Rim Diameter", value: "17\" - 21\"" },
        { label: "Speed Rating", value: "Y (Up to 300 km/h)" },
        { label: "Grip Class", value: "Wet Grip A / Dry A" },
        { label: "Treadwear (UTQG)", value: "340 AA A" }
      ],
      images: [
        "/images/tyre_michelin_sport.png",
        "/images/tyre_installation.png",
        "/images/customer_vehicles.png"
      ]
    },
    {
      id: "bridgestone",
      name: "Bridgestone",
      modelName: "Turanza T005",
      badge: "Premium Comfort",
      desc: "Flagship touring tyre utilizing nano-selective compounds for low rolling resistance, low road noise, and smooth highway comfort.",
      rating: 4.9,
      specs: [
        { label: "Rim Diameter", value: "15\" - 19\"" },
        { label: "Speed Rating", value: "V / W" },
        { label: "Road Noise", value: "69 dB (Ultra Silent)" },
        { label: "Fuel Efficiency", value: "Grade B (Eco)" }
      ],
      images: [
        "/images/tyre_bridgestone_turanza.png",
        "/images/wheel_alignment.png",
        "/images/customer_vehicles.png"
      ]
    },
    {
      id: "mrf",
      name: "MRF",
      modelName: "Perfinza CLUX",
      badge: "Premium Comfort",
      desc: "Luxury silica-infused tyres custom-tuned for high-speed tracking stability, vibration absorption, and premium road feedback.",
      rating: 4.8,
      specs: [
        { label: "Rim Diameter", value: "15\" - 18\"" },
        { label: "Speed Rating", value: "H / V" },
        { label: "Compound", value: "Silica-Rich Rubber" },
        { label: "Side Strength", value: "Reinforced Bead" }
      ],
      images: [
        "/images/tyre_mrf_perfinza.png",
        "/images/tyre_installation.png",
        "/images/customer_vehicles.png"
      ]
    },
    {
      id: "apollo",
      name: "Apollo",
      modelName: "Altrust SUV Radial",
      badge: "Heavy Duty SUV",
      desc: "Heavy-duty reinforced tyres built to withstand high load demands, rough roads, and high heat conditions on Indian highways.",
      rating: 4.7,
      specs: [
        { label: "Rim Diameter", value: "15\" - 17\"" },
        { label: "Speed Rating", value: "T / H" },
        { label: "Load Index", value: "102 (Extra Load XL)" },
        { label: "Warranty", value: "5-Year Manufacturer" }
      ],
      images: [
        "/images/tyre_apollo_altrust.png",
        "/images/tyre_installation.png",
        "/images/customer_vehicles.png"
      ]
    },
    {
      id: "firestone",
      name: "Firestone",
      modelName: "Destination A/T 2",
      badge: "All-Terrain 4x4",
      desc: "Aggressive tread blocks coupled with dynamic stone ejectors. Engineered to perform reliably in deep gravel, mud, and sand terrains.",
      rating: 4.6,
      specs: [
        { label: "Rim Diameter", value: "15\" - 20\"" },
        { label: "Tread Pattern", value: "Self-Cleaning Offroad" },
        { label: "Sidewall Ply", value: "3-Ply Polyester" },
        { label: "Seasonality", value: "All-Weather M+S" }
      ],
      images: [
        "/images/tyre_bridgestone_turanza.png", 
        "/images/tyre_installation.png",
        "/images/customer_vehicles.png"
      ]
    },
    {
      id: "continental",
      name: "Continental",
      modelName: "MaxContact MC6",
      badge: "Sport Performance",
      desc: "Dedicated German engineering featuring solid stabilizer blocks and sticky silica compound to maximize cornering response.",
      rating: 4.9,
      specs: [
        { label: "Rim Diameter", value: "16\" - 20\"" },
        { label: "Speed Rating", value: "W / Y" },
        { label: "Braking Distance", value: "Short-Stopping Compound" },
        { label: "Noise Rating", value: "Acoustic Noise-Barriers" }
      ],
      images: [
        "/images/tyre_michelin_sport.png",
        "/images/wheel_alignment.png",
        "/images/customer_vehicles.png"
      ]
    },
    {
      id: "yokohama",
      name: "Yokohama",
      modelName: "Geolandar A/T G015",
      badge: "Rugged Offroad",
      desc: "High flotation radial with orange-oil compounds, offering severe snow certification and high durability on jagged rock paths.",
      rating: 4.8,
      specs: [
        { label: "Rim Diameter", value: "15\" - 22\"" },
        { label: "Compound", value: "Enduro Orange-Oil" },
        { label: "Groove Depth", value: "12.5/32\" Deep" },
        { label: "Sidewall Armor", value: "Aggressive Block Guard" }
      ],
      images: [
        "/images/tyre_apollo_altrust.png",
        "/images/tyre_installation.png",
        "/images/customer_vehicles.png"
      ]
    },
    {
      id: "jk_tyre",
      name: "JK Tyre",
      modelName: "UX Royale Radial",
      badge: "Highway Commute",
      desc: "A stable touring tyre offering long life and low rolling resistance. Optimized pattern blocks deliver balanced braking in rains.",
      rating: 4.6,
      specs: [
        { label: "Rim Diameter", value: "13\" - 16\"" },
        { label: "Speed Rating", value: "T / H" },
        { label: "Mileage rating", value: "80,000 km target" },
        { label: "Warranty", value: "3-Year Unconditional" }
      ],
      images: [
        "/images/tyre_mrf_perfinza.png",
        "/images/tyre_installation.png",
        "/images/customer_vehicles.png"
      ]
    },
    {
      id: "ceat",
      name: "CEAT",
      modelName: "SecuraDrive radial",
      badge: "Comfort Touring",
      desc: "High directional stability radial designed to reduce rolling resistance and absorb micro-impacts from potholes.",
      rating: 4.7,
      specs: [
        { label: "Rim Diameter", value: "14\" - 17\"" },
        { label: "Speed Rating", value: "H / V" },
        { label: "Pitch Tuning", value: "Variable Noise Pitch" },
        { label: "Warranty", value: "5-Year Manufacturer" }
      ],
      images: [
        "/images/tyre_bridgestone_turanza.png",
        "/images/wheel_alignment.png",
        "/images/customer_vehicles.png"
      ]
    },
    {
      id: "tvs",
      name: "TVS Eurogrip",
      modelName: "Protorq Extreme",
      badge: "Two-Wheeler Sport",
      desc: "W-rated steel belted radial for performance motorcycles, delivering maximum lean angles and cornering footprint.",
      rating: 4.5,
      specs: [
        { label: "Rim Diameter", value: "17\" Radial" },
        { label: "Belt type", value: "Zero-Degree Steel Belt" },
        { label: "Rear Profile", value: "150/60 ZR17 Sport" },
        { label: "Lean Rating", value: "Track Grip Compound" }
      ],
      images: [
        "/images/tyre_michelin_sport.png",
        "/images/tyre_installation.png",
        "/images/customer_vehicles.png"
      ]
    },
    {
      id: "bkt",
      name: "BKT",
      modelName: "Agrimax Tractor Lug",
      badge: "Agricultural Heavy",
      desc: "Premium tractor radial. Deep self-cleaning lugs deliver maximum drawbar traction and soil flotation in wet farm fields.",
      rating: 4.8,
      specs: [
        { label: "Rim Diameter", value: "24\" - 42\"" },
        { label: "Lug Category", value: "R-1 Deep Flotation" },
        { label: "Carcass type", value: "Steel Reinforced Bias" },
        { label: "Traction Level", value: "High Draft Efficiency" }
      ],
      images: [
        "/images/tyre_apollo_altrust.png",
        "/images/tyre_installation.png",
        "/images/customer_vehicles.png"
      ]
    }
  ];

  // Alloys database with multiple images for Neo, Minda, and Taiwan Imports
  const alloysCatalog = [
    {
      id: "neo",
      name: "Neo Alloys",
      modelName: "Neo Carbon Matrix",
      badge: "ARAI Certified",
      desc: "High-grade aftermarket alloy rims structured with carbon black and diamond cut finishes. Built for high impact-durability.",
      rating: 4.8,
      specs: [
        { label: "Available Sizes", value: "14\", 15\", 16\", 17\"" },
        { label: "PCD Pattern", value: "4×100 / 5×114.3" },
        { label: "Offset (ET)", value: "+38 mm to +42 mm" },
        { label: "Certification", value: "ARAI / JWL Standards" }
      ],
      images: [
        "/images/alloy_neo_carbon.png",
        "/images/service_center.png",
        "/images/customer_vehicles.png"
      ]
    },
    {
      id: "uno_minda",
      name: "Uno Minda Alloys",
      modelName: "Minda Sport Split-5",
      badge: "OEM Grade Quality",
      desc: "Premium split five-spoke gravity cast wheels custom-engineered to improve brake caliper heat dissipation and tracking stability.",
      rating: 4.7,
      specs: [
        { label: "Available Sizes", value: "13\", 14\", 15\", 16\"" },
        { label: "PCD Pattern", value: "4×100 / 4×108" },
        { label: "Material", value: "A356.2 Gravity Cast Al" },
        { label: "Finish", value: "Dark Gunmetal Chrome" }
      ],
      images: [
        "/images/alloy_minda_chrome.png",
        "/images/service_center.png",
        "/images/customer_vehicles.png"
      ]
    },
    {
      id: "taiwan_import",
      name: "Taiwan Import Alloys",
      modelName: "Taiwan Gold Deep Dish Mesh",
      badge: "Premium Custom",
      desc: "Flow-formed deep lip racing style mesh wheels. Customized for sports cars and lowered vehicles requesting maximum stance stance.",
      rating: 4.9,
      specs: [
        { label: "Available Sizes", value: "15\", 16\", 17\", 18\", 20\", 22\"" },
        { label: "Rim Widths", value: "8.5J to 10J Wide" },
        { label: "Offset Options", value: "Staggered Fitment offsets" },
        { label: "Construction", value: "Rotary Flow-Formed" }
      ],
      images: [
        "/images/alloy_taiwan_deep.png",
        "/images/service_center.png",
        "/images/customer_vehicles.png"
      ]
    }
  ];

  // Pricing details from handwritten note
  const pricingRates = {
    apollo: { name: 'Apollo Tyres', base: 6200, bulk: 6000 },
    firestone: { name: 'Firestone Tyres', base: 6300, bulk: 6000 },
    mrf: { name: 'MRF Tyres', base: 6300, bulk: 6000 },
    jk: { name: 'JK Tyre', base: 6415, bulk: 6215 }
  };

  // Batch lookup logic based on handwritten codes
  const handleBatchLookup = (e) => {
    e.preventDefault();
    const cleanCode = searchCode.trim().toUpperCase();
    
    if (cleanCode === 'B1426' || cleanCode === 'B 1426') {
      setLookupResult({
        found: true,
        code: 'B1426',
        details: 'Apollo / Firestone Radial Stock',
        mfgDate: 'Week 14 of 2026 (Fresh Stock)',
        status: 'In Stock (Ready to Install)',
        qtyAvailable: 12
      });
    } else if (cleanCode === 'B0626' || cleanCode === 'B 0626') {
      setLookupResult({
        found: true,
        code: 'B0626',
        details: 'MRF / JK Heavy Duty Radial Stock',
        mfgDate: 'Week 06 of 2026 (Fresh Stock)',
        status: 'In Stock (Ready to Install)',
        qtyAvailable: 8
      });
    } else if (cleanCode === '') {
      setLookupResult(null);
    } else {
      setLookupResult({
        found: false,
        code: cleanCode,
        message: 'No active stock batch found matching this serial. Please contact our Vadodara dealer lines for manual stock check.'
      });
    }
  };

  // Quote calculation logic
  const activeRate = pricingRates[calcBrand];
  const unitPrice = calcQty >= 4 ? activeRate.bulk : activeRate.base;
  const subtotal = unitPrice * calcQty;
  const deliveryCost = deliveryType === 'fast' ? 500 : 0;
  const alignmentCost = includeAlignment ? 800 : 0;
  const balancingCost = includeBalancing ? 600 : 0;
  const nitrogenCost = includeNitrogen ? calcQty * 50 : 0; 
  const total = subtotal + deliveryCost + alignmentCost + balancingCost + nitrogenCost;

  const handleDownloadPDF = () => {
    setIsDownloading(true);

    const buildPDF = (jsPDF) => {
      const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
      const pageW = doc.internal.pageSize.getWidth();
      const margin = 18;
      const contentW = pageW - margin * 2;
      let y = margin;

      // ─── Header: Logo + Company Name ─────────────────────────────────────────
      if (logoBase64) {
        try { doc.addImage(logoBase64, 'PNG', margin, y, 18, 18); } catch(e) {}
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(15, 23, 42);
      doc.text('VVLP', margin + 22, y + 8);
      doc.setFontSize(7);
      doc.setTextColor(234, 88, 12);
      doc.text('TYRES & ALLOY WHEELS', margin + 22, y + 14);

      // Quote title on right
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
      doc.text('Date: ' + dateStr, pageW - margin, y + 8, { align: 'right' });
      doc.setFontSize(7);
      doc.text('Pricing Quotation', pageW - margin, y + 13, { align: 'right' });

      y += 24;

      // ─── Divider ─────────────────────────────────────────────────────────────
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageW - margin, y);
      y += 10;

      // ─── Table Header ────────────────────────────────────────────────────────
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, y, contentW, 9, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text('ITEM DESCRIPTION', margin + 3, y + 6);
      doc.text('UNIT PRICE', margin + contentW * 0.56, y + 6, { align: 'right' });
      doc.text('QTY', margin + contentW * 0.72, y + 6, { align: 'center' });
      doc.text('TOTAL', pageW - margin - 3, y + 6, { align: 'right' });
      y += 9;

      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.3);
      doc.line(margin, y, pageW - margin, y);
      y += 2;

      // ─── Row helper ──────────────────────────────────────────────────────────
      const addRow = (desc, subDesc, unitPr, qty, rowTotal, highlight = false) => {
        const rowH = subDesc ? 13 : 9;
        if (highlight) {
          doc.setFillColor(255, 247, 237);
          doc.rect(margin, y, contentW, rowH, 'F');
        }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(15, 23, 42);
        doc.text(desc, margin + 3, y + 6);
        if (subDesc) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7);
          doc.setTextColor(148, 163, 184);
          doc.text(subDesc, margin + 3, y + 11);
        }
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85);
        doc.text('Rs.' + unitPr.toLocaleString('en-IN'), margin + contentW * 0.56, y + 6, { align: 'right' });
        doc.text(String(qty), margin + contentW * 0.72, y + 6, { align: 'center' });
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(15, 23, 42);
        doc.text('Rs.' + rowTotal.toLocaleString('en-IN'), pageW - margin - 3, y + 6, { align: 'right' });
        y += rowH;
        doc.setDrawColor(241, 245, 249);
        doc.setLineWidth(0.2);
        doc.line(margin, y, pageW - margin, y);
        y += 1;
      };

      // ─── Rows ─────────────────────────────────────────────────────────────────
      addRow(activeRate.name + ' Radial Tyres', 'Premium brand automotive grade tyres', unitPrice, calcQty, subtotal, true);
      if (includeAlignment) addRow('3D Laser Wheel Alignment', '', 800, 1, 800);
      if (includeBalancing) addRow('Computerized Wheel Balancing', '', 600, 1, 600);
      if (includeNitrogen) addRow('Pure Nitrogen Filling', '', 50, calcQty, nitrogenCost);
      if (deliveryCost > 0) addRow('Express Delivery Surcharge', '', 500, 1, 500);

      y += 6;

      // ─── Total Box ───────────────────────────────────────────────────────────
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageW - margin, y);
      y += 8;
      const totalBoxX = pageW - margin - 80;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text('ESTIMATED TOTAL (incl. GST):', totalBoxX, y);
      doc.setFontSize(18);
      doc.setTextColor(15, 23, 42);
      doc.text('Rs.' + total.toLocaleString('en-IN'), pageW - margin, y + 8, { align: 'right' });

      y += 24;

      // ─── Footer ───────────────────────────────────────────────────────────────
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.3);
      doc.line(margin, y, pageW - margin, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(148, 163, 184);
      doc.text('VVLP Tyres & Alloy Wheels  |  Vadiwadi Genda Circle, Vadodara - 390007  |  +91 92653 44385', pageW / 2, y, { align: 'center' });
      doc.text('This is a system-generated pricing estimate. Prices may vary. Valid for 7 days from date of issue.', pageW / 2, y + 5, { align: 'center' });

      doc.save(`VVLP-Quotation-${activeRate.name.replace(/\s+/g, '-')}.pdf`);
      setIsDownloading(false);
    };

    const run = (jsPDF) => {
      try { buildPDF(jsPDF); }
      catch (err) { console.error('PDF generation failed:', err); setIsDownloading(false); }
    };

    if (window.jspdf && window.jspdf.jsPDF) {
      run(window.jspdf.jsPDF);
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      script.onload = () => run(window.jspdf.jsPDF);
      script.onerror = () => { alert('Failed to load PDF engine. Check your internet connection.'); setIsDownloading(false); };
      document.head.appendChild(script);
    }
  };

  // Carousel controls
  const handlePrevSlide = (imagesLength) => {
    setCarouselIndex((prev) => (prev === 0 ? imagesLength - 1 : prev - 1));
  };

  const handleNextSlide = (imagesLength) => {
    setCarouselIndex((prev) => (prev === imagesLength - 1 ? 0 : prev + 1));
  };

  const activeCatalogData = activeCatalog === 'tyres' ? tyresCatalog : alloysCatalog;

  return (
    <div className={`pt-24 min-h-screen bg-dark-950 text-white bg-grid relative overflow-hidden ${selectedProduct ? 'z-50' : ''}`}>
      
      {/* Background glow elements */}
      <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] rounded-full bg-accent-orange/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vw] rounded-full bg-accent-red/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <span className="text-xs font-orbitron font-bold tracking-widest text-accent-orange uppercase mb-3 block animate-pulse">
            VVLP Products Showroom
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-black uppercase tracking-wide">
            showroom <span className="text-transparent bg-clip-text bg-gradient-orange-red text-glow-orange">catalogue</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-orange-red rounded-full mt-4 mb-6 mx-auto" />
          <p className="text-gray-400 font-sans text-sm sm:text-base max-w-2xl mx-auto">
            Authorized multi-brand tyre inventory paired with premium alloy wheels styling. Click on any brand to view detailed products and interactive carousels.
          </p>
        </div>

        {/* Tab Navigation - Fully Responsive without Horizontal Clipping */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-12 border-b border-white/5 pb-8 w-full max-w-md mx-auto px-2">
          <button
            onClick={() => {
              setActiveCatalog('tyres');
              setSelectedProduct(null);
            }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg font-orbitron text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
              activeCatalog === 'tyres'
                ? 'bg-gradient-orange-red border-transparent text-white shadow-glow-orange scale-105'
                : 'border-white/5 bg-dark-900 text-gray-400 hover:border-white/10'
            }`}
          >
            <ShoppingBag size={14} className="shrink-0" />
            <span className="truncate">Tyres Catalogue</span>
          </button>
          <button
            onClick={() => {
              setActiveCatalog('alloys');
              setSelectedProduct(null);
            }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg font-orbitron text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
              activeCatalog === 'alloys'
                ? 'bg-gradient-orange-red border-transparent text-white shadow-glow-orange scale-105'
                : 'border-white/5 bg-dark-900 text-gray-400 hover:border-white/10'
            }`}
          >
            <Zap size={14} className="shrink-0" />
            <span className="truncate">Alloy Wheels</span>
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {activeCatalogData.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              key={item.id}
              onClick={() => {
                setSelectedProduct(item);
                setCarouselIndex(0);
              }}
              className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between glass-card-hover cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-orange/5 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />
              <div>
                {/* Product Thumbnail frame */}
                <div className="w-full h-44 bg-dark-900 border border-white/5 rounded-xl overflow-hidden mb-5 relative flex items-center justify-center p-2 bg-gradient-to-b from-dark-950 to-black">
                  <img
                    src={item.images[0]}
                    alt={item.modelName}
                    className="w-full h-full object-contain opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-dark-950/10 group-hover:bg-transparent transition-colors" />
                  <span className="absolute bottom-3 right-3 text-[9px] font-orbitron font-bold tracking-widest text-accent-orange uppercase bg-dark-950/75 border border-white/5 px-2.5 py-1 rounded flex items-center gap-1">
                    <Eye size={10} /> View Gallery
                  </span>
                </div>

                {/* Card Title & Brand Logo Integration */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-grow">
                    {/* Render brand logo component with hover highlights */}
                    <div className="h-6 flex items-center mb-1 text-gray-400 group-hover:text-white transition-colors">
                      <BrandLogo brandId={item.id} className="h-5 max-w-[130px]" />
                    </div>
                    <span className="text-[11px] text-gray-400 font-mono block mt-1.5">{item.modelName}</span>
                  </div>
                  <span className="text-[10px] text-accent-orange font-orbitron font-bold border border-accent-orange/20 px-2.5 py-0.5 rounded bg-accent-orange/5 select-none shrink-0">
                    {item.rating} ★
                  </span>
                </div>
                
                <span className="text-[9px] font-orbitron font-bold text-accent-red uppercase tracking-wider block mb-3">
                  ✦ {item.badge}
                </span>

                <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6 line-clamp-2">
                  {item.desc}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <span className="text-xs font-orbitron font-bold text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors flex items-center gap-1">
                  Explore Details <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[10px] font-mono text-gray-600 uppercase font-semibold">Multiple Angles</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Image Lightbox/Carousel Modal - Responsive Auto-Height layouts to fit all displays */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="fixed inset-0 bg-dark-950/90 backdrop-blur-sm"
              />

              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="relative w-full max-w-4xl glass-card rounded-2xl border border-white/10 z-10 shadow-glass overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:h-[580px] bg-dark-900"
              >
                {/* Left Side: Generous Responsive Image Carousel */}
                <div className="w-full md:w-1/2 h-[240px] sm:h-[300px] md:h-full shrink-0 relative bg-dark-950 flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedProduct.images[carouselIndex]}
                    alt={`${selectedProduct.name} View`}
                    className={`w-full h-full transition-all duration-500 ${
                      carouselIndex === 2 ? 'object-cover' : 'object-contain p-4 md:p-8'
                    }`}
                  />
                  
                  {/* Left arrow */}
                  <button
                    onClick={() => handlePrevSlide(selectedProduct.images.length)}
                    className="absolute left-4 p-2.5 rounded-full bg-dark-950/80 border border-white/5 hover:border-accent-orange text-white transition-colors z-10"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {/* Right arrow */}
                  <button
                    onClick={() => handleNextSlide(selectedProduct.images.length)}
                    className="absolute right-4 p-2.5 rounded-full bg-dark-950/80 border border-white/5 hover:border-accent-orange text-white transition-colors z-10"
                  >
                    <ChevronRight size={16} />
                  </button>

                  {/* Dot Indicators */}
                  <div className="absolute bottom-4 flex gap-1.5 z-10">
                    {selectedProduct.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCarouselIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          carouselIndex === i 
                            ? 'bg-accent-orange w-6' 
                            : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Angle Label Stamp */}
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-dark-950/75 border border-white/5 text-[9px] font-orbitron text-accent-orange uppercase tracking-widest z-10 select-none">
                    {carouselIndex === 0 ? "Product Closeup" : carouselIndex === 1 ? "Profile View" : "Vehicle Fitment"}
                  </div>
                </div>

                {/* Right Side: Specifications & Actions */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto flex-1 md:max-h-full bg-dark-900 border-t md:border-t-0 md:border-l border-white/5">
                  
                  <div>
                    {/* Header info */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-orbitron font-bold text-accent-orange uppercase tracking-widest">
                        {activeCatalog === 'tyres' ? "Tyre Specs" : "Alloy Rim Specs"}
                      </span>
                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* Logo next to Model Name in details modal */}
                    <div className="mb-4">
                      <div className="h-8 flex items-center mb-1.5 text-accent-orange">
                        <BrandLogo brandId={selectedProduct.id} className="h-6 max-w-[150px]" />
                      </div>
                      <span className="text-xs text-gray-500 font-mono block mt-1.5">{selectedProduct.modelName}</span>
                    </div>
                    
                    <p className="text-xs text-gray-400 leading-relaxed font-sans mb-6">
                      {selectedProduct.desc}
                    </p>

                    {/* Specs Table */}
                    <div className="border border-white/5 rounded-xl bg-dark-900/50 p-4 space-y-3 mb-6">
                      <span className="text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-widest block mb-1">
                        Technical Specs
                      </span>
                      {selectedProduct.specs.map((spec) => (
                        <div key={spec.label} className="flex justify-between text-xs font-sans">
                          <span className="text-gray-500 uppercase text-[10px] tracking-wider">{spec.label}</span>
                          <span className="text-white font-semibold">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="space-y-3 pt-6 border-t border-white/5">
                    {/* If it is one of the handwritten priced tyres, bind it to estimator */}
                    {pricingRates[selectedProduct.id] ? (
                      <button
                        onClick={() => {
                          setCalcBrand(selectedProduct.id);
                          setSelectedProduct(null);
                          const el = document.getElementById('quote-calculator');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full py-3.5 rounded-xl bg-gradient-orange-red text-white font-orbitron font-bold text-xs tracking-wider uppercase shadow-glow-orange hover:shadow-glow-red transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Calculator size={14} className="shrink-0" />
                        <span className="truncate">Load in Quote Estimator</span>
                      </button>
                    ) : (
                      <a
                        href={`https://wa.me/919265344385?text=Hello%20VVLP%20Tyres,%20I'm%20inquiring%20about%20the%20${selectedProduct.name}%20${selectedProduct.modelName}%20options.%20Please%20verify%20price.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 rounded-xl bg-gradient-orange-red text-white font-orbitron font-bold text-xs tracking-wider uppercase shadow-glow-orange hover:shadow-glow-red transition-all duration-300 flex items-center justify-center gap-2 text-center"
                      >
                        <PhoneCall size={14} className="shrink-0" />
                        <span className="truncate">Request Custom Pricing</span>
                      </a>
                    )}
                    
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="w-full py-3 rounded-xl border border-white/10 hover:border-white/20 text-white font-orbitron text-[10px] font-bold tracking-wider uppercase transition-colors"
                    >
                      Return to Catalogue
                    </button>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Section: Batch Code Stock Lookup (image metadata details B1426, B0626) */}
        <div className="glass-card p-8 rounded-2xl border border-white/5 mb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-radial-gradient pointer-events-none" />
          
          <div className="max-w-3xl">
            <span className="text-[10px] font-orbitron font-bold text-accent-orange uppercase tracking-widest block mb-2">
              Instant Inventory Check
            </span>
            <h2 className="text-2xl sm:text-3xl font-orbitron font-black uppercase tracking-wider text-white mb-4">
              Manufacturing Batch Stock Lookup
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm font-sans mb-8">
              Verify manufacturing dates and batch availability directly. Try searching the codes written in our logs: <code className="text-accent-orange font-bold font-mono">B1426</code> or <code className="text-accent-orange font-bold font-mono text-glow-orange">B0626</code>.
            </p>

            <form onSubmit={handleBatchLookup} className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-3.5 text-gray-500" size={18} />
                <input
                  type="text"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  placeholder="Enter Batch Code (e.g. B1426)"
                  className="w-full pl-11 pr-4 py-3.5 rounded-lg form-input text-sm font-semibold tracking-wider font-orbitron placeholder:font-sans placeholder:font-normal"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3.5 rounded-lg bg-white/5 border border-white/10 hover:border-accent-orange/50 hover:bg-accent-orange/10 text-white font-orbitron text-xs font-bold uppercase tracking-wider transition-all duration-300"
              >
                Lookup Stock
              </button>
            </form>

            {/* Lookup results */}
            <AnimatePresence mode="wait">
              {lookupResult && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className={`p-6 rounded-xl border font-sans text-sm ${
                    lookupResult.found 
                      ? 'bg-green-500/5 border-green-500/20 text-gray-300' 
                      : 'bg-accent-red/5 border-accent-red/20 text-gray-300'
                  }`}
                >
                  {lookupResult.found ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-orbitron font-bold text-green-500 uppercase tracking-widest mb-2">Verified Batch Details</h4>
                        <p className="text-base text-white font-orbitron font-black uppercase mb-1">{lookupResult.details}</p>
                        <p className="text-xs text-gray-500">Batch Code Reference: {lookupResult.code}</p>
                      </div>
                      <div className="space-y-1.5 text-xs sm:text-right flex flex-col justify-end">
                        <p><span className="text-gray-500">Production Date:</span> <strong className="text-white">{lookupResult.mfgDate}</strong></p>
                        <p><span className="text-gray-500">Status:</span> <strong className="text-green-400 uppercase font-bold">{lookupResult.status}</strong></p>
                        <p><span className="text-gray-500">Stock Count:</span> <strong className="text-white">{lookupResult.qtyAvailable} Units</strong></p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-xs font-orbitron font-bold text-accent-red uppercase tracking-widest mb-1.5">Batch Code Unrecognized</h4>
                      <p className="text-xs leading-relaxed text-gray-400">{lookupResult.message}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Section: Pricing Estimator (Image 1 quotes) */}
        <div id="quote-calculator" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start scroll-mt-24">
          
          {/* Estimator Configuration */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-orbitron font-bold tracking-widest text-accent-orange uppercase mb-3 block">
                Quote Configurator
              </span>
              <h2 className="text-3xl font-orbitron font-black text-white uppercase tracking-wider">
                Interactive Pricing Estimator
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm font-sans mt-2">
                Get an instant estimate for tyre replacement. Price values and promotional discounts are loaded directly from the dealer notebook.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6">
              
              {/* Brand Selector */}
              <div>
                <label className="block text-[10px] font-orbitron font-bold text-gray-400 uppercase tracking-widest mb-2.5">
                  Select Tyre Model & Brand
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(pricingRates).map((key) => (
                    <button
                      key={key}
                      onClick={() => setCalcBrand(key)}
                      className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 ${
                        calcBrand === key
                          ? 'border-accent-orange bg-accent-orange/10 text-white shadow-glow-orange'
                          : 'border-white/5 bg-dark-900 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      <span className="text-xs font-orbitron font-bold uppercase tracking-wider">{pricingRates[key].name}</span>
                      <span className="text-base font-orbitron font-black text-white mt-2">₹{pricingRates[key].base}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-[10px] font-orbitron font-bold text-gray-400 uppercase tracking-widest mb-2.5">
                  Quantity (Bulk rate applies for 4+ Tyres!)
                </label>
                <div className="flex items-center gap-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setCalcQty(num)}
                      className={`w-12 h-12 rounded-lg font-orbitron font-bold text-sm flex items-center justify-center border transition-all duration-300 ${
                        calcQty === num
                          ? 'bg-gradient-orange-red border-transparent text-white shadow-glow-orange'
                          : 'border-white/5 bg-dark-900 text-gray-400 hover:border-white/10'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Terms */}
              <div>
                <label className="block text-[10px] font-orbitron font-bold text-gray-400 uppercase tracking-widest mb-2.5">
                  Delivery Speed (Notebook Options)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setDeliveryType('normal')}
                    className={`p-3.5 rounded-lg border font-orbitron text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
                      deliveryType === 'normal'
                        ? 'border-accent-orange bg-accent-orange/5 text-white'
                        : 'border-white/5 bg-dark-900 text-gray-500 hover:border-white/10'
                    }`}
                  >
                    Normal (Standard)
                  </button>
                  
                  <button
                    onClick={() => setDeliveryType('fast')}
                    className={`p-3.5 rounded-lg border font-orbitron text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
                      deliveryType === 'fast'
                        ? 'border-accent-orange bg-accent-orange/5 text-white'
                        : 'border-white/5 bg-dark-900 text-gray-500 hover:border-white/10'
                    }`}
                  >
                    Fast (15 Days Max)
                  </button>
                </div>
              </div>

              {/* Optional Shop Services */}
              <div>
                <label className="block text-[10px] font-orbitron font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Add-On Alignment & Balancing Services
                </label>
                <div className="space-y-2.5">
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-dark-900 cursor-pointer hover:bg-dark-800 transition-colors">
                    <input
                      type="checkbox"
                      checked={includeAlignment}
                      onChange={(e) => setIncludeAlignment(e.target.checked)}
                      className="accent-accent-orange w-4 h-4 rounded"
                    />
                    <div className="flex justify-between items-center w-full text-xs font-sans">
                      <span className="text-gray-300">3D Laser Wheel Alignment</span>
                      <span className="text-white font-mono font-bold">+ ₹800</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-dark-900 cursor-pointer hover:bg-dark-800 transition-colors">
                    <input
                      type="checkbox"
                      checked={includeBalancing}
                      onChange={(e) => setIncludeBalancing(e.target.checked)}
                      className="accent-accent-orange w-4 h-4 rounded"
                    />
                    <div className="flex justify-between items-center w-full text-xs font-sans">
                      <span className="text-gray-300">Computerized Wheel Balancing</span>
                      <span className="text-white font-mono font-bold">+ ₹600</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-dark-900 cursor-pointer hover:bg-dark-800 transition-colors">
                    <input
                      type="checkbox"
                      checked={includeNitrogen}
                      onChange={(e) => setIncludeNitrogen(e.target.checked)}
                      className="accent-accent-orange w-4 h-4 rounded"
                    />
                    <div className="flex justify-between items-center w-full text-xs font-sans">
                      <span className="text-gray-300">Pure Nitrogen Filling (₹50/tyre)</span>
                      <span className="text-white font-mono font-bold">+ ₹{calcQty * 50}</span>
                    </div>
                  </label>
                </div>
              </div>

            </div>
          </div>

          {/* Estimator Summary Invoice */}
          <div className="lg:col-span-6">
            <div className="glass-card p-8 rounded-2xl border border-white/5 relative overflow-hidden shadow-glass">
              {/* Decorative stamp */}
              <div className="absolute top-8 right-8 text-[9px] font-mono text-gray-700 border border-gray-800 px-3 py-1 uppercase rounded tracking-widest select-none">
                VVLP EST-2026
              </div>

              <h3 className="text-xl font-orbitron font-black text-white uppercase tracking-wider mb-6 pb-4 border-b border-white/5 flex items-center gap-2">
                <Calculator size={18} className="text-accent-orange" />
                Estimate Summary
              </h3>

              <div className="space-y-4 text-sm font-sans text-gray-400">
                {/* Details Breakdown */}
                <div className="flex justify-between">
                  <span>Product Model Selection:</span>
                  <span className="text-white font-semibold font-orbitron uppercase">{activeRate.name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Base Rate per Unit:</span>
                  <span className="text-white font-mono">₹{activeRate.base}</span>
                </div>

                {calcQty >= 4 && (
                  <div className="flex justify-between text-green-400">
                    <span>Applied Bulk Discount Rate:</span>
                    <span className="font-mono">-₹{activeRate.base - activeRate.bulk} / tyre</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span className="text-white font-bold">{calcQty} Units</span>
                </div>

                <div className="flex justify-between border-t border-white/5 pt-4">
                  <span>Tyres Subtotal:</span>
                  <span className="text-white font-mono font-bold">₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee ({deliveryType === 'fast' ? 'Express 15-Days' : 'Normal'}):</span>
                  <span className="text-white font-mono">₹{deliveryCost}</span>
                </div>

                {/* Add-ons */}
                {(includeAlignment || includeBalancing || includeNitrogen) && (
                  <div className="border-t border-white/5 pt-4 space-y-2">
                    <span className="text-xs text-gray-500 font-orbitron font-bold uppercase tracking-wider block">Add-On Services</span>
                    {includeAlignment && (
                      <div className="flex justify-between text-xs">
                        <span>3D Wheel Alignment:</span>
                        <span className="text-white font-mono">₹800</span>
                      </div>
                    )}
                    {includeBalancing && (
                      <div className="flex justify-between text-xs">
                        <span>Computerized Wheel Balancing:</span>
                        <span className="text-white font-mono">₹600</span>
                      </div>
                    )}
                    {includeNitrogen && (
                      <div className="flex justify-between text-xs">
                        <span>Nitrogen filling (₹50 × {calcQty}):</span>
                        <span className="text-white font-mono">₹{calcQty * 50}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Total Invoice */}
                <div className="border-t border-white/10 pt-6 mt-6 flex justify-between items-baseline">
                  <span className="text-base font-orbitron font-bold text-white uppercase">Estimated Total:</span>
                  <div className="text-right">
                    <span className="text-3xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-orange-red text-glow-orange font-mono">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-gray-500 block mt-1">Inclusive of GST estimation</span>
                  </div>
                </div>

                {/* Information Callout */}
                <div className="p-4 rounded-xl border border-white/5 bg-white/5 text-xs text-gray-400 font-sans leading-relaxed mt-6">
                  Estimate calculations are matching the rates registered at the Vadodara service desk (GSTIN: 24AEUPP9822K1ZP). Bulk discount rates automatically trigger for sets of 4 tyres.
                </div>

                {/* Calculator CTAs */}
                <div className="grid grid-cols-2 gap-2 sm:gap-4 pt-6">
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="px-2 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-white/10 hover:border-accent-orange/50 hover:bg-white/5 disabled:opacity-50 text-white font-orbitron text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2"
                  >
                    {isDownloading ? (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Download size={14} className="shrink-0" />
                    )}
                    <span className="truncate">{isDownloading ? "Downloading..." : "Download Quote"}</span>
                  </button>
                  
                  <a
                    href={`https://wa.me/919265344385?text=Hello%20VVLP%20Tyres,%20I%20generated%20a%20website%20quote%20for%20${calcQty}%20${activeRate.name}%20tyres.%20Estimated%20Total:%20INR%20${total}.%20Please%20verify%20stock.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gradient-orange-red text-white font-orbitron text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-glow-orange hover:shadow-glow-red transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 text-center"
                  >
                    <PhoneCall size={14} className="shrink-0" />
                    <span className="truncate">WhatsApp Order</span>
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Full-screen Loading Overlay during PDF Generation */}
      {isDownloading && (
        <div className="fixed inset-0 bg-dark-950/80 backdrop-blur-md z-[100000] flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-accent-orange border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-white font-orbitron font-bold uppercase tracking-wider text-sm">Generating PDF Quotation...</p>
          <p className="text-gray-400 text-xs mt-2 font-sans">Please wait, compiling rates & logo...</p>
        </div>
      )}
    </div>
  );
}
