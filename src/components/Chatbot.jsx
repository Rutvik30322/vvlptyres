import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Sparkles, PhoneCall, Calculator, MapPin, Loader2 } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi! Welcome to VVLP Tyres & Alloys Vadodara. How can I help you today?",
      timestamp: new Date(),
      actions: [
        { text: "🚗 Show Tyre Brands", value: "brands" },
        { text: "🔧 Book a Service", value: "book" },
        { text: "💰 Get Pricing Quote", value: "quote" },
        { text: "📍 Vadodara Location", value: "location" }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const messagesEndRef = useRef(null);

  // Auto Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle action click
  const handleActionClick = (value) => {
    // Add user message
    const userMsg = {
      id: messages.length + 1,
      sender: 'user',
      text: getActionLabel(value),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    
    // Simulate typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = getBotResponse(value);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'bot',
        text: botResponse.text,
        timestamp: new Date(),
        actions: botResponse.actions
      }]);
      
      // Execute any direct actions (scrolling or redirects)
      executeDirectAction(value);
    }, 1000);
  };

  // Handle input submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const query = inputValue.trim();
    const userMsg = {
      id: messages.length + 1,
      sender: 'user',
      text: query,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Simulate typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = parseCustomQuery(query);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'bot',
        text: botResponse.text,
        timestamp: new Date(),
        actions: botResponse.actions
      }]);
    }, 1000);
  };

  const getActionLabel = (value) => {
    switch (value) {
      case 'brands': return 'Show Tyre Brands';
      case 'book': return 'Book a Service';
      case 'quote': return 'Get Pricing Quote';
      case 'location': return 'Vadodara Location';
      case 'mrf': return 'Show MRF Tyres';
      case 'ceat': return 'Show CEAT Tyres';
      case 'go_services': return 'Go to Services';
      case 'go_quote': return 'Go to Estimator';
      case 'whatsapp': return 'Chat on WhatsApp';
      case 'call': return 'Call Showroom';
      default: return value;
    }
  };

  const executeDirectAction = (value) => {
    if (value === 'go_services') {
      window.location.hash = '#/services';
      setTimeout(() => {
        const el = document.getElementById('booking-form');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      // Close chatbot window on mobile
      if (window.innerWidth < 640) setIsOpen(false);
    } else if (value === 'go_quote') {
      window.location.hash = '#/products';
      setTimeout(() => {
        const el = document.getElementById('quote-calculator');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      if (window.innerWidth < 640) setIsOpen(false);
    } else if (value === 'whatsapp') {
      window.open('https://wa.me/919265344385?text=Hello%20VVLP%20Tyres,%20I%20have%20an%20inquiry%20regarding%20tyres/alloys.', '_blank');
    } else if (value === 'call') {
      window.open('tel:+919265344385');
    }
  };

  const getBotResponse = (value) => {
    switch (value) {
      case 'brands':
        return {
          text: "We are authorized dealers for premium global tyre brands including Michelin, Bridgestone, MRF, CEAT, Apollo, Yokohama, Continental, JK Tyre, and TVS Eurogrip. We also offer certified Neo Alloys, Uno Minda, Momo, BBS, and Enkei alloy wheels!",
          actions: [
            { text: "🚗 Show MRF Tyres", value: "mrf" },
            { text: "🚗 Show CEAT Tyres", value: "ceat" },
            { text: "💰 Get Quote", value: "quote" }
          ]
        };
      case 'mrf':
        return {
          text: "MRF offers top-quality passenger car series (Perfinza, Wanderer, ZVTV, ZLX) starting at ₹3,250, and high-performance two-wheeler series (Masseter, Mogrip, Zapper, Nylogrip) starting at ₹1,850. Select 'Get Pricing Quote' to calculate your total cost!",
          actions: [
            { text: "💰 Get Pricing Quote", value: "quote" },
            { text: "📞 WhatsApp Desk", value: "whatsapp" }
          ]
        };
      case 'ceat':
        return {
          text: "CEAT passenger car tyres (SecuraDrive, Milaze X3, Czar A/T) start at ₹3,200. CEAT two-wheeler tyres (Zoom Rad X1, Gripp X3, Secura Zoom) start at ₹1,150. All models come with up to a 5-Year Manufacturer Warranty!",
          actions: [
            { text: "💰 Get Pricing Quote", value: "quote" },
            { text: "📞 WhatsApp Desk", value: "whatsapp" }
          ]
        };
      case 'book':
        return {
          text: "You can schedule services like 3D Laser Wheel Alignment, Computerized Wheel Balancing, Nitrogen Filling, and Tyre Installation. Click below to load our booking portal!",
          actions: [
            { text: "🔧 Go to Services", value: "go_services" },
            { text: "📞 Call Showroom", value: "call" }
          ]
        };
      case 'quote':
        return {
          text: "Use our interactive pricing configurator on the products page! Bulk discount rates apply automatically when buying 4 or more tyres.",
          actions: [
            { text: "💰 Go to Estimator", value: "go_quote" },
            { text: "🚗 Show Tyre Brands", value: "brands" }
          ]
        };
      case 'location':
        return {
          text: "We are located at Atlantis Mall, Dr Vikram Sarabhai Marg, Vadodara - 390023. Our workshop is open daily from 9:00 AM to 8:30 PM.",
          actions: [
            { text: "📞 Chat on WhatsApp", value: "whatsapp" },
            { text: "📞 Call Dealer", value: "call" }
          ]
        };
      default:
        return {
          text: "How else can I assist you with your tyres or alloy wheels?",
          actions: [
            { text: "🚗 Show Brands", value: "brands" },
            { text: "🔧 Book Service", value: "book" },
            { text: "📍 Location", value: "location" }
          ]
        };
    }
  };

  const parseCustomQuery = (query) => {
    const q = query.toLowerCase();
    
    if (q.includes('mrf') || q.includes('zapper') || q.includes('masseter') || q.includes('wanderer')) {
      return getBotResponse('mrf');
    }
    if (q.includes('ceat') || q.includes('securadrive') || q.includes('czar') || q.includes('milaze')) {
      return getBotResponse('ceat');
    }
    if (q.includes('brand') || q.includes('michelin') || q.includes('bridgestone') || q.includes('apollo') || q.includes('yokohama')) {
      return getBotResponse('brands');
    }
    if (q.includes('book') || q.includes('service') || q.includes('alignment') || q.includes('balancing') || q.includes('nitrogen')) {
      return getBotResponse('book');
    }
    if (q.includes('price') || q.includes('quote') || q.includes('cost') || q.includes('calculator') || q.includes('estimat')) {
      return getBotResponse('quote');
    }
    if (q.includes('location') || q.includes('address') || q.includes('where') || q.includes('map') || q.includes('vadodara') || q.includes('mall')) {
      return getBotResponse('location');
    }
    if (q.includes('alloy') || q.includes('rim') || q.includes('wheel') || q.includes('neo') || q.includes('minda') || q.includes('momo')) {
      return {
        text: "We stock ARAI-certified Neo Alloys, Uno Minda gravity-cast wheels, Momo Italian-styled sport rims, BBS forged mesh, and lightweight Enkei racing alloys. Custom offsets and staggered fitments are available!",
        actions: [
          { text: "📞 WhatsApp Request", value: "whatsapp" },
          { text: "📍 Showroom Location", value: "location" }
        ]
      };
    }
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return {
        text: "Hello! How can I assist you with your vehicle's tyres or custom alloys today?",
        actions: [
          { text: "🚗 Show Tyre Brands", value: "brands" },
          { text: "🔧 Book a Service", value: "book" },
          { text: "📍 Vadodara Location", value: "location" }
        ]
      };
    }
    if (q.includes('discount') || q.includes('offer') || q.includes('deal')) {
      return {
        text: "We provide wholesale/bulk discount pricing automatically for orders of 4+ tyres. We also run seasonal booking specials for computerized wheel alignment!",
        actions: [
          { text: "💰 Open Pricing Estimator", value: "go_quote" },
          { text: "📞 Contact Dealer", value: "whatsapp" }
        ]
      };
    }

    return {
      text: "I'm not sure about that, but our Vadodara desk manager can help you directly! Would you like to chat on WhatsApp or call our desk?",
      actions: [
        { text: "📞 Chat on WhatsApp", value: "whatsapp" },
        { text: "📞 Call Desk", value: "call" },
        { text: "🚗 Show Brands", value: "brands" }
      ]
    };
  };

  return (
    <>
      {/* Floating launcher bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-[99999] flex flex-col items-end"
          >
            {showNotification && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="mb-3 mr-1 bg-gradient-orange-red text-white text-[11px] font-orbitron font-bold tracking-wider px-3.5 py-2 rounded-xl shadow-glow-orange flex items-center gap-1.5"
              >
                <Sparkles size={11} className="animate-pulse" /> Need Help? Chat with Us!
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowNotification(false);
                  }} 
                  className="hover:text-black transition-colors"
                >
                  <X size={10} className="ml-1" />
                </button>
              </motion.div>
            )}

            <motion.button
              onClick={() => {
                setIsOpen(true);
                setShowNotification(false);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-14 h-14 rounded-full bg-gradient-orange-red text-white flex items-center justify-center shadow-glow-orange border border-white/10 hover:shadow-glow-red transition-all duration-300"
            >
              <MessageCircle size={24} />
              {showNotification && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 border border-dark-950 rounded-full animate-ping" />
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main chat window container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={isMobile ? { y: "100%", opacity: 0 } : { opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={isMobile ? { y: "100%", opacity: 0 } : { opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed bottom-0 left-0 right-0 h-[80vh] sm:h-[520px] sm:w-[380px] sm:bottom-24 sm:right-6 sm:left-auto sm:inset-auto bg-dark-950 sm:bg-dark-900/90 sm:rounded-2xl rounded-t-3xl border-t border-x sm:border border-white/10 shadow-glass z-[99998] flex flex-col backdrop-blur-md overflow-hidden"
          >
            {/* Header section */}
            <div className="p-4 bg-gradient-to-r from-dark-950 to-dark-900 border-b border-white/5 flex flex-col">
              {/* Drag Handle indicator pill for mobile sheet */}
              <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-3 sm:hidden" />
              
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent-orange/10 border border-accent-orange/30 flex items-center justify-center text-accent-orange relative">
                    <Bot size={20} />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-dark-950 rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-sm font-orbitron font-bold tracking-wide text-white">VVLP Assistant</h3>
                    <span className="text-[9px] text-green-400 font-sans flex items-center gap-1 flex-row">Online & ready</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages box container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 bg-dark-950/20">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm shadow-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-orange-red text-white rounded-br-none' 
                      : 'bg-white/5 text-gray-200 border border-white/5 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                  
                  {/* Actions/Quick-replies */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 max-w-[95%]">
                      {msg.actions.map((act) => (
                        <button
                          key={act.value}
                          onClick={() => handleActionClick(act.value)}
                          className="px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold bg-dark-900 border border-accent-orange/20 hover:border-accent-orange text-accent-orange hover:bg-accent-orange/5 transition-all duration-300 shadow-sm"
                        >
                          {act.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing loader indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-accent-orange" />
                    <span className="text-xs sm:text-sm font-sans">AI is typing...</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input submission area */}
            <form onSubmit={handleSubmit} className="p-3 pb-[calc(12px+env(safe-area-inset-bottom,0px))] bg-dark-950 border-t border-white/5 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about brands, prices, services..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-dark-900 border border-white/5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent-orange transition-colors"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-accent-orange/15 text-gray-400 hover:text-accent-orange border border-white/5 hover:border-accent-orange/30 flex items-center justify-center transition-all duration-300"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
