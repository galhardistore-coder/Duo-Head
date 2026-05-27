import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  ShoppingBag, 
  MessageCircle, 
  Package, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Instagram,
  UserCheck,
  ChevronRight,
  X,
  Play
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Local Utilities ---
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDriveImageUrl = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;
export const getDriveViewerUrl = (id: string) => `https://drive.google.com/file/d/${id}/preview`;

// --- Inline Site Configuration & Catalog Data ---
const siteConfig = {
  brand: {
    name: "DUO HEAD",
    edition: "Brasil Edition",
    year: "2026"
  },
  links: {
    instagram: "https://www.instagram.com/duohead_/",
    whatsapp: "https://wa.me/5511995250701"
  },
  assets: {
    videos: {
      hero: "15RzKa3smvsyk_co7LxID7SuRARuzDDl0",
      sec1: "16QKWib1xI0R0_SmUiYcQG2GFjxTtbmrR",
      sec2: "1cs7tdebI9kbUuvOUefhZI5-yMmzvtLEu"
    },
    images: {
      gallery: [
        "13BwSrdnX1SCiTiwGoQsA3oTwvX7RJpPt",
        "11ylUirsBP0SV8b68VgoCDB5b5q7nP3YH",
        "18q2Wt2YwqBigh_xf5jdkBDDReXu1Q0YC",
        "1pfuBic_7Tz3xebc76veVxW7fuaKvJnDf"
      ],
      product: "1nIHfTSThCKhqD1SZPrnRxNJX2d2e-X2a",
      benefits: [
        "1I1NKanAVYzPJ18-QlHms0r1WMde5AJql",
        "1xUiky54rlBjAk_NK6C9xAZm5LmoL7Sbv"
      ],
      differentials: "1D4_66cs0015_3g-jATZMHabVVtECYJS-",
      social_proof: "11OXKSx3Rfa8fKv58JQcAdC267chsiSRB",
      variations: [
        { "name": "Brasil: Verde e Amarelo", "id": "17E0SmZkUUDcVXXdsLAcYjOCNyhalfsvS" },
        { "name": "Brasil: Verde e Azul", "id": "10UphD9Vx7Y_LX8n2_8JR08CsvKJc1kLL" },
        { "name": "Brasil: Azul e Amarelo", "id": "1MQCbj4SrFi_rDhGtrUdpEsN3SWzmLirS" },
        { "name": "Azul Claro", "id": "15ryUw3pIEII3Jyxv1BqAQeE8bvXGTPoB" },
        { "name": "Azul Royal", "id": "1rkM1OLeWvDiqIMj4WvuGo3P_vaWUAjb_" },
        { "name": "Laranja", "id": "1Uwu5yqCIS6QEa8MbLIOvWn58VjUfFfGI" },
        { "name": "Preto", "id": "1wAUK00YYkwmdwv2BCW-6hxdreE4zGFsS" },
        { "name": "Rosa", "id": "1fxM22o9RyHa8EFwN2OoanKoHVkG3pZcj" },
        { "name": "Verde Claro", "id": "1HKKxh3HOfcbtMmL3r0dyEDehBj56r1g1" },
        { "name": "Verde Escuro", "id": "1XZsZBe4uRydfk1SE_XfnXWg2azxC_0cP" },
        { "name": "Verde Limão", "id": "1eoB2i4sFE6LXLMRgyvvIy55RJQVmRtJL" },
        { "name": "Verde Militar", "id": "1IjaxJAzEEsLtFmDIJGpEjiPRf4g5kGPh" }
      ]
    }
  },
  hero: {
    promoBadge: "Orgulho Nacional",
    titleLine1: "O Suporte",
    titleLine2: "Mais Vendido",
    titleLine3: "Do Brasil",
    description: "Autonomia total para raspar a cabeça com perfeição. O Duo Head é a inovação que o brasileiro precisava.",
    ctaText: "Aproveitar Oferta"
  },
  problem_solution: {
    problemTitle: "Chega de sofrer sozinho",
    problemSubtitle: "Por que continuar dependendo dos outros?",
    problems: [
      "Dificuldade total na parte de trás",
      "Gasto excessivo com barbeiros",
      "Cortes mal acabados e falhos",
      "Falta de tempo para ir ao salão",
      "Dependência de ajuda para o básico"
    ],
    solutionTitle: "Duo Head Brasil",
    solutionSubtitle: "Sua liberdade começa aqui"
  },
  benefits: {
    sectionTitle: "O que o Brasil já sabe:",
    items: [
      { "title": "Independência", "icon": "ShieldCheck", "desc": "Seja o seu próprio barbeiro com precisão absoluta." },
      { "title": "Mais Reais no Bolso", "icon": "TrendingUp", "desc": "Economia garantida todos os meses." },
      { "title": "Alcança Tudo", "icon": "CheckCircle2", "desc": "Guia inteligente que atinge cada ângulo." },
      { "title": "Pronto em Minutos", "icon": "Clock", "desc": "Agilidade total para o homem moderno." },
      { "title": "Corte Profissional", "icon": "UserCheck", "desc": "Acabamento de luxo sem sair de casa." },
      { "title": "Made in Brasil", "icon": "Package", "desc": "Orgulho e qualidade nacional reconhecida." }
    ]
  },
  differentials: {
    sectionTitle: "O que nos torna Incomparáveis?",
    items: [
      { "label": "Tecnologia", "value": "Impressão 3D de Nível Industrial" },
      { "label": "Logística", "value": "Estoque no ABC e Envio Expresso" },
      { "label": "Suporte", "value": "Atendimento VIP 100% Brasileiro" },
      { "label": "Confiança", "value": "Garantia de Satisfação Duo Head" },
      { "label": "Versatilidade", "value": "Compatível com as Melhores Lâminas" }
    ]
  },
  social_proof: {
    sectionTitle: "Quem usa, recomenda!",
    quote: "Simplesmente foda. Antes eu ficava dependendo da minha esposa toda semana, agora faço em 5 minutos enquanto tomo banho. A qualidade é absurda!",
    author: "Ricardo Santos",
    authorTitle: "Empresário • São Bernardo, SP",
    ctaText: "Ver comunidade no Instagram"
  },
  products: {
    SUPPORT_WITH_FUSION5: {
      name: "Kit Suporte + Lâmina Fusion5",
      description: "Suporte premium + Refil de lâmina Fusion5 incluso.",
      priceOld: "114,90",
      priceNew: "80,43",
      link: "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/8QOPT2L6CY",
      featured: true
    },
    SUPPORT_ONLY_FUSION5: {
      name: "Suporte Fusion5 (Sem lâmina)",
      description: "Apenas o suporte para quem já possui a lâmina Fusion5.",
      priceOld: "64,90",
      priceNew: "45,43",
      link: "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/BD8U7ND8AO"
    },
    SUPPORT_WITH_MACH3: {
      name: "Kit Suporte + Lâmina Mach3",
      description: "Suporte premium + Refil de lâmina Mach3 incluso.",
      priceOld: "99,90",
      priceNew: "69,93",
      link: "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/BD8U7ND8AO",
      featured: true
    },
    SUPPORT_ONLY_MACH3: {
      name: "Suporte Mach3 (Sem lâmina)",
      description: "Apenas o suporte para quem já possui a lâmina Mach3.",
      priceOld: "64,90",
      priceNew: "45,43",
      link: "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/BD8U7ND8AO"
    }
  },
  visuals_section: {
    title: "Veja o Duo Head em ação",
    description: "Assista como é simples e rápido ter o resultado que você sempre quis.",
    ctaText: "Quero este resultado agora"
  },
  delivery_section: [
    {
      icon: "Package",
      title: "Envio Ninja",
      desc: "Postagem em até 24h. Receba rápido em qualquer lugar."
    },
    {
      icon: "MapPin",
      title: "Retirada VIP",
      desc: "Mora no ABC Paulista? Retire em mãos e economize o frete."
    },
    {
      icon: "ShieldCheck",
      title: "Garantia Real",
      desc: "Qualidade atestada. Sua satisfação ou seu dinheiro de volta."
    }
  ],
  footer: {
    copyright: "© 2026 Duo Head Brasil. Todos os direitos reservados. Design e Inovação 100% Brasileira.",
    subtext: "Enviamos para todo o território nacional com carinho e rapidez."
  }
};

const yampiLinks: Record<string, Record<string, string>> = {
  "SUPPORT_WITH_FUSION5": {
    "Brasil: Verde e Amarelo": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/8QOPT2L6CY",
    "Brasil: Azul e Amarelo": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/AIP8JOZ3L6",
    "Brasil: Verde e Azul": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/77VDVXJ5YG",
    "Preto": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/634FSL92FS",
    "Azul Claro": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/2X96XZSJG9",
    "Azul Royal": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/A7FB951UKP",
    "Laranja": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/G9PA48B23F",
    "Verde Claro": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/R0F6HW8M4T",
    "Verde Escuro": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/QQ7CZLXN30",
    "Verde Limão": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/CBW5ATFUST",
    "Verde Militar": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/CSEZBVU9ZA",
    "Rosa": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/KLA91RDIZQ"
  },
  "SUPPORT_ONLY_FUSION5": {
    "Brasil: Verde e Amarelo": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/5UCG7CKSZM",
    "Brasil: Azul e Amarelo": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/381FJ47986",
    "Brasil: Verde e Azul": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/CIERIERCTE",
    "Preto": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/S36EKO449R",
    "Azul Claro": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/K49OP9294K",
    "Azul Royal": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/NQVPYDON5A",
    "Laranja": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/28QKGZFHV2",
    "Verde Claro": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/CBF8UK0JM9",
    "Verde Escuro": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/OEIYYUBH83",
    "Verde Limão": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/1HL9JCFHAP",
    "Verde Militar": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/18LCKH4UDB",
    "Rosa": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/2HVPT1Y74D"
  },
  "SUPPORT_WITH_MACH3": {
    "Brasil: Verde e Amarelo": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/GL8137LRFW",
    "Brasil: Azul e Amarelo": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/70FDQ3ENO8",
    "Brasil: Verde e Azul": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/RI0A73N9E1",
    "Preto": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/4AE4YDXC9K",
    "Azul Claro": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/NJ08T0DY51",
    "Azul Royal": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/AOY2HNSZQ0",
    "Laranja": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/K5N63L5W3X",
    "Verde Claro": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/SLMUIM8O2M",
    "Verde Escuro": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/6O5ZMWNCUF",
    "Verde Limão": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/H3PIWW3YUN",
    "Verde Militar": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/4IBU3TE96O",
    "Rosa": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/SHGZGWCP5H"
  },
  "SUPPORT_ONLY_MACH3": {
    "Brasil: Verde e Amarelo": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/BD8U7ND8AO",
    "Brasil: Azul e Amarelo": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/6SJ2K7BF4N",
    "Brasil: Verde e Azul": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/6YAEGE6PJU",
    "Preto": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/O7VFXXKI7R",
    "Azul Claro": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/K7A3SI40BA",
    "Azul Royal": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/8FIQ0UUXNH",
    "Laranja": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/1EOGUAACN3",
    "Verde Claro": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/NTQJKTW4YX",
    "Verde Escuro": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/LGUGQNHBYZ",
    "Verde Limão": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/56S3CH22KF",
    "Verde Militar": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/CTX41KT5BD",
    "Rosa": "https://duo-head-suporte-duplo-para-laminas.pay.yampi.com.br/r/58FRVRN7GY"
  }
};

const ASSETS = {
  VIDEOS: {
    HERO: siteConfig.assets.videos.hero,
    SEC1: siteConfig.assets.videos.sec1,
    SEC2: siteConfig.assets.videos.sec2,
  },
  IMAGES: {
    GALLERY: siteConfig.assets.images.gallery,
    PRODUCT: siteConfig.assets.images.product,
    BENEFITS: siteConfig.assets.images.benefits,
    DIFFERENTIALS: siteConfig.assets.images.differentials,
    SOCIAL_PROOF: siteConfig.assets.images.social_proof,
    VARIATIONS: siteConfig.assets.images.variations,
  },
  LINKS: {
    INSTAGRAM: siteConfig.links.instagram,
    WHATSAPP: siteConfig.links.whatsapp,
  },
  PRODUCTS: siteConfig.products
};

// --- Custom Icons Helper ---
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

// --- Secondary Custom Components ---
const VideoPlayer = ({ srcId, title, className }: { srcId: string; title: string, className?: string }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
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
        "w-full max-w-[320px] mx-auto aspect-[9/16] rounded-[2rem] overflow-hidden shadow-2xl bg-[#0b132b] border-4 border-white/20 relative group",
        className
      )}
    >
      {/* If playing, show a small action to stop/reset */}
      {isPlaying && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsPlaying(false);
          }}
          className="absolute top-4 right-4 z-30 p-2 bg-black/70 hover:bg-black text-white hover:text-br-yellow rounded-full transition-all active:scale-90 flex items-center justify-center cursor-pointer"
          title="Parar Vídeo"
        >
          <X size={16} strokeWidth={3} />
        </button>
      )}

      {/* Main Container */}
      {isPlaying && isVisible ? (
        <div className="absolute inset-0 overflow-hidden bg-black">
          <iframe 
            src={`https://drive.google.com/file/d/${srcId}/preview?autoplay=1`} 
            className="absolute top-1/2 left-1/2 w-[500%] h-[500%] -translate-x-1/2 -translate-y-1/2 border-none scale-[0.2] origin-center"
            title={title}
            allow="autoplay; encrypted-media"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <div 
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-br-green/30 via-br-blue/90 to-br-blue text-center p-6 cursor-pointer select-none group"
        >
          {/* Action icon */}
          <div className="w-20 h-20 rounded-full bg-br-yellow hover:bg-br-yellow/90 text-br-blue flex items-center justify-center shadow-2xl shadow-br-yellow/30 transition-all duration-300 transform group-hover:scale-110 group-active:scale-95 mb-4 relative">
            <span className="absolute inset-0 rounded-full bg-br-yellow animate-ping opacity-25" />
            <Play size={32} className="fill-current text-br-blue ml-1.5" />
          </div>
          
          <span className="text-br-yellow text-xs font-black tracking-[0.25em] uppercase mb-1">Duo Head em Ação</span>
          <h4 className="text-white text-lg font-black italic uppercase leading-tight max-w-[200px]">
            {title}
          </h4>
          <span className="mt-4 text-[10px] text-white/50 font-bold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/10 group-hover:bg-white/10 group-hover:text-white transition-all">
            Clique para Assistir
          </span>
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
                  <div className="aspect-square relative overflow-hidden bg-gray-50">
                    <img 
                      src={getDriveImageUrl(variant.id)} 
                      alt={variant.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    {isBrasil ? (
                      <div className="absolute top-4 left-4 bg-br-yellow text-br-blue px-4 py-2 rounded-full text-xs font-black shadow-lg flex items-center gap-1 z-10">
                        <span className="text-sm">🇧🇷</span> EDIÇÃO ESPECIAL
                      </div>
                    ) : (
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm text-gray-800 z-10">
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
      
      <button 
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-3 rounded-full shadow-xl z-20 hidden md:block hover:bg-gray-50 transition-colors border border-gray-100 cursor-pointer"
        aria-label="Anterior"
      >
        <ChevronRight className="rotate-180" size={24} />
      </button>
      <button 
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white p-3 rounded-full shadow-xl z-20 hidden md:block hover:bg-gray-50 transition-colors border border-gray-100 cursor-pointer"
        aria-label="Próximo"
      >
        <ChevronRight size={24} />
      </button>

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
  const baseStyles = "px-8 py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-2 active:scale-95 text-lg shadow-xl uppercase tracking-tight cursor-pointer";
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
          if (typeof window !== 'undefined' && (window as any).fbq) {
            if (href.includes('wa.me')) {
              (window as any).fbq('track', 'Contact', { content_name: 'WhatsApp Contact' });
            } else if (href.includes('instagram.com')) {
              (window as any).fbq('track', 'CustomEvent', { content_name: 'Instagram View' });
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

interface Product {
  name: string;
  description: string;
  priceOld: string;
  priceNew: string;
  link: string;
  featured?: boolean;
}

const ProductCard = ({ 
  productKey, 
  product, 
  index 
}: { 
  productKey: string; 
  product: Product; 
  index: number; 
  key?: React.Key;
}) => {
  const [selectedColor, setSelectedColor] = useState("Brasil: Verde e Amarelo");

  // Get current purchase url from loaded yampiLinks
  const purchaseUrl = (yampiLinks as any)[productKey]?.[selectedColor] || product.link;

  const oldPriceFloat = parseFloat(product.priceOld.replace(',', '.'));
  const newPriceFloat = parseFloat(product.priceNew.replace(',', '.'));
  const discountPercent = Math.round(((oldPriceFloat - newPriceFloat) / oldPriceFloat) * 100);

  const copaColors = [
    { name: "Brasil: Verde e Amarelo", style: "bg-gradient-to-r from-[#009b3a] to-[#fedf00]" },
    { name: "Brasil: Verde e Azul", style: "bg-gradient-to-r from-[#009b3a] to-[#002776]" },
    { name: "Brasil: Azul e Amarelo", style: "bg-gradient-to-r from-[#002776] to-[#fedf00]" }
  ];

  const premiumColors = [
    { name: "Preto", style: "bg-[#111] border border-gray-400" },
    { name: "Azul Claro", style: "bg-[#0099ff]" },
    { name: "Azul Royal", style: "bg-[#0b1c5c]" },
    { name: "Laranja", style: "bg-[#ff6600]" },
    { name: "Verde Claro", style: "bg-[#1ae5be]" },
    { name: "Verde Escuro", style: "bg-[#015249]" },
    { name: "Verde Limão", style: "bg-[#ccff00]" },
    { name: "Verde Militar", style: "bg-[#4B5320]" },
    { name: "Rosa", style: "bg-[#fc24a7]" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "relative group flex flex-col bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-xl border-2 transition-all duration-300 hover:scale-[1.02]",
        product.featured ? "border-br-yellow ring-4 ring-br-yellow/10" : "border-gray-50"
      )}
    >
      {product.featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-br-yellow text-br-blue font-black px-6 py-2 rounded-full text-xs uppercase tracking-[0.2em] shadow-lg whitespace-nowrap z-10 animate-bounce">
          Destaque da Copa
        </div>
      )}
      
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-black text-br-blue leading-[1.1] mb-2 uppercase italic">{product.name}</h3>
          <p className="text-br-blue/60 text-sm mb-6 font-medium leading-tight">{product.description}</p>
          
          <div className="mb-6 bg-gradient-to-br from-br-green/5 to-br-yellow/5 p-5 rounded-3xl border border-br-green/10 shadow-inner relative overflow-hidden">
            {/* Visual background sparkle/glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-br-green/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs font-bold line-through">De R$ {product.priceOld}</span>
              <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md animate-pulse">
                -{discountPercent}% OFF
              </span>
            </div>
            
            <div className="flex items-baseline gap-1">
              <span className="text-br-blue/40 font-bold text-xs uppercase tracking-wider select-none pr-1">Por apenas</span>
              <span className="text-br-blue font-black text-sm">R$</span>
              <span className="text-4xl md:text-5xl font-black text-br-green tracking-tighter leading-none">{product.priceNew.split(',')[0]}</span>
              <span className="text-xl md:text-2xl font-black text-br-green tracking-tighter">,{product.priceNew.split(',')[1]}</span>
            </div>
            
            <div className="mt-3 pt-3 border-t border-dashed border-br-green/15 flex items-center justify-between text-xs">
              <span className="text-br-green font-black flex items-center gap-1">
                <TrendingUp size={14} strokeWidth={3} /> Economia de R$ {(oldPriceFloat - newPriceFloat).toFixed(2).replace('.', ',')}
              </span>
              <span className="text-br-blue/60 font-semibold uppercase tracking-wider text-[10px]">no PIX / Cartão</span>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-6">
            <p className="text-xs font-black uppercase text-br-green tracking-wider mb-3 flex items-center gap-1">
              <span>🇧🇷</span> EDIÇÃO COPA DO MUNDO:
            </p>
            <div className="flex flex-wrap gap-2.5 mb-5">
              {copaColors.map((color) => {
                const active = selectedColor === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    type="button"
                    className={cn(
                      "relative w-9 h-9 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer",
                      color.style,
                      active 
                        ? "ring-4 ring-br-blue scale-110 shadow-lg shadow-br-blue/20" 
                        : "hover:scale-105 opacity-85 hover:opacity-100 ring-2 ring-gray-200"
                    )}
                  >
                    {active && (
                      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 z-20">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-br-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-br-green border-2 border-white"></span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <label className="block text-xs font-black uppercase text-br-blue/60 tracking-wider mb-2">
              OU OUTRA COR PREMIUM:
            </label>
            <div className="relative">
              <select
                value={premiumColors.some(c => c.name === selectedColor) ? selectedColor : ""}
                onChange={(e) => {
                  if (e.target.value) {
                    setSelectedColor(e.target.value);
                  }
                }}
                className="w-full bg-gray-50 border-2 border-dashed border-gray-200 text-br-blue/80 font-bold py-3 px-4 rounded-xl text-xs appearance-none focus:outline-none focus:border-br-green cursor-pointer"
              >
                <option value="" disabled className="text-gray-400">-- Selecione cores sólidas --</option>
                {premiumColors.map((color) => (
                  <option key={color.name} value={color.name}>
                    {color.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-br-blue/60">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Button 
        href={purchaseUrl} 
        variant={product.featured ? 'yellow' : 'primary'} 
        className="w-full py-5 text-sm font-black shadow-lg transition-all"
        onClick={() => {
          if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'InitiateCheckout', {
              content_name: product.name,
              content_ids: [productKey],
              content_type: 'product',
              value: parseFloat(product.priceNew.replace(',', '.')),
              currency: 'BRL',
              predicted_color: selectedColor
            });
          }
        }}
      >
        Comprar Agora
      </Button>
      
      <div className="mt-3 text-center text-[10px] font-black uppercase tracking-widest text-br-green/80 flex items-center justify-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-br-green" />
        Tom: {selectedColor.replace('Brasil: ', '')}
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 text-br-blue/40 text-[10px] font-bold uppercase tracking-widest">
        <ShieldCheck size={14} className="text-br-green" /> Checkout Seguro Yampi
      </div>
    </motion.div>
  );
};

// --- Main Application ---
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [inIframe, setInIframe] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 15) {
        const isClosed = localStorage.getItem('duohead_promo_closed');
        if (!isClosed) {
          setShowPopup(true);
        }
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    localStorage.setItem('duohead_promo_closed', 'true');
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('PROMO5');
    setCopied(true);
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: 'Duo Head 5% Coupon Copied',
        coupon_code: 'PROMO5'
      });
    }
    setTimeout(() => setCopied(false), 2000);
  };

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
        // Safe block fallback
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
              className="w-full h-auto bg-gray-50"
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
          <div className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-br-green/30 transform rotate-1 bg-gray-50">
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
          {Object.entries((ASSETS as any).PRODUCTS).map(([key, product]: [string, any], i) => (
            <ProductCard
              key={key}
              productKey={key}
              product={product}
              index={i}
            />
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
          <a href={ASSETS.LINKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white/10 text-white transition-all hover:scale-110" aria-label="Instagram"><Instagram /></a>
          <a href={ASSETS.LINKS.WHATSAPP} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-green-500/20 text-white hover:text-[#25D366] transition-all hover:scale-110" aria-label="WhatsApp"><MessageCircle /></a>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-6 left-6 right-6 md:hidden z-50 flex gap-2">
        <Button href={ASSETS.LINKS.WHATSAPP} variant="whatsapp" className="w-16 h-16 p-0 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-2xl">
          <MessageCircle size={32} strokeWidth={2.5} />
        </Button>
        <Button href="#precos" variant="yellow" className="flex-1 shadow-2xl py-5 text-xs rounded-2xl leading-tight">
          ESCOLHER MEU KIT <br /><span className="text-[10px] opacity-80">PROMOÇÃO BRASIL</span>
        </Button>
      </div>

      {/* 5% Discount Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="absolute inset-0 cursor-pointer" onClick={handleClosePopup} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="bg-white rounded-[2rem] border-4 border-br-green/30 p-6 sm:p-8 max-w-md w-full shadow-[0_30px_60px_rgba(0,0,0,0.4)] relative overflow-hidden text-center z-10"
          >
            {/* Background design accents */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-br-yellow/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-br-green/15 rounded-full blur-2xl pointer-events-none" />

            {/* Close button */}
            <button 
              onClick={handleClosePopup}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              aria-label="Configurações de fechar"
            >
              <X size={20} strokeWidth={3} />
            </button>

            {/* Promotion Header Details */}
            <div className="relative z-10">
              <span className="bg-br-green/10 text-br-green font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider inline-block mb-4">
                🇧🇷 Oferta Exclusiva Brasil
              </span>
              <h3 className="text-3xl font-black italic uppercase text-br-blue tracking-tighter leading-none mb-3">
                GANHE 5% DE DESCONTO!
              </h3>
              <p className="text-br-blue/75 font-medium text-sm mb-6 leading-relaxed">
                Parabéns! Você ganhou um cupom de <strong className="text-br-green font-extrabold">5% de desconto</strong> para garantir o seu Duo Head na sua primeira compra!
              </p>

              {/* Coupon Box */}
              <div className="border-2 border-dashed border-br-green/45 rounded-2xl bg-br-green/5 p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <span className="text-[10px] font-black text-br-blue/40 uppercase block tracking-wider">CUPOM DE DESCONTO:</span>
                  <span className="font-mono text-2xl font-black text-br-blue tracking-widest leading-none">PROMO5</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCoupon}
                  className={cn(
                    "w-full sm:w-auto px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md",
                    copied 
                      ? "bg-br-green text-white" 
                      : "bg-br-blue hover:bg-br-blue/90 text-white active:scale-95"
                  )}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 size={14} strokeWidth={3} />
                      COPIADO!
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={14} strokeWidth={3} />
                      COPIAR CÓDIGO
                    </>
                  )}
                </button>
              </div>

              {/* CTA and Skip Buttons */}
              <div className="flex flex-col gap-3">
                <Button 
                  href="#precos" 
                  onClick={handleClosePopup}
                  variant="yellow"
                  className="w-full py-4 text-sm font-black shadow-md uppercase tracking-wider"
                >
                  APROVEITAR DESCONTO ⚡
                </Button>
                
                <button
                  onClick={handleClosePopup}
                  className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors underline cursor-pointer mt-1"
                >
                  Prefiro pagar o preço normal sem desconto
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}

// Missing inline component for delivery section map pin
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
