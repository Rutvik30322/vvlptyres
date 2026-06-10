import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Search, Calculator, Check, ShoppingBag, Info, PhoneCall, Download, Printer, ChevronLeft, ChevronRight, X, Eye, ListFilter } from 'lucide-react';
import BrandLogo from '../components/BrandLogo';

// Glob-import all tyre and alloy images dynamically
const tyreImages = import.meta.glob('../assets/Tyres Size/**/*.{png,jpg,jpeg,webp,jfif}', { eager: true, import: 'default' });
const alloyImages = import.meta.glob('../assets/Alloys/**/*.{png,jpg,jpeg,webp,jfif}', { eager: true, import: 'default' });

// Dynamic mapping helpers
const getTyreImages = (brand, type, fallbackImages = []) => {
  let brandFolderName = brand.toUpperCase();
  if (brandFolderName === 'JK_TYRE') brandFolderName = 'JK';
  
  // Use a regex/case-insensitive match to make finding folders highly robust
  const folderPart = `${brandFolderName} ${type} TYRES`.replace(/\s+/g, ' ').toUpperCase();
  
  const matched = Object.keys(tyreImages)
    .filter(key => {
      const normalizedKey = key.toUpperCase().replace(/\s+/g, ' ');
      return normalizedKey.includes(folderPart);
    })
    .sort((a, b) => {
      // Natural sort by numeric suffix in filename
      const aName = a.split('/').pop();
      const bName = b.split('/').pop();
      const numA = parseInt(aName.match(/\d+/)?.[0] || 0, 10);
      const numB = parseInt(bName.match(/\d+/)?.[0] || 0, 10);
      return numA - numB;
    })
    .map(key => tyreImages[key]);
    
  return matched;
};

const getAlloyImages = (brand, fallbackImages = []) => {
  let folderName = "";
  if (brand === 'neo') folderName = 'NEO';
  else if (brand === 'uno_minda') folderName = 'UNO MINDA';
  else if (brand === 'taiwan_import') folderName = 'TAIWAN';
  else folderName = brand.toUpperCase();

  const folderPart = `../assets/Alloys/${folderName}/`.toUpperCase();
  const matched = Object.keys(alloyImages)
    .filter(key => key.toUpperCase().includes(folderPart))
    .sort((a, b) => {
      const aName = a.split('/').pop();
      const bName = b.split('/').pop();
      const numA = parseInt(aName.match(/\d+/)?.[0] || 0, 10);
      const numB = parseInt(bName.match(/\d+/)?.[0] || 0, 10);
      return numA - numB;
    })
    .map(key => alloyImages[key]);

  return matched;
};

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
  const [calcVariantType, setCalcVariantType] = useState('car');
  const [calcSize, setCalcSize] = useState('R13 (13 Inch)');
  const [calcQty, setCalcQty] = useState(4);
  const [deliveryType, setDeliveryType] = useState('normal'); 
  const [includeAlignment, setIncludeAlignment] = useState(true);
  const [includeBalancing, setIncludeBalancing] = useState(true);
  const [includeNitrogen, setIncludeNitrogen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [logoBase64, setLogoBase64] = useState('');

  // Active indices for variant and size in the detail modal
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);


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
      rating: 5.0,
      variants: [
        {
          type: "car",
          typeName: "Car Tyre",
          modelName: "Pilot Sport 5",
          badge: "Ultra Performance",
          desc: "Premium sports tyre designed for high steering responsiveness, excellent dry grip, and high wet-braking safety.",
          specs: [
            { label: "Rim Diameter", value: "17\" - 21\"" },
            { label: "Speed Rating", value: "Y (Up to 300 km/h)" },
            { label: "Grip Class", value: "Wet Grip A / Dry A" },
            { label: "Treadwear (UTQG)", value: "340 AA A" }
          ],
          images: getTyreImages("michelin", "car", ["/images/tyre_installation.png"]),
          sizes: [
            { size: "R17 (17 Inch)", base: 10500, bulk: 9900 },
            { size: "R18 (18 Inch)", base: 12000, bulk: 11500 },
            { size: "R20 (20 Inch)", base: 19000, bulk: 18200 }
          ]
        },
        {
          type: "bike",
          typeName: "Bike Tyre",
          modelName: "Pilot Road 6",
          badge: "Sport Touring Motorcycle",
          desc: "The reference sport touring tyre for motorcycles. Outstanding wet grip and longevity with dual-compound technology.",
          specs: [
            { label: "Rim Diameter", value: "17\" Radial" },
            { label: "Speed Rating", value: "W (Up to 270 km/h)" },
            { label: "Technology", value: "2CT+ Dual Compound" },
            { label: "Wet Traction", value: "Water Evergrip Sipes" }
          ],
          images: getTyreImages("michelin", "bike", ["/images/tyre_installation.png"]),
          sizes: [
            { size: "17 Inch Front", base: 6800, bulk: 6500 },
            { size: "17 Inch Rear 150", base: 7500, bulk: 7200 },
            { size: "17 Inch Rear 160", base: 8200, bulk: 7850 }
          ]
        }
      ]
    },
    {
      id: "bridgestone",
      name: "Bridgestone",
      rating: 4.9,
      variants: [
        {
          type: "car",
          typeName: "Car Tyre",
          modelName: "Turanza T005",
          badge: "Premium Comfort",
          desc: "Flagship touring tyre utilizing nano-selective compounds for low rolling resistance, low road noise, and smooth highway comfort.",
          specs: [
            { label: "Rim Diameter", value: "15\" - 19\"" },
            { label: "Speed Rating", value: "V / W" },
            { label: "Road Noise", value: "69 dB (Ultra Silent)" },
            { label: "Fuel Efficiency", value: "Grade B (Eco)" }
          ],
          images: getTyreImages("bridgestone", "car", [
            "/images/tyre_bridgestone_turanza.png",
            "/images/wheel_alignment.png",
            "/images/customer_vehicles.png"
          ]),
          sizes: [
            { size: "15 Inch", base: 6500, bulk: 6200 },
            { size: "16 Inch", base: 7800, bulk: 7450 },
            { size: "17 Inch", base: 9200, bulk: 8800 },
            { size: "18 Inch", base: 11500, bulk: 11000 }
          ]
        },
        {
          type: "bike",
          typeName: "Bike Tyre",
          modelName: "Battlax Hypersport S22",
          badge: "Hypersport Motorcycle",
          desc: "Premium motorcycle tyres utilizing multi-compound technology for high cornering grip and track-day handling performance.",
          specs: [
            { label: "Rim Diameter", value: "17\" Radial" },
            { label: "Speed Rating", value: "W / Y (Superbike)" },
            { label: "Rear Compound", value: "5-Layer (5LC) Silica" },
            { label: "Stability", value: "Mono-Spiral Belt (MS-Belt)" }
          ],
          images: getTyreImages("bridgestone", "bike", [
            "/images/tyre_bridgestone_bike.png",
            "/images/wheel_alignment.png",
            "/images/customer_vehicles.png"
          ]),
          sizes: [
            { size: "17 Inch Front", base: 7500, bulk: 7100 },
            { size: "17 Inch Rear", base: 9800, bulk: 9350 }
          ]
        }
      ]
    },
    {
      id: "mrf",
      name: "MRF",
      rating: 4.8,
      variants: [
        {
          type: "car",
          typeName: "Car Tyre",
          modelName: "Perfinza CLUX",
          badge: "Premium Comfort",
          desc: "Luxury silica-infused tyres custom-tuned for high-speed tracking stability, vibration absorption, and premium road feedback.",
          specs: [
            { label: "Rim Diameter", value: "15\" - 18\"" },
            { label: "Speed Rating", value: "H / V" },
            { label: "Compound", value: "Silica-Rich Rubber" },
            { label: "Side Strength", value: "Reinforced Bead" }
          ],
          images: getTyreImages("mrf", "car", ["/images/tyre_installation.png"]),
          sizes: [
            { size: "R12 (12 Inch)", base: 4800, bulk: 4550 },
            { size: "R14 (14 Inch)", base: 6300, bulk: 6000 },
            { size: "R16 (16 Inch)", base: 7500, bulk: 7150 },
            { size: "R17 (17 Inch)", base: 8800, bulk: 8400 },
            { size: "R18 (18 Inch)", base: 10500, bulk: 10000 },
            { size: "R20 (20 Inch)", base: 13500, bulk: 12900 },
            { size: "R24 (24 Inch)", base: 17500, bulk: 16800 }
          ]
        },
        {
          type: "bike",
          typeName: "Bike Tyre",
          modelName: "Zapper FY / Mogrip",
          badge: "High-Grip Two-Wheeler",
          desc: "Specially designed tread patterns with wide block patterns to handle dirt, gravel, and urban streets with long-lasting life.",
          specs: [
            { label: "Rim Diameter", value: "17\" - 18\"" },
            { label: "Rear Profile", value: "Tubeless Sporty Pattern" },
            { label: "Compound", value: "Tough Compound Rubber" },
            { label: "Bead type", value: "High-Tensile Wire Bead" }
          ],
          images: getTyreImages("mrf", "bike", ["/images/tyre_installation.png"]),
          sizes: [
            { size: "17 Inch Variant 1", base: 2200, bulk: 2050 },
            { size: "17 Inch Variant 2", base: 2400, bulk: 2250 },
            { size: "17 Inch Variant 3", base: 2600, bulk: 2450 },
            { size: "17 Inch Variant 4", base: 2800, bulk: 2650 },
            { size: "17 Inch Variant 5", base: 2900, bulk: 2750 },
            { size: "17 Inch Variant 6", base: 3000, bulk: 2850 },
            { size: "R17 Sport Radial", base: 3100, bulk: 2950 },
            { size: "R18 Sport Radial", base: 3400, bulk: 3250 },
            { size: "R19 Sport Radial", base: 3800, bulk: 3600 }
          ]
        }
      ]
    },
    {
      id: "apollo",
      name: "Apollo",
      rating: 4.7,
      variants: [
        {
          type: "car",
          typeName: "Car Tyre",
          modelName: "Altrust SUV Radial",
          badge: "Heavy Duty SUV",
          desc: "Heavy-duty reinforced tyres built to withstand high load demands, rough roads, and high heat conditions on Indian highways.",
          specs: [
            { label: "Rim Diameter", value: "15\" - 17\"" },
            { label: "Speed Rating", value: "T / H" },
            { label: "Load Index", value: "102 (Extra Load XL)" },
            { label: "Warranty", value: "5-Year Manufacturer" }
          ],
          images: getTyreImages("apollo", "car", ["/images/tyre_installation.png"]),
          sizes: [
            { size: "R13 (13 Inch)", base: 5200, bulk: 4950 },
            { size: "R15 (15 Inch)", base: 6500, bulk: 6200 },
            { size: "R16 (16 Inch)", base: 7400, bulk: 7100 },
            { size: "R17 (17 Inch)", base: 8600, bulk: 8300 },
            { size: "R18 (18 Inch)", base: 9800, bulk: 9400 },
            { size: "R20 (20 Inch)", base: 11500, bulk: 11000 },
            { size: "R24 (24 Inch)", base: 15500, bulk: 14800 }
          ]
        },
        {
          type: "bike",
          typeName: "Bike Tyre",
          modelName: "Alpha H1 Radial",
          badge: "W-Rated Radial Motorcycle",
          desc: "India's first steel-belted radial motorcycle tyre offering superior cornering grip, short stopping distance, and high tracking stability.",
          specs: [
            { label: "Rim Diameter", value: "17\" Sport Radial" },
            { label: "Speed Rating", value: "W (Up to 270 km/h)" },
            { label: "Belt", value: "0-Degree Steel Belt" },
            { label: "Profile", value: "Dual Compound Sporty" }
          ],
          images: getTyreImages("apollo", "bike", ["/images/tyre_installation.png"]),
          sizes: [
            { size: "17 Inch Front", base: 4200, bulk: 3950 },
            { size: "17 Inch Rear 140", base: 5000, bulk: 4750 },
            { size: "17 Inch Rear 160", base: 5800, bulk: 5500 },
            { size: "18 Inch Rear", base: 6500, bulk: 6200 }
          ]
        }
      ]
    },
    {
      id: "firestone",
      name: "Firestone",
      rating: 4.6,
      variants: [
        {
          type: "car",
          typeName: "Car Tyre",
          modelName: "Destination A/T 2",
          badge: "All-Terrain 4x4",
          desc: "Aggressive tread blocks coupled with dynamic stone ejectors. Engineered to perform reliably in deep gravel, mud, and sand terrains.",
          specs: [
            { label: "Rim Diameter", value: "15\" - 20\"" },
            { label: "Tread Pattern", value: "Self-Cleaning Offroad" },
            { label: "Sidewall Ply", value: "3-Ply Polyester" },
            { label: "Seasonality", value: "All-Weather M+S" }
          ],
          images: getTyreImages("firestone", "car", [
            "/images/tyre_firestone_car.png",
            "/images/tyre_installation.png",
            "/images/customer_vehicles.png"
          ]),
          sizes: [
            { size: "15 Inch", base: 6300, bulk: 6000 },
            { size: "16 Inch", base: 7600, bulk: 7300 },
            { size: "17 Inch", base: 8900, bulk: 8550 },
            { size: "18 Inch", base: 11200, bulk: 10800 }
          ]
        }
      ]
    },
    {
      id: "continental",
      name: "Continental",
      rating: 4.9,
      variants: [
        {
          type: "car",
          typeName: "Car Tyre",
          modelName: "MaxContact MC6",
          badge: "Sport Performance",
          desc: "Dedicated German engineering featuring solid stabilizer blocks and sticky silica compound to maximize cornering response.",
          specs: [
            { label: "Rim Diameter", value: "16\" - 20\"" },
            { label: "Speed Rating", value: "W / Y" },
            { label: "Braking Distance", value: "Short-Stopping Compound" },
            { label: "Noise Rating", value: "Acoustic Noise-Barriers" }
          ],
          images: getTyreImages("continental", "car", ["/images/tyre_installation.png"]),
          sizes: [
            { size: "R12 (12 Inch)", base: 5500, bulk: 5200 },
            { size: "R14 (14 Inch)", base: 7400, bulk: 7100 },
            { size: "R16 (16 Inch)", base: 8800, bulk: 8400 },
            { size: "R17 (17 Inch)", base: 9500, bulk: 9100 },
            { size: "R20 (20 Inch)", base: 14000, bulk: 13400 },
            { size: "R24 (24 Inch)", base: 18500, bulk: 17800 }
          ]
        },
        {
          type: "bike",
          typeName: "Bike Tyre",
          modelName: "ContiRoadAttack 4",
          badge: "Hyper-Touring Motorcycle",
          desc: "Premium sport touring motorcycle tyre utilizing TractionSkin raw compound and multi-grip design for safety in wet/dry curves.",
          specs: [
            { label: "Rim Diameter", value: "17\" Motorcycle" },
            { label: "Speed Rating", value: "W (Up to 270 km/h)" },
            { label: "Tread Tech", value: "RainGrip Compound" },
            { label: "Manufacture", value: "Handmade in Germany" }
          ],
          images: getTyreImages("continental", "bike", ["/images/tyre_installation.png"]),
          sizes: [
            { size: "17 Inch Front (100/90)", base: 6800, bulk: 6500 },
            { size: "17 Inch Front (110/80)", base: 7200, bulk: 6900 },
            { size: "17 Inch Rear 140", base: 8200, bulk: 7800 },
            { size: "17 Inch Rear 150", base: 9200, bulk: 8800 },
            { size: "17 Inch Rear 160", base: 10500, bulk: 10000 },
            { size: "17 Inch Rear 180", base: 11800, bulk: 11200 }
          ]
        }
      ]
    },
    {
      id: "yokohama",
      name: "Yokohama",
      rating: 4.8,
      variants: [
        {
          type: "car",
          typeName: "Car Tyre",
          modelName: "Geolandar A/T G015",
          badge: "Rugged SUV Offroad",
          desc: "High flotation radial with orange-oil compounds, offering severe snow certification and high durability on jagged rock paths.",
          specs: [
            { label: "Rim Diameter", value: "15\" - 22\"" },
            { label: "Compound", value: "Enduro Orange-Oil" },
            { label: "Groove Depth", value: "12.5/32\" Deep" },
            { label: "Sidewall Armor", value: "Aggressive Block Guard" }
          ],
          images: getTyreImages("yokohama", "car", ["/images/tyre_installation.png"]),
          sizes: [
            { size: "R14 (14 Inch)", base: 6200, bulk: 5900 },
            { size: "R15 (15 Inch)", base: 7200, bulk: 6850 },
            { size: "R16 (16 Inch)", base: 8200, bulk: 7850 },
            { size: "R17 (17 Inch)", base: 9900, bulk: 9450 },
            { size: "R18 (18 Inch)", base: 12500, bulk: 11950 },
            { size: "R20 (20 Inch)", base: 15800, bulk: 15100 },
            { size: "R24 (24 Inch)", base: 20500, bulk: 19600 }
          ]
        }
      ]
    },
    {
      id: "jk_tyre",
      name: "JK Tyre",
      rating: 4.6,
      variants: [
        {
          type: "car",
          typeName: "Car Tyre",
          modelName: "UX Royale Radial",
          badge: "Highway Commute",
          desc: "A stable touring tyre offering long life and low rolling resistance. Optimized pattern blocks deliver balanced braking in rains.",
          specs: [
            { label: "Rim Diameter", value: "13\" - 16\"" },
            { label: "Speed Rating", value: "T / H" },
            { label: "Mileage rating", value: "80,000 km target" },
            { label: "Warranty", value: "3-Year Unconditional" }
          ],
          images: getTyreImages("jk", "car", ["/images/tyre_installation.png"]),
          sizes: [
            { size: "R12 (12 Inch)", base: 3400, bulk: 3200 },
            { size: "R14 (14 Inch)", base: 4200, bulk: 3950 },
            { size: "R16 (16 Inch)", base: 6415, bulk: 6215 },
            { size: "R18 (18 Inch)", base: 7600, bulk: 7350 },
            { size: "R20 (20 Inch)", base: 9800, bulk: 9400 },
            { size: "R24 (24 Inch)", base: 13500, bulk: 12900 }
          ]
        },
        {
          type: "bike",
          typeName: "Bike Tyre",
          modelName: "Blaze Rydr",
          badge: "Two-Wheeler Commute",
          desc: "Motorcycle radial engineered with special tread compounds for high directional stability, superior braking, and wet-traction security.",
          specs: [
            { label: "Rim Diameter", value: "17\" Motorcycle" },
            { label: "Thread Structure", value: "Stiff Center Rib" },
            { label: "Load Capacity", value: "Reinforced Sidewall" },
            { label: "Safety", value: "Enhanced Cornering Grooves" }
          ],
          images: getTyreImages("jk", "bike", ["/images/tyre_installation.png"]),
          sizes: [
            { size: "17 Inch Front", base: 1800, bulk: 1700 },
            { size: "17 Inch Rear 90/90", base: 2000, bulk: 1890 },
            { size: "17 Inch Rear 100/90", base: 2200, bulk: 2050 },
            { size: "17 Inch Rear 110/80", base: 2400, bulk: 2250 },
            { size: "17 Inch Rear 120/70", base: 2600, bulk: 2450 },
            { size: "18 Inch Rear", base: 2900, bulk: 2750 }
          ]
        }
      ]
    },
    {
      id: "ceat",
      name: "CEAT",
      rating: 4.7,
      variants: [
        {
          type: "car",
          typeName: "Car Tyre",
          modelName: "SecuraDrive radial",
          badge: "Comfort Touring",
          desc: "High directional stability radial designed to reduce rolling resistance and absorb micro-impacts from potholes.",
          specs: [
            { label: "Rim Diameter", value: "14\" - 17\"" },
            { label: "Speed Rating", value: "H / V" },
            { label: "Pitch Tuning", value: "Variable Noise Pitch" },
            { label: "Warranty", value: "5-Year Manufacturer" }
          ],
          images: getTyreImages("ceat", "car", ["/images/tyre_installation.png"]),
          sizes: [
            { size: "R12 (12 Inch)", base: 3800, bulk: 3600 },
            { size: "R14 Standard", base: 4300, bulk: 4050 },
            { size: "R14 Premium", base: 4800, bulk: 4550 },
            { size: "R16 Standard", base: 5900, bulk: 5600 },
            { size: "R16 Premium", base: 7100, bulk: 6750 },
            { size: "R17 (17 Inch)", base: 8500, bulk: 8100 },
            { size: "R18 (18 Inch)", base: 10200, bulk: 9750 },
            { size: "R20 (20 Inch)", base: 13000, bulk: 12400 },
            { size: "R24 (24 Inch)", base: 17000, bulk: 16200 }
          ]
        },
        {
          type: "bike",
          typeName: "Bike Tyre",
          modelName: "Zoom Rad X1",
          badge: "Premium Radial Bike",
          desc: "Specially formulated polymer compound providing high grip at high speed and excellent tracking on twisty mountain passes.",
          specs: [
            { label: "Rim Diameter", value: "17\" Motorcycle" },
            { label: "Lean Angle", value: "Sport Compound Construction" },
            { label: "Safety", value: "Optimum Aqua Control" },
            { label: "Durability", value: "Radial Steel-Belted Plies" }
          ],
          images: getTyreImages("ceat", "bike", ["/images/tyre_installation.png"]),
          sizes: [
            { size: "17 Inch Front", base: 2600, bulk: 2450 },
            { size: "17 Inch Rear 90/90", base: 2800, bulk: 2650 },
            { size: "17 Inch Rear 100/90", base: 3000, bulk: 2850 },
            { size: "17 Inch Rear 110/80", base: 3200, bulk: 3050 },
            { size: "17 Inch Rear 120/70", base: 3500, bulk: 3300 },
            { size: "17 Inch Rear 140/60", base: 3800, bulk: 3550 }
          ]
        }
      ]
    },
    {
      id: "tvs",
      name: "TVS Eurogrip",
      rating: 4.5,
      variants: [
        {
          type: "bike",
          typeName: "Bike Tyre",
          modelName: "Protorq Extreme",
          badge: "Two-Wheeler Sport",
          desc: "W-rated steel belted radial for performance motorcycles, delivering maximum lean angles and cornering footprint.",
          specs: [
            { label: "Rim Diameter", value: "17\" Radial" },
            { label: "Belt type", value: "Zero-Degree Steel Belt" },
            { label: "Rear Profile", value: "150/60 ZR17 Sport" },
            { label: "Lean Rating", value: "Track Grip Compound" }
          ],
          images: getTyreImages("tvs", "bike", ["/images/tyre_installation.png"]),
          sizes: [
            { size: "17 Inch Front", base: 3900, bulk: 3650 },
            { size: "17 Inch Rear 100/90", base: 4200, bulk: 3950 },
            { size: "17 Inch Rear 110/80", base: 4600, bulk: 4350 },
            { size: "17 Inch Rear 120/70", base: 5200, bulk: 4900 },
            { size: "17 Inch Rear 130/70", base: 5600, bulk: 5300 },
            { size: "17 Inch Rear 150/60", base: 5900, bulk: 5550 }
          ]
        },
        {
          type: "car",
          typeName: "Car Tyre",
          modelName: "Durapro Radial",
          badge: "Durable Commute",
          desc: "Specially reinforced high-mileage car tyre built for rough city roads, daily taxi/commuter services, and long tread life.",
          specs: [
            { label: "Rim Diameter", value: "13\" - 15\"" },
            { label: "Pitch Type", value: "Low-Noise Optimized Pitch" },
            { label: "Construction", value: "Multi-Ply Polyester Cords" },
            { label: "Wet Grip", value: "Deep Channel Grooves" }
          ],
          images: getTyreImages("tvs", "car", [
            "/images/tyre_tvs_car.png",
            "/images/tyre_installation.png",
            "/images/customer_vehicles.png"
          ]),
          sizes: [
            { size: "13 Inch", base: 3200, bulk: 3000 },
            { size: "14 Inch", base: 3900, bulk: 3650 },
            { size: "15 Inch", base: 5100, bulk: 4800 }
          ]
        }
      ]
    },
    {
      id: "bkt",
      name: "BKT",
      rating: 4.8,
      variants: [
        {
          type: "tractor_rear",
          typeName: "Tractor Rear",
          modelName: "Agrimax Tractor Lug",
          badge: "Agricultural Heavy Rear",
          desc: "Premium tractor radial. Deep self-cleaning lugs deliver maximum drawbar traction and soil flotation in wet farm fields.",
          specs: [
            { label: "Rim Diameter", value: "24\" - 42\"" },
            { label: "Lug Category", value: "R-1 Deep Flotation" },
            { label: "Carcass type", value: "Steel Reinforced Bias" },
            { label: "Traction Level", value: "High Draft Efficiency" }
          ],
          images: getTyreImages("bkt", "tractor_rear", [
            "/images/tyre_bkt_agrimax.png",
            "/images/tyre_installation.png",
            "/images/customer_vehicles.png"
          ]),
          sizes: [
            { size: "28 Inch", base: 28000, bulk: 27000 },
            { size: "30 Inch", base: 34000, bulk: 32800 },
            { size: "38 Inch", base: 49000, bulk: 47500 }
          ]
        },
        {
          type: "tractor_front",
          typeName: "Tractor Front",
          modelName: "Commander Front",
          badge: "Agricultural Front Steer",
          desc: "Special front steering tractor tyre with strong three-rib tread pattern. Perfect for dry land steering stability and field work.",
          specs: [
            { label: "Rim Diameter", value: "16\" - 20\"" },
            { label: "Rib Design", value: "3-Rib High Flotation" },
            { label: "Sidewall Protection", value: "Stub Stubborn-Rub Guard" },
            { label: "Compound", value: "Cut and Chip Resistant" }
          ],
          images: getTyreImages("bkt", "tractor_front", [
            "/images/tyre_apollo_altrust.png",
            "/images/tyre_installation.png",
            "/images/customer_vehicles.png"
          ]),
          sizes: [
            { size: "16 Inch", base: 4800, bulk: 4500 },
            { size: "19 Inch", base: 6500, bulk: 6200 }
          ]
        },
        {
          type: "bike",
          typeName: "Bike Tyre",
          modelName: "Commander Bike Sport",
          badge: "Heavy Duty Bike",
          desc: "High quality two-wheeler tires designed for optimal performance, stability, and control under heavy road conditions.",
          specs: [
            { label: "Rim Diameter", value: "17\" - 18\"" },
            { label: "Speed Rating", value: "P (Up to 150 km/h)" },
            { label: "Technology", value: "Reinforced Plies" },
            { label: "Wet Traction", value: "Deep Channel Grooves" }
          ],
          images: getTyreImages("bkt", "bike", ["/images/tyre_installation.png"]),
          sizes: [
            { size: "17 Inch Front", base: 2200, bulk: 2000 },
            { size: "17 Inch Rear 90/90", base: 2400, bulk: 2250 },
            { size: "17 Inch Rear 100/90", base: 2600, bulk: 2450 },
            { size: "17 Inch Rear 110/90", base: 2900, bulk: 2750 },
            { size: "18 Inch Rear 120", base: 3200, bulk: 3050 },
            { size: "18 Inch Rear 130", base: 3500, bulk: 3350 }
          ]
        }
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
      images: getAlloyImages("neo", [
        "/images/alloy_neo_carbon.png",
        "/images/service_center.png",
        "/images/customer_vehicles.png"
      ])
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
      images: getAlloyImages("uno_minda", [
        "/images/alloy_minda_chrome.png",
        "/images/service_center.png",
        "/images/customer_vehicles.png"
      ])
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
      images: getAlloyImages("taiwan_import", [
        "/images/alloy_taiwan_deep.png",
        "/images/service_center.png",
        "/images/customer_vehicles.png"
      ])
    },
    {
      id: "momo",
      name: "Momo Alloys",
      modelName: "Momo Stealth Black Sport",
      badge: "Italian Styling",
      desc: "Sleek matte black premium Italian-designed sports rims. Engineered for ultimate structural integrity, featuring a distinctive outer orange pinstripe detailing.",
      rating: 4.8,
      specs: [
        { label: "Available Sizes", value: "15\", 16\", 17\", 18\"" },
        { label: "PCD Pattern", value: "4×100 / 5×114.3" },
        { label: "Material", value: "A356 Flow-Forged Light-Al" },
        { label: "Finish", value: "Satin Matte Black & Orange Line" }
      ],
      images: [
        "/images/alloy_momo.png",
        "/images/service_center.png",
        "/images/customer_vehicles.png"
      ]
    },
    {
      id: "bbs",
      name: "BBS Alloys",
      modelName: "BBS Super RS Classic Mesh",
      badge: "German Racing Grade",
      desc: "High-end multi-piece classic mesh rims featuring gold-plated central hex nuts and a high-mirror deep lip finish, optimized for performance stance.",
      rating: 4.9,
      specs: [
        { label: "Available Sizes", value: "16\", 17\", 18\", 19\"" },
        { label: "PCD Pattern", value: "5×120 / 5×112" },
        { label: "Offset Options", value: "+22 mm to +35 mm" },
        { label: "Construction", value: "Forged 2-Piece Mesh" }
      ],
      images: [
        "/images/alloy_bbs.png",
        "/images/service_center.png",
        "/images/customer_vehicles.png"
      ]
    },
    {
      id: "enkei",
      name: "Enkei Alloys",
      modelName: "Enkei Racing Light Bronze",
      badge: "Japanese Light-Weight",
      desc: "Japanese MAT-technology racing rims finished in signature anodized dark bronze. Extremely light weight to maximize acceleration torque and cooling.",
      rating: 4.8,
      specs: [
        { label: "Available Sizes", value: "15\", 16\", 17\", 18\"" },
        { label: "PCD Pattern", value: "5×114.3 / 5×100" },
        { label: "Weight", value: "6.8kg onwards (Ultra Light)" },
        { label: "Technology", value: "Most Advanced MAT Technology" }
      ],
      images: [
        "/images/alloy_enkei.png",
        "/images/service_center.png",
        "/images/customer_vehicles.png"
      ]
    }
  ];

  const filteredTyresCatalog = tyresCatalog.map(tyre => {
    const validVariants = tyre.variants.map(v => ({
      ...v,
      images: getTyreImages(tyre.id, v.type)
    })).filter(v => v.images.length > 0);
    return {
      ...tyre,
      variants: validVariants
    };
  }).filter(tyre => tyre.variants.length > 0);

  const filteredAlloysCatalog = alloysCatalog.map(alloy => ({
    ...alloy,
    images: getAlloyImages(alloy.id)
  })).filter(alloy => alloy.images.length > 0);

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
  const selectedTyreObject = filteredTyresCatalog.find(t => t.id === calcBrand) || filteredTyresCatalog[0];
  const activeCalcVariant = selectedTyreObject?.variants?.find(v => v.type === calcVariantType) || selectedTyreObject?.variants?.[0];
  const activeCalcSize = activeCalcVariant?.sizes?.find(s => s.size === calcSize) || activeCalcVariant?.sizes?.[0];

  const unitPrice = calcQty >= 4 ? (activeCalcSize?.bulk || activeCalcSize?.base || 0) : (activeCalcSize?.base || 0);
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
      const itemDescription = `${selectedTyreObject?.name || ''} ${activeCalcVariant?.modelName || ''} (${calcSize})`;
      const itemSub = `Premium brand ${activeCalcVariant?.typeName || 'tyre'}`;
      addRow(itemDescription, itemSub, unitPrice, calcQty, subtotal, true);
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

      const pdfName = `VVLP-Quotation-${(selectedTyreObject?.name || 'Tyres').replace(/\s+/g, '-')}-${(activeCalcVariant?.modelName || '').replace(/\s+/g, '-')}.pdf`;
      doc.save(pdfName);
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

  const activeCatalogData = activeCatalog === 'tyres' ? filteredTyresCatalog : filteredAlloysCatalog;
  const filteredCatalogData = activeCatalogData;

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
        {filteredCatalogData.length === 0 ? (
          <div className="text-center py-20 border border-white/5 rounded-2xl bg-dark-900/50 mb-24 max-w-md mx-auto">
            <p className="text-gray-400 font-sans text-sm mb-4">No products found in this catalog.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {filteredCatalogData.map((item, idx) => {
              const isTyre = !!item.variants;
              const primaryVariant = isTyre ? item.variants[0] : item;
              const cardImg = isTyre ? primaryVariant.images[0] : item.images[0];
              const cardModel = isTyre ? primaryVariant.modelName : item.modelName;
              const cardBadge = isTyre ? primaryVariant.badge : item.badge;
              const cardDesc = isTyre ? primaryVariant.desc : item.desc;

              return (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  key={item.id}
                  onClick={() => {
                    setSelectedProduct(item);
                    setCarouselIndex(0);
                    setActiveVariantIndex(0);
                    setSelectedSizeIndex(0);
                  }}
                  className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between glass-card-hover cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent-orange/5 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />
                <div>
                  {/* Product Thumbnail frame */}
                  <div className="w-full h-44 bg-dark-900 border border-white/5 rounded-xl overflow-hidden mb-5 relative flex items-center justify-center p-2 bg-gradient-to-b from-dark-950 to-black">
                    <img
                      src={cardImg}
                      alt={cardModel}
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
                      <span className="text-[11px] text-gray-400 font-mono block mt-1.5">{cardModel}</span>
                      {isTyre && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.variants.map((v) => (
                            <span
                              key={v.type}
                              className="text-[8px] font-orbitron font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/5 border border-white/10 uppercase text-accent-orange"
                            >
                              {v.type === 'car' ? '🚗 Car' : v.type === 'bike' ? '🏍️ Bike' : v.type.includes('tractor') ? '🚜 Tractor' : v.type}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-accent-orange font-orbitron font-bold border border-accent-orange/20 px-2.5 py-0.5 rounded bg-accent-orange/5 select-none shrink-0">
                      {item.rating} ★
                    </span>
                  </div>
                  
                  <span className="text-[9px] font-orbitron font-bold text-accent-red uppercase tracking-wider block mb-3">
                    ✦ {cardBadge}
                  </span>

                  <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6 line-clamp-2">
                    {cardDesc}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-xs font-orbitron font-bold text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors flex items-center gap-1">
                    Explore Details <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[10px] font-mono text-gray-600 uppercase font-semibold">{isTyre ? 'Sizes & Types' : 'Multiple Angles'}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

        {/* Detailed Image Lightbox/Carousel Modal - Responsive Auto-Height layouts to fit all displays */}
        <AnimatePresence>
          {selectedProduct && (() => {
            const isTyre = !!selectedProduct.variants;
            const activeVar = isTyre ? selectedProduct.variants[activeVariantIndex] : selectedProduct;
            const activeImage = activeVar.images && activeVar.images[carouselIndex % activeVar.images.length];
            
            return (
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
                      src={activeImage}
                      alt={`${selectedProduct.name} View`}
                      className="w-full h-full transition-all duration-500 object-contain p-4 md:p-8"
                    />
                    
                    {activeVar.images.length > 1 && (
                      <>
                        {/* Left arrow */}
                        <button
                          onClick={() => handlePrevSlide(activeVar.images.length)}
                          className="absolute left-4 p-2.5 rounded-full bg-dark-950/80 border border-white/5 hover:border-accent-orange text-white transition-colors z-10"
                        >
                          <ChevronLeft size={16} />
                        </button>
     
                        {/* Right arrow */}
                        <button
                          onClick={() => handleNextSlide(activeVar.images.length)}
                          className="absolute right-4 p-2.5 rounded-full bg-dark-950/80 border border-white/5 hover:border-accent-orange text-white transition-colors z-10"
                        >
                          <ChevronRight size={16} />
                        </button>
     
                        {/* Dot Indicators */}
                        <div className="absolute bottom-4 flex flex-wrap justify-center gap-1.5 px-4 max-w-[90%] z-10">
                          {activeVar.images.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCarouselIndex(i)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                carouselIndex === i 
                                  ? 'bg-accent-orange w-5' 
                                  : 'bg-white/30'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
 
                    {/* Angle Label Stamp */}
                    <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-dark-950/75 border border-white/5 text-[9px] font-orbitron text-accent-orange uppercase tracking-widest z-10 select-none">
                      {carouselIndex === 0 ? "Product Closeup" : carouselIndex === 1 ? "Profile View" : carouselIndex === 2 ? "Vehicle Fitment" : `Angle Option ${carouselIndex + 1}`}
                    </div>
                  </div>

                  {/* Right Side: Specifications & Actions */}
                  <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto flex-1 md:max-h-full bg-dark-900 border-t md:border-t-0 md:border-l border-white/5">
                    
                    <div>
                      {/* Header info */}
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-orbitron font-bold text-accent-orange uppercase tracking-widest">
                          {isTyre ? "Tyre Specs" : "Alloy Rim Specs"}
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
                        <span className="text-xs text-gray-500 font-mono block mt-1.5">{activeVar.modelName}</span>
                      </div>

                      {/* Category Switcher Tabs */}
                      {isTyre && selectedProduct.variants.length > 1 && (
                        <div className="flex gap-2 mb-4 bg-dark-950 p-1 rounded-lg border border-white/5">
                          {selectedProduct.variants.map((v, vIdx) => (
                            <button
                              key={v.type}
                              onClick={() => {
                                setActiveVariantIndex(vIdx);
                                setCarouselIndex(0);
                                setSelectedSizeIndex(0);
                              }}
                              className={`flex-1 py-1.5 rounded-md font-orbitron text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                                activeVariantIndex === vIdx
                                  ? 'bg-accent-orange text-white'
                                  : 'text-gray-400 hover:text-white'
                              }`}
                            >
                              {v.type === 'car' ? '🚗 Car' : v.type === 'bike' ? '🏍️ Bike' : '🚜 Tractor'}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Size Selector horizontal buttons */}
                      {isTyre && activeVar.sizes && (
                        <div className="mb-4">
                          <label className="block text-[9px] font-orbitron font-bold text-gray-400 uppercase tracking-widest mb-2">
                            Select Rim Size
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {activeVar.sizes.map((s, sIdx) => (
                              <button
                                key={s.size}
                                onClick={() => {
                                  setSelectedSizeIndex(sIdx);
                                  setCarouselIndex(sIdx);
                                }}
                                className={`px-2.5 py-1.5 rounded border text-[10px] font-mono font-bold transition-all ${
                                  selectedSizeIndex === sIdx
                                    ? 'border-accent-orange bg-accent-orange/10 text-white'
                                    : 'border-white/5 bg-dark-950 text-gray-400 hover:border-white/10'
                                }`}
                              >
                                {s.size}
                              </button>
                            ))}
                          </div>
                          {activeVar.sizes[selectedSizeIndex] && (
                            <span className="text-[10px] text-accent-orange font-mono block mt-2">
                              Rate: ₹{activeVar.sizes[selectedSizeIndex].base} / unit (₹{activeVar.sizes[selectedSizeIndex].bulk} bulk)
                            </span>
                          )}
                        </div>
                      )}
                      
                      <p className="text-xs text-gray-400 leading-relaxed font-sans mb-6">
                        {activeVar.desc}
                      </p>

                      {/* Specs Table */}
                      <div className="border border-white/5 rounded-xl bg-dark-900/50 p-4 space-y-3 mb-6">
                        <span className="text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-widest block mb-1">
                          Technical Specs
                        </span>
                        {activeVar.specs.map((spec) => (
                          <div key={spec.label} className="flex justify-between text-xs font-sans">
                            <span className="text-gray-500 uppercase text-[10px] tracking-wider">{spec.label}</span>
                            <span className="text-white font-semibold">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions Area */}
                    <div className="space-y-3 pt-6 border-t border-white/5">
                      {isTyre ? (
                        <button
                          onClick={() => {
                            setCalcBrand(selectedProduct.id);
                            setCalcVariantType(activeVar.type);
                            if (activeVar.sizes && activeVar.sizes[selectedSizeIndex]) {
                              setCalcSize(activeVar.sizes[selectedSizeIndex].size);
                            }
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
                          href={`https://wa.me/919265344385?text=Hello%20VVLP%20Tyres,%20I'm%20inquiring%20about%20the%20${selectedProduct.name}%20${activeVar.modelName}%20alloy%2520wheels.%20Please%2520verify%2520price.`}
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
            );
          })()}
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
                Get an instant estimate for tyre replacement. Price values and promotional discounts are loaded dynamically for all multi-brand tyres.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6">
              
              {/* Brand Selector Dropdown */}
              <div>
                <label className="block text-[10px] font-orbitron font-bold text-gray-400 uppercase tracking-widest mb-2.5">
                  Select Tyre Brand
                </label>
                <select
                  value={calcBrand}
                  onChange={(e) => {
                    const brandId = e.target.value;
                    setCalcBrand(brandId);
                    const brandObj = filteredTyresCatalog.find(t => t.id === brandId);
                    if (brandObj && brandObj.variants && brandObj.variants.length > 0) {
                      const firstVar = brandObj.variants[0];
                      setCalcVariantType(firstVar.type);
                      if (firstVar.sizes && firstVar.sizes.length > 0) {
                        setCalcSize(firstVar.sizes[0].size);
                      }
                    }
                  }}
                  className="w-full p-3.5 rounded-xl bg-dark-900 border border-white/5 text-white font-orbitron text-xs font-bold uppercase tracking-wider focus:border-accent-orange outline-none cursor-pointer"
                >
                  {filteredTyresCatalog.map((item) => (
                    <option key={item.id} value={item.id} className="bg-dark-950 text-white font-sans font-normal">
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Variant / Category Selector (only if multiple exist for that brand) */}
              {selectedTyreObject?.variants && selectedTyreObject.variants.length > 1 && (
                <div>
                  <label className="block text-[10px] font-orbitron font-bold text-gray-400 uppercase tracking-widest mb-2.5">
                    Tyre Category
                  </label>
                  <div className="flex gap-2">
                    {selectedTyreObject.variants.map((v) => (
                      <button
                        key={v.type}
                        type="button"
                        onClick={() => {
                          setCalcVariantType(v.type);
                          if (v.sizes && v.sizes.length > 0) {
                            setCalcSize(v.sizes[0].size);
                          }
                        }}
                        className={`flex-1 py-3 rounded-lg border font-orbitron text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                          calcVariantType === v.type
                            ? 'border-accent-orange bg-accent-orange/10 text-white shadow-sm'
                            : 'border-white/5 bg-dark-900 text-gray-500 hover:border-white/10'
                        }`}
                      >
                        {v.type === 'car' ? '🚗 Car Tyre' : v.type === 'bike' ? '🏍️ Bike Tyre' : v.type.includes('tractor') ? '🚜 Tractor' : v.type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector Grid with pricing */}
              {activeCalcVariant?.sizes && (
                <div>
                  <label className="block text-[10px] font-orbitron font-bold text-gray-400 uppercase tracking-widest mb-2.5">
                    Select Tyre Size & Price
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {activeCalcVariant.sizes.map((s) => (
                      <button
                        key={s.size}
                        type="button"
                        onClick={() => setCalcSize(s.size)}
                        className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 ${
                          calcSize === s.size
                            ? 'border-accent-orange bg-accent-orange/15 text-white shadow-glow-orange scale-[1.01]'
                            : 'border-white/5 bg-dark-900 text-gray-400 hover:border-white/15'
                        }`}
                      >
                        <span className="text-[10px] font-orbitron font-bold uppercase tracking-wider">{s.size}</span>
                        <span className="text-xs font-mono font-bold text-white mt-1.5">
                          ₹{s.base}
                          <span className="text-[9px] text-gray-500 font-sans font-normal block mt-0.5">
                            Bulk rate: ₹{s.bulk} (qty 4+)
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

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
                  <span className="text-white font-semibold font-orbitron uppercase text-right">
                    {selectedTyreObject?.name || ''} {activeCalcVariant?.modelName || ''}
                  </span>
                </div>

                <div className="flex justify-between text-xs">
                  <span>Size & Type:</span>
                  <span className="text-gray-300 font-mono">
                    {calcSize} | {activeCalcVariant?.typeName || 'Tyre'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Base Rate per Unit:</span>
                  <span className="text-white font-mono">₹{activeCalcSize?.base || 0}</span>
                </div>

                {calcQty >= 4 && activeCalcSize && (
                  <div className="flex justify-between text-green-400 text-xs">
                    <span>Applied Bulk Discount Rate:</span>
                    <span className="font-mono">
                      -₹{(activeCalcSize.base - activeCalcSize.bulk)} / tyre (₹{activeCalcSize.bulk} bulk)
                    </span>
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
                    href={`https://wa.me/919265344385?text=Hello%20VVLP%20Tyres,%20I%20generated%20a%20website%20quote%20for%20${calcQty}%20${selectedTyreObject?.name || ''}%20${activeCalcVariant?.modelName || ''}%20(${calcSize})%20tyres.%20Estimated%20Total:%20INR%20${total}.%20Please%20verify%20stock.`}
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
