/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  ShoppingBag, 
  MessageCircle, 
  Package, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Smartphone, 
  Instagram,
  UserCheck,
  ChevronRight,
  Menu,
  X,
  Play
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn, ASSETS, getDriveImageUrl, getDriveViewerUrl, siteConfig } from './lib/utils';

// --- Icons Helper ---
const getIcon = (iconName: string, size = 36) => {
  switch (iconName) {
    case 'ShieldCheck': return <ShieldCheck size={size} />;
    case 'TrendingUp': return <TrendingUp size={size} />;
    case 'CheckCircle2': return <CheckCircle2 size={size} />;
    case 'Clock': return <Clock size={size} />;
    case 'UserCheck': return <UserCheck size={size} />;
    case 'Package': return <Package size={size} />;
    case 'MapPin': return <MapPin size={size} className="text-br-blue" />;
    default: return null;
  }
};

// --- Components ---

const CouponPopup = () => {
  const [inIframe] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return window.self !== window.top;
      } catch (e) {
        return true;
      }
    }
    return false;
  });
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isWordPress, setIsWordPress] = useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const couponCode = siteConfig.coupon.code;

  useEffect(() => {
    // If inside an iframe, disable the popup completely
    if (inIframe) {
      return;
    }

    // Robust environment detection
    if (typeof window !== 'undefined') {
      try {
        const isWP = !window.location.hostname.includes('github.io') && 
                     !window.location.hostname.includes('localhost') && 
                     !window.location.hostname.includes('run.app') ||
                     !!document.querySelector('.wp-block-custom-html') ||
                     window.location.pathname.includes('wp-');
        setIsWordPress(isWP);
      } catch (e) {
        setIsWordPress(true);
      }
    }

    // Trigger popup display after 1.5s
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [inIframe]);

  // Safeguard watchdog: if overlay is active but modal element didn't load or remains invisible in DOM after 1 second, remove overlay instantly
  useEffect(() => {
    if (inIframe) return;
    if (isVisible) {
      const watchdog = setTimeout(() => {
        const modalElement = modalRef.current;
        if (!modalElement) {
          console.warn("CouponPopup safe container not detected in DOM after 1s. Forcing dismissal.");
          setIsVisible(false);
          return;
        }

        // Deep visibility inspection inside WordPress / iframe modes
        if (typeof window !== 'undefined') {
          try {
            const style = window.getComputedStyle(modalElement);
            if (
              style.opacity === '0' || 
              style.visibility === 'hidden' || 
              style.display === 'none' ||
              modalElement.offsetHeight === 0
            ) {
              console.warn("CouponPopup modal is invisible or layout is 0px. Dismissing to release overlay.");
              setIsVisible(false);
            }
          } catch (e) {
            // Safe fallback
          }
        }
      }, 1000);
      return () => clearTimeout(watchdog);
    }
  }, [isVisible, inIframe]);

  // Safeguard: when closed, force full page/app visibility and interaction to prevent grid/blockages in WordPress/Custom HTML blocks
  useEffect(() => {
    if (inIframe) return;
    if (!isVisible) {
      if (typeof document !== 'undefined') {
        try {
          document.body.style.opacity = '1';
          document.body.style.display = 'block';
          document.body.style.visibility = 'visible';
          document.body.style.pointerEvents = 'auto';
          document.body.style.overflow = 'auto';
          document.body.style.filter = 'none';

          const rootEl = document.getElementById('root');
          if (rootEl) {
            rootEl.style.opacity = '1';
            rootEl.style.display = 'block';
            rootEl.style.visibility = 'visible';
            rootEl.style.pointerEvents = 'auto';
            rootEl.style.filter = 'none';
          }
        } catch (e) {
          // Failure guard
        }
      }
    }
  }, [isVisible, inIframe]);

  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(couponCode).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch((err) => {
        console.error("Clipboard copy failed:", err);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
    }
  };

  if (inIframe) {
    return null;
  }

  return (
    <div 
      id="coupon-popup-wrapper"
      onClick={handleOverlayClick}
      className={cn(
        "fixed inset-0 z-[999] flex items-center justify-center p-6 overflow-y-auto select-none",
        isWordPress ? "bg-black/75" : "bg-br-blue/40 backdrop-blur-md"
      )}
      style={{
        display: isVisible ? 'flex' : 'none',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        visibility: isVisible ? 'visible' : 'hidden'
      }}
    >
      <div 
        ref={modalRef}
        id="coupon-modal-card"
        className="relative w-full max-w-md bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_45px_110px_rgba(0,0,0,0.35)] border-4 border-br-yellow z-[1000] opacity-100 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          id="coupon-close-btn"
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-br-blue z-[1001]"
          aria-label="Close coupon portal"
        >
          <X size={20} />
        </button>

        <div className="bg-br-green p-6 md:p-10 text-center relative overflow-hidden select-none">
          <div className="absolute top-0 right-0 w-32 h-32 bg-br-yellow opacity-20 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-br-blue opacity-10 blur-2xl rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <span className="inline-block bg-br-yellow text-br-blue px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">{siteConfig.coupon.badge}</span>
          <h2 className="text-2xl md:text-4xl font-black text-white leading-none uppercase italic tracking-tighter">{siteConfig.coupon.title} <br /><span className="text-br-yellow">{siteConfig.coupon.titleYellow}</span></h2>
        </div>

        <div className="p-6 md:p-10 text-center">
          <p className="text-br-blue/60 font-medium mb-8 text-sm md:text-base">{siteConfig.coupon.description}</p>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-br-green via-br-yellow to-br-blue rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center justify-between gap-2 p-2 bg-gray-50 border-2 border-dashed border-br-green/30 rounded-2xl">
              <span className="flex-1 font-mono text-xl md:text-2xl font-black text-br-blue tracking-wider pl-4">
                {couponCode}
              </span>
              <button 
                id="coupon-copy-btn"
                onClick={copyToClipboard}
                className={cn(
                  "px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all flex items-center gap-2",
                  copied ? "bg-br-green text-white" : "bg-br-yellow text-br-blue hover:bg-[#ebcd00]"
                )}
              >
                {copied ? <CheckCircle2 size={16} /> : <div className="w-4 h-4 bg-br-blue/10 rounded-sm" />}
                {copied ? siteConfig.coupon.copiedText : siteConfig.coupon.ctaText}
              </button>
            </div>
          </div>

          <button 
            id="coupon-cancel-btn"
            onClick={() => setIsVisible(false)}
            className="mt-8 text-br-blue/40 hover:text-br-blue text-xs font-black uppercase tracking-[0.2em] transition-colors"
          >
            {siteConfig.coupon.cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

const VideoPlayer = ({ srcId, title, className }: { srcId: string; title: string, className?: string }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "w-full max-w-[320px] mx-auto aspect-[9/16] rounded-[2rem] overflow-hidden shadow-2xl bg-black border-4 border-white/20 relative",
        className
      )}
    >
      {/* Interaction Shield: Prevents accidental navigation while keeping basic controls accessible if needed */}
      <div className="absolute inset-0 z-10 bg-transparent pointer-events-none" />
      
      {isVisible ? (
        <div className="absolute inset-0 overflow-hidden">
          <iframe 
            src={`https://drive.google.com/file/d/${srcId}/preview?autoplay=1&mute=1`} 
            className="absolute top-1/2 left-1/2 w-[500%] h-[500%] -translate-x-1/2 -translate-y-1/2 border-none scale-[0.2] origin-center"
            title={title}
            allow="autoplay; encrypted-media"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-900 group cursor-pointer">
          <div className="bg-white/20 p-6 rounded-full animate-pulse">
            <Play className="text-white/20 fill-white" size={40} />
          </div>
        </div>
      )}
    </div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-br-green h-12 px-4 border-b border-br-yellow/30 flex items-center justify-center gap-2 md:gap-3 shadow-xl">
      <div className="flex items-center gap-1.5 md:gap-2">
        <Clock size={14} className="text-br-yellow animate-pulse md:w-4 md:h-4" />
        <p className="text-white text-[9px] md:text-sm font-bold uppercase tracking-[0.1em] md:tracking-widest whitespace-nowrap">
          Oferta de Lançamento termina em:
        </p>
      </div>
      <div className={cn(
        "text-lg md:text-2xl font-mono font-black tabular-nums min-w-[60px] md:min-w-[70px] text-center",
        timeLeft < 60 ? "text-red-400 animate-pulse" : "text-br-yellow"
      )}>
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

const VariationCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="relative group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {ASSETS.IMAGES.VARIATIONS.map((variant, index) => {
            const isBrasil = variant.name.startsWith('Brasil');
            return (
              <div key={index} className="flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] py-10">
                <motion.div
                  whileHover={{ y: -15, scale: 1.02 }}
                  className={cn(
                    "rounded-3xl overflow-hidden shadow-lg h-full border transition-all duration-300",
                    isBrasil 
                      ? "bg-white border-br-yellow ring-4 ring-br-yellow/20 shadow-br-yellow/10" 
                      : "bg-gray-50 border-gray-100"
                  )}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={getDriveImageUrl(variant.id)} 
                      alt={variant.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    {isBrasil ? (
                      <div className="absolute top-4 left-4 bg-br-yellow text-br-blue px-4 py-2 rounded-full text-xs font-black shadow-lg flex items-center gap-1">
                        <span className="text-sm">🇧🇷</span> EDIÇÃO ESPECIAL
                      </div>
                    ) : (
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm text-gray-800">
                        Disponível
                      </div>
                    )}
                  </div>
                  <div className="p-8 text-center bg-white">
                    <p className={cn(
                      "font-black text-2xl uppercase tracking-tighter text-br-blue",
                      isBrasil ? "text-br-green" : "text-[#111]"
                    )}>{variant.name}</p>
                    <p className="text-sm text-gray-500 mt-2 font-medium">
                      {isBrasil ? 'O Orgulho Brasileiro em suas Mãos' : 'Duo Head Exclusive Design'}
                    </p>
                    {isBrasil && (
                      <div className="mt-4 flex justify-center gap-1">
                        <div className="w-8 h-1.5 rounded-full bg-br-green" />
                        <div className="w-8 h-1.5 rounded-full bg-br-yellow" />
                        <div className="w-8 h-1.5 rounded-full bg-br-blue" />
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <button 
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-3 rounded-full shadow-xl z-20 hidden md:block hover:bg-gray-50 transition-colors border border-gray-100"
      >
        <ChevronRight className="rotate-180" size={24} />
      </button>
      <button 
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white p-3 rounded-full shadow-xl z-20 hidden md:block hover:bg-gray-50 transition-colors border border-gray-100"
      >
        <ChevronRight size={24} />
      </button>

      {/* Progress Dots / Visual Indicator */}
      <div className="flex justify-center gap-2 mt-2 md:hidden">
        {ASSETS.IMAGES.VARIATIONS.map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === selectedIndex ? "w-8 bg-br-green" : "w-2 bg-gray-300"
            )} 
          />
        ))}
      </div>
    </div>
  );
};

const Button = ({ 
  children, 
  className, 
  variant = 'primary', 
  onClick,
  href
}: { 
  children: React.ReactNode; 
  className?: string; 
  variant?: 'primary' | 'whatsapp' | 'outline' | 'secondary' | 'yellow';
  onClick?: () => void;
  href?: string;
}) => {
  const baseStyles = "px-8 py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-2 active:scale-95 text-lg shadow-xl uppercase tracking-tight";
  const variants = {
    primary: "bg-br-green text-white hover:bg-br-green-dark shadow-br-green/20",
    yellow: "bg-br-yellow text-br-blue hover:bg-[#ebcd00] shadow-br-yellow/20",
    whatsapp: "bg-[#25D366] text-white hover:bg-[#21b558] shadow-green-500/20",
    secondary: "bg-br-blue text-white hover:bg-blue-900 shadow-br-blue/20",
    outline: "border-3 border-br-green text-br-green hover:bg-br-green hover:text-white"
  };

  const Content = () => <>{children}</>;

  if (href) {
    const isAnchor = href.startsWith('#');
    return (
      <a 
        href={href} 
        target={isAnchor ? undefined : "_blank"} 
        rel={isAnchor ? undefined : "noopener noreferrer"} 
        className={cn(baseStyles, variants[variant], className)}
        onClick={(e) => {
          if (isAnchor) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }
          onClick?.();
        }}
      >
        <Content />
      </a>
    );
  }

  return (
    <button onClick={onClick} className={cn(baseStyles, variants[variant], className)}>
      <Content />
    </button>
  );
};

const Section = ({ children, className, id, dark = false }: { children: React.ReactNode; className?: string; id?: string; dark?: boolean }) => (
  <section id={id} className={cn("py-16 md:py-24 px-6", dark ? "bg-br-blue text-white" : "bg-transparent", className)}>
    <div className="max-w-6xl mx-auto">
      {children}
    </div>
  </section>
);

const SectionTitle = ({ children, centered = true, dark = false }: { children: React.ReactNode; centered?: boolean; dark?: boolean }) => (
  <h2 className={cn(
    "text-3xl md:text-6xl font-black mb-12 md:mb-16 tracking-tighter uppercase italic leading-[1]", 
    centered && "text-center",
    dark ? "text-br-yellow" : "text-br-blue"
  )}>
    {children}
  </h2>
);

// --- Main Application ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [inIframe, setInIframe] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        setInIframe(window.self !== window.top);
      } catch (e) {
        setInIframe(true);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-br-blue font-sans overflow-x-hidden">
      
      <CouponPopup />
      <CountdownTimer />
      
      {/* Header / Nav */}
      <nav className={cn(
        "fixed top-12 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 flex justify-between items-center",
        isScrolled 
          ? (inIframe ? "bg-white shadow-lg border-b border-br-green/10" : "bg-white/95 backdrop-blur-md shadow-lg border-b border-br-green/10") 
          : "bg-transparent"
      )}>
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-br-green rounded-xl flex items-center justify-center shadow-lg shadow-br-green/20 rotate-3">
            <span className="text-br-yellow font-black text-2xl drop-shadow-sm">{siteConfig.brand.name[0]}</span>
          </div>
          <div className="flex flex-col -gap-1">
            <span className="font-black text-2xl tracking-tighter leading-none text-br-green">{siteConfig.brand.name}</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-br-blue uppercase">{siteConfig.brand.edition}</span>
          </div>
        </div>
        <div className="hidden md:flex gap-4">
          <Button href={ASSETS.LINKS.WHATSAPP} variant="outline" className="px-6 py-2.5 text-xs shadow-none border-2">
            Falar no WhatsApp
          </Button>
        </div>
      </nav>

      {/* 1. HERO */}
      <section className="pt-56 pb-24 px-6 relative overflow-hidden">
        {/* Brazilian Flag Inspired Background Elements (disabled in iframe to prevent overlay and rendering page bugs) */}
        {!inIframe && (
          <>
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-br-green/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-br-yellow/10 rounded-full blur-[100px] pointer-events-none" />
          </>
        )}
        
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 bg-br-green text-br-yellow text-xs font-black px-4 py-2 rounded-full mb-8 tracking-[0.2em] uppercase shadow-lg shadow-br-green/20">
              <span className="text-base">🇧🇷</span> {siteConfig.hero.promoBadge}
            </span>
            <h1 className="text-4xl md:text-8xl font-black mb-6 md:mb-8 leading-[0.95] tracking-tighter uppercase italic">
              {siteConfig.hero.titleLine1} <br />
              <span className="text-br-green">{siteConfig.hero.titleLine2}</span> <br />
              <span className="text-br-yellow bg-br-blue px-4 inline-block mt-2">{siteConfig.hero.titleLine3}</span>
            </h1>
            <p className="text-lg md:text-2xl text-br-blue/70 mb-10 md:mb-12 max-w-2xl mx-auto font-medium">
              Autonomia total para raspar a cabeça com perfeição. O <span className="font-bold text-br-green decoration-br-yellow decoration-2 underline-offset-4 underline">{siteConfig.brand.name.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span> é a inovação que o brasileiro precisava.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-5 mb-16 md:mb-20 justify-center">
              <Button href="#precos" variant="yellow" className="w-full sm:w-auto min-w-0 sm:min-w-[320px]">
                <ShoppingBag size={22} strokeWidth={3} /> {siteConfig.hero.ctaText}
              </Button>
            </div>
          </motion.div>

          {/* Hero Video - Vertical & Autoplay */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full"
          >
            <VideoPlayer 
              srcId={ASSETS.VIDEOS.HERO} 
              title="Apresentação Duo Head"
              className="border-8 border-white shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. GALERIA VISUAL */}
      <Section className="bg-white">
        <SectionTitle>Design <span className="text-br-green">Premium</span> para Resultados Fodásticos</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {ASSETS.IMAGES.GALLERY.map((id, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-br-green/5 bg-gray-50"
            >
              <img 
                src={getDriveImageUrl(id)} 
                alt="Duo Head em uso" 
                className="w-full h-full object-cover transition-transform hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 3. PROBLEMA vs 4. SOLUÇÃO */}
      <Section dark className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-br-blue opacity-50 z-0" />
        <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <span className="text-br-yellow font-black mb-4 block uppercase tracking-widest">{siteConfig.problem_solution.problemTitle}</span>
            <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight italic uppercase text-white">{siteConfig.problem_solution.problemSubtitle}</h2>
            <ul className="space-y-8">
              {siteConfig.problem_solution.problems.map((item, i) => (
                <li key={i} className="flex gap-5 items-center">
                  <div className="flex-shrink-0 bg-red-500 text-white p-1 rounded-full shadow-lg shadow-red-500/20">
                    <X size={20} strokeWidth={3} />
                  </div>
                  <span className="text-xl md:text-2xl text-white/80 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            {!inIframe && <div className="absolute inset-0 bg-gradient-to-tr from-br-yellow/30 to-transparent rounded-[3rem] blur-3xl pointer-events-none" />}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-4 border-white/10"
            >
               <img 
                src={getDriveImageUrl(ASSETS.IMAGES.PRODUCT)} 
                alt="Solução Duo Head" 
                className="w-full h-auto brightness-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-br-blue to-transparent">
                <p className="text-br-yellow font-black text-3xl uppercase italic leading-none mb-1">{siteConfig.problem_solution.solutionTitle}</p>
                <p className="text-white/70 font-bold uppercase tracking-widest text-sm">{siteConfig.problem_solution.solutionSubtitle}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* 5. BENEFÍCIOS */}
      <Section id="beneficios" className="bg-[#f0f9f3]">
        <SectionTitle>{siteConfig.benefits.sectionTitle}</SectionTitle>
        <div className="grid md:grid-cols-3 gap-10">
          {siteConfig.benefits.items.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-br-green/5 hover:shadow-br-green/10 transition-all border border-br-green/5 group"
            >
              <div className="text-br-green mb-6 md:mb-8 inline-block p-4 md:p-5 bg-br-green/10 rounded-[1.2rem] md:rounded-[1.5rem] group-hover:scale-110 transition-transform">
                {getIcon(benefit.icon, 36)}
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 uppercase italic tracking-tight text-br-blue">{benefit.title}</h3>
              <p className="text-br-blue/60 text-base md:text-lg leading-relaxed font-medium">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 6. DIFERENCIAIS */}
      <Section className="bg-white overflow-hidden">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-br-yellow/20"
          >
            <img 
              src={getDriveImageUrl(ASSETS.IMAGES.DIFFERENTIALS)} 
              alt="Diferenciais" 
              className="w-full h-auto"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div>
            <SectionTitle centered={false}>{siteConfig.differentials.sectionTitle}</SectionTitle>
            <div className="space-y-4">
              {siteConfig.differentials.items.map((item, i) => (
                <div key={i} className="flex gap-5 items-center p-5 bg-[#f0f9f3] rounded-2xl border border-br-green/5 hover:border-br-green/20 transition-colors">
                  <div className="bg-white p-3 rounded-xl shadow-md">
                    <CheckCircle2 size={24} className="text-br-green" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-[10px] text-br-green uppercase font-black tracking-widest leading-none mb-1">{item.label}</p>
                    <p className="text-xl font-bold text-br-blue">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 7. PROVA SOCIAL */}
      <Section className="bg-br-blue relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(0,151,57,0.1),transparent)] z-0" />
        <SectionTitle dark>{siteConfig.social_proof.sectionTitle}</SectionTitle>
        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-10">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl relative border-t-8 border-br-yellow transform -rotate-1">
              <p className="text-2xl italic mb-8 font-medium text-br-blue">"{siteConfig.social_proof.quote}"</p>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-br-green text-br-yellow rounded-full flex items-center justify-center font-black text-xl shadow-lg shadow-br-green/20">{siteConfig.social_proof.author[0]}</div>
                <div>
                  <p className="font-black text-xl text-br-blue">{siteConfig.social_proof.author}</p>
                  <p className="text-sm text-br-green font-bold uppercase tracking-widest">{siteConfig.social_proof.authorTitle}</p>
                </div>
              </div>
            </div>
            <Button href={ASSETS.LINKS.INSTAGRAM} variant="outline" className="w-full border-white text-white hover:bg-white hover:text-br-blue">
              <Instagram size={24} /> {siteConfig.social_proof.ctaText}
            </Button>
          </div>
          <div className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-br-green/30 transform rotate-1">
            <img 
              src={getDriveImageUrl(ASSETS.IMAGES.SOCIAL_PROOF)} 
              alt="Prova social" 
              className="w-full h-auto brightness-110"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </Section>

      {/* 8. VARIAÇÕES */}
      <Section className="bg-white">
        <SectionTitle>Escolha as suas cores</SectionTitle>
        <VariationCarousel />
      </Section>
      <Section dark className="bg-black/95">
        <SectionTitle dark>{siteConfig.visuals_section.title}</SectionTitle>
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <VideoPlayer 
            srcId={ASSETS.VIDEOS.SEC1} 
            title="Demonstração Prática"
            className="border-8 border-white/5 shadow-2xl"
          />
          <div className="mt-12 text-center">
            <p className="text-white/60 text-lg mb-8 font-medium">{siteConfig.visuals_section.description}</p>
            <Button href="#precos" variant="yellow">
              {siteConfig.visuals_section.ctaText}
            </Button>
          </div>
        </div>
      </Section>

      {/* 10. OFERTA & ESCASSEZ */}
      <Section id="precos" className="bg-br-green/5 relative py-32">
        <SectionTitle>Escolha o seu <span className="text-br-green">Duo Head</span></SectionTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto items-stretch">
          {(Object.values((ASSETS as any).PRODUCTS) as any[]).map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative group flex flex-col bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-xl border-2 transition-all duration-300 hover:scale-[1.02]",
                product.featured ? "border-br-yellow ring-4 ring-br-yellow/10" : "border-gray-50"
              )}
            >
              {product.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-br-yellow text-br-blue font-black px-6 py-2 rounded-full text-xs uppercase tracking-[0.2em] shadow-lg whitespace-nowrap z-10">
                  Mais Vendido
                </div>
              )}
              
              <div className="flex-1">
                <h3 className="text-2xl font-black text-br-blue leading-[1.1] mb-2 uppercase italic">{product.name}</h3>
                <p className="text-br-blue/60 text-sm mb-8 font-medium leading-tight">{product.description}</p>
                
                <div className="mb-8">
                  <span className="text-gray-400 text-sm font-bold line-through block">De R$ {product.priceOld}</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-br-blue font-black text-lg">R$</span>
                    <span className="text-5xl font-black text-br-green tracking-tighter leading-none">{product.priceNew.split(',')[0]}</span>
                    <span className="text-2xl font-black text-br-green tracking-tighter">,{product.priceNew.split(',')[1]}</span>
                  </div>
                </div>
              </div>
              
              <Button href={product.link} variant={product.featured ? 'yellow' : 'primary'} className="w-full py-5 text-sm">
                Comprar Agora
              </Button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-br-blue/40 text-[10px] font-bold uppercase tracking-widest">
                <ShieldCheck size={14} className="text-br-green" /> Checkout Seguro
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 bg-br-blue text-white rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-24 text-center relative overflow-hidden shadow-[0_40px_80px_rgba(1,33,105,0.4)]">
          {!inIframe && (
            <>
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-br-green/20 blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-br-yellow/10 blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            </>
          )}
          
          <span className="text-br-yellow font-black tracking-[0.2em] md:tracking-[0.3em] uppercase mb-6 block text-[10px] md:text-base animate-pulse relative z-10">Lote especial: Poucas unidades no estoque!</span>
          <h2 className="text-4xl md:text-8xl font-black mb-8 md:mb-10 leading-[0.9] italic uppercase relative z-10">A Revolução <br /><span className="text-br-green">{siteConfig.brand.edition}</span></h2>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center max-w-4xl mx-auto relative z-10">
            <Button href="#precos" variant="yellow" className="w-full sm:w-auto min-w-0 sm:min-w-[320px] py-6 md:py-7 h-auto text-lg md:text-xl shadow-2xl">
              ESCOLHER MEU KIT 🇧🇷
            </Button>
          </div>
          
          <p className="mt-8 md:mt-12 text-xs md:text-base text-white/40 flex items-center justify-center gap-3 font-bold uppercase tracking-widest relative z-10">
            <Clock size={16} className="text-br-yellow md:w-5 md:h-5" /> Envio expresso para todo o Brasil
          </p>
        </div>
      </Section>

      {/* 11. ENTREGA & INFOS */}
      <Section className="bg-white border-b border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          {siteConfig.delivery_section.map((item, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className={cn(
                "p-8 rounded-[2rem] mb-8 transition-all duration-300",
                item.icon === "Package" && "bg-br-green/10 group-hover:bg-br-green group-hover:text-br-yellow",
                item.icon === "MapPin" && "bg-br-yellow/20 group-hover:bg-br-yellow group-hover:text-br-blue",
                item.icon === "ShieldCheck" && "bg-br-blue/10 group-hover:bg-br-blue group-hover:text-white"
              )}>
                {item.icon === "Package" && <Package size={48} strokeWidth={2.5} className="text-br-green group-hover:text-br-yellow" />}
                {item.icon === "MapPin" && <MapPin size={48} strokeWidth={2.5} className="text-br-blue" />}
                {item.icon === "ShieldCheck" && <ShieldCheck size={48} strokeWidth={2.5} className="text-br-blue group-hover:text-white" />}
              </div>
              <h3 className="text-3xl font-black mb-3 italic uppercase text-br-blue">{item.title}</h3>
              <p className="text-br-blue/50 font-medium text-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>
      {/* Footer */}
      <footer className="py-20 px-6 bg-br-blue text-white text-center pb-32">
        <div className="flex flex-col items-center justify-center gap-4 mb-10">
          <div className="w-16 h-16 bg-br-green rounded-2xl flex items-center justify-center shadow-lg shadow-br-green/20 md:rotate-3">
            <span className="text-br-yellow font-black text-3xl">{siteConfig.brand.name[0]}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-black text-3xl tracking-tighter text-br-green">{siteConfig.brand.name}</span>
            <span className="text-xs font-bold tracking-[0.3em] text-white/50 uppercase">{siteConfig.brand.edition} • {siteConfig.brand.year}</span>
          </div>
        </div>
        <div className="max-w-2xl mx-auto text-white/40 mb-10 text-sm">
          <p>{siteConfig.footer.copyright} <br />{siteConfig.footer.subtext}</p>
        </div>
        <div className="flex justify-center gap-8">
          <a href={ASSETS.LINKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white/10 text-white transition-all hover:scale-110"><Instagram /></a>
          <a href={ASSETS.LINKS.WHATSAPP} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-green-500/20 text-white hover:text-[#25D366] transition-all hover:scale-110"><MessageCircle /></a>
        </div>
      </footer>

      {/* 13. STICKY MOBILE CTA */}
      <div className="fixed bottom-6 left-6 right-6 md:hidden z-50 flex gap-2">
        <Button href={ASSETS.LINKS.WHATSAPP} variant="whatsapp" className="w-16 h-16 p-0 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-2xl">
          <MessageCircle size={32} strokeWidth={2.5} />
        </Button>
        <Button href="#precos" variant="yellow" className="flex-1 shadow-2xl py-5 text-xs rounded-2xl leading-tight">
          ESCOLHER MEU KIT <br /><span className="text-[10px] opacity-80">PROMOÇÃO BRASIL</span>
        </Button>
      </div>

    </div>
  );
}

// Missing component for delivery section
const MapPin = ({ size, className, strokeWidth = 2.5 }: { size: number, className: string, strokeWidth?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
