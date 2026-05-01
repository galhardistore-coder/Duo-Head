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
import { cn, ASSETS, getDriveImageUrl, getDriveViewerUrl } from './lib/utils';

// --- Components ---

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
        <div className="absolute inset-0 scale-[1.1] origin-center">
          <iframe 
            src={`https://drive.google.com/file/d/${srcId}/preview?autoplay=1&mute=1`} 
            className="absolute top-[-20%] left-[-10%] w-[120%] h-[140%] border-none shadow-none pointer-events-none"
            title={title}
            allow="autoplay; encrypted-media"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-900 group cursor-pointer">
          <div className="bg-white/10 p-6 rounded-full backdrop-blur-sm animate-pulse">
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
    <div className="fixed top-0 left-0 right-0 z-[60] bg-black/90 backdrop-blur-sm py-2 px-4 border-b border-white/10 flex items-center justify-center gap-3 shadow-xl">
      <div className="flex items-center gap-2">
        <Clock size={16} className="text-[#25D366] animate-pulse" />
        <p className="text-white text-[10px] md:text-sm font-bold uppercase tracking-widest">
          Oferta Especial termina em:
        </p>
      </div>
      <div className={cn(
        "text-xl md:text-2xl font-mono font-black tabular-nums min-w-[70px] text-center",
        timeLeft < 60 ? "text-red-500 animate-pulse" : "text-[#25D366]"
      )}>
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

const VariationCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="relative group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {ASSETS.IMAGES.VARIATIONS.map((variant, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.33%]">
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg h-full border border-gray-100"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={getDriveImageUrl(variant.id)} 
                    alt={variant.name} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    Disponível
                  </div>
                </div>
                <div className="p-6 text-center">
                  <p className="font-bold text-xl">{variant.name}</p>
                  <p className="text-sm text-gray-500 mt-1">Duo Head Exclusive</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <button 
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-3 rounded-full shadow-xl z-10 hidden md:block hover:bg-gray-50 transition-colors border border-gray-100"
      >
        <ChevronRight className="rotate-180" size={24} />
      </button>
      <button 
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white p-3 rounded-full shadow-xl z-10 hidden md:block hover:bg-gray-50 transition-colors border border-gray-100"
      >
        <ChevronRight size={24} />
      </button>

      {/* Progress Dots / Visual Indicator */}
      <div className="flex justify-center gap-2 mt-8 md:hidden">
        {ASSETS.IMAGES.VARIATIONS.map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-gray-300" />
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
  variant?: 'primary' | 'whatsapp' | 'outline' | 'secondary';
  onClick?: () => void;
  href?: string;
}) => {
  const baseStyles = "px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95 text-lg shadow-lg";
  const variants = {
    primary: "bg-[#111] text-white hover:bg-black",
    whatsapp: "bg-[#25D366] text-white hover:bg-[#21b558]",
    secondary: "bg-[#007BFF] text-white hover:bg-[#0069d9]",
    outline: "border-2 border-[#111] text-[#111] hover:bg-[#111] hover:text-white"
  };

  const Content = () => <>{children}</>;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(baseStyles, variants[variant], className)}>
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
  <section id={id} className={cn("py-20 px-6", dark ? "bg-[#111] text-white" : "bg-transparent", className)}>
    <div className="max-w-6xl mx-auto">
      {children}
    </div>
  </section>
);

const SectionTitle = ({ children, centered = true }: { children: React.ReactNode; centered?: boolean }) => (
  <h2 className={cn("text-3xl md:text-5xl font-bold mb-12 tracking-tight", centered && "text-center")}>
    {children}
  </h2>
);

// --- Main Application ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#111] font-sans overflow-x-hidden">
      
      <CountdownTimer />
      
      {/* Header / Nav */}
      <nav className={cn(
        "fixed top-12 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 flex justify-between items-center",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xl">D</span>
          </div>
          <span className="font-black text-2xl tracking-tighter">DUO HEAD</span>
        </div>
        <div className="hidden md:flex gap-4">
          <Button href={ASSETS.LINKS.WHATSAPP} variant="outline" className="px-5 py-2 text-sm shadow-none">
            Falar no WhatsApp
          </Button>
        </div>
      </nav>

      {/* 1. HERO */}
      <section className="pt-48 pb-16 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-[#111] text-white text-xs font-bold px-3 py-1 rounded-full mb-6 tracking-widest uppercase">
              Inovação no Brasil 🇧🇷
            </span>
            <h1 className="text-4xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
              Raspe sua cabeça com <br />
              <span className="text-[#25D366]">perfeição e autonomia</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
              O SUPORTE DUPLO DUO HEAD é o acessório revolucionário em impressão 3D que permite alcançar todas as áreas sozinho, garantindo um resultado de barbeiro em casa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-16 justify-center">
              <Button href={ASSETS.LINKS.SHOPEE} variant="primary" className="w-full sm:w-auto">
                <ShoppingBag size={20} /> Comprar agora
              </Button>
              <Button href={ASSETS.LINKS.WHATSAPP} variant="whatsapp" className="w-full sm:w-auto">
                <MessageCircle size={20} /> Comprar no WhatsApp
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
        <SectionTitle>Design funcional para o seu dia a dia</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ASSETS.IMAGES.GALLERY.map((id, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="aspect-square rounded-2xl overflow-hidden shadow-md"
            >
              <img 
                src={getDriveImageUrl(id)} 
                alt="Duo Head em uso" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 3. PROBLEMA vs 4. SOLUÇÃO */}
      <Section className="bg-[#111] text-white">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#007BFF] font-bold mb-4 block">Cansado de depender de outras pessoas?</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">A dificuldade de raspar a própria cabeça acabou.</h2>
            <ul className="space-y-6">
              {[
                "Dificuldade para raspar a parte de trás",
                "Dependência de outra pessoa ou do barbeiro",
                "Resultado falhado e com falhas visíveis",
                "Gasto frequente e desnecessário",
                "Falta de praticidade no seu tempo"
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="mt-1 text-red-500 bg-red-500/10 p-1 rounded-full">
                    <X size={16} />
                  </div>
                  <span className="text-xl text-gray-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#25D366]/20 to-transparent rounded-3xl blur-2xl" />
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10"
            >
               <img 
                src={getDriveImageUrl(ASSETS.IMAGES.PRODUCT)} 
                alt="Solução Duo Head" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-[#25D366] font-bold text-2xl">Conheça o DUO HEAD</p>
                <p className="text-gray-300">A peça que faltava para sua autonomia.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* 5. BENEFÍCIOS */}
      <Section id="beneficios">
        <SectionTitle>Por que escolher o <span className="text-[#25D366]">Duo Head?</span></SectionTitle>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Autonomia Total", icon: <ShieldCheck size={32} />, desc: "Não dependa de ninguém para cuidar da sua imagem." },
            { title: "Economia Real", icon: <TrendingUp size={32} />, desc: "Pague uma vez e economize centenas de reais em barbeiros." },
            { title: "Alcança Tudo", icon: <CheckCircle2 size={32} />, desc: "Chega nas áreas mais difíceis com controle absoluto." },
            { title: "Praticidade", icon: <Clock size={32} />, desc: "Fique pronto em minutos, no conforto da sua casa." },
            { title: "Resultado Uniforme", icon: <UserCheck size={32} />, desc: "Corte profissional, sem falhas e sem stress." },
            { title: "Compacto", icon: <Smartphone size={32} />, desc: "Design inteligente que cabe em qualquer lugar." }
          ].map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="text-[#25D366] mb-6 inline-block p-4 bg-[#25D366]/10 rounded-2xl">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 6. DIFERENCIAIS */}
      <Section className="bg-white overflow-hidden">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
            <img 
              src={getDriveImageUrl(ASSETS.IMAGES.DIFFERENTIALS)} 
              alt="Diferenciais" 
              className="w-full h-auto"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div>
            <SectionTitle centered={false}>O que nos torna <br /><span className="text-[#007BFF]">exclusivos?</span></SectionTitle>
            <div className="space-y-6">
              {[
                { label: "Fabricação", value: "Impressão 3D de Alta Resistência" },
                { label: "Disponibilidade", value: "Estoque no Brasil para Entrega Rápida" },
                { label: "Entrega em mãos", value: "Opção de retirada direta com o vendedor" },
                { label: "Atendimento", value: "Personalizado via WhatsApp" },
                { label: "Design", value: "Focado em ergonomia e durabilidade" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-center p-4 bg-[#F5F5F5] rounded-xl">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <CheckCircle2 size={20} className="text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">{item.label}</p>
                    <p className="text-lg font-bold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 7. PROVA SOCIAL */}
      <Section className="bg-[#f8f9fa]">
        <SectionTitle>Quem usa, aprova!</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm relative border-l-8 border-[#25D366]">
              <p className="text-xl italic mb-6">"Mudou minha rotina. Antes eu tinha medo de raspar sozinho e ficar buracos, agora o Duo Head faz o guia perfeito. Economizo muito com barbeiro."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold">R</div>
                <div>
                  <p className="font-bold">Ricardo Santos</p>
                  <p className="text-sm text-gray-500">Curitiba, PR</p>
                </div>
              </div>
            </div>
            <Button href={ASSETS.LINKS.INSTAGRAM} variant="outline" className="w-full">
              <Instagram size={20} /> Ver mais no Instagram
            </Button>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src={getDriveImageUrl(ASSETS.IMAGES.SOCIAL_PROOF)} 
              alt="Prova social" 
              className="w-full h-auto"
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

      {/* 9. VÍDEOS DE DEMONSTRAÇÃO */}
      <Section className="bg-[#111] text-white">
        <SectionTitle>Veja o Duo Head em ação</SectionTitle>
        <div className="max-w-4xl mx-auto">
          <VideoPlayer 
            srcId={ASSETS.VIDEOS.SEC1} 
            title="Demonstração Prática"
          />
        </div>
      </Section>

      {/* 10, 12. OFERTA & ESCASSEZ */}
      <Section className="bg-[#25D366]/5 relative">
        <div className="bg-[#111] text-white rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366]/20 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#007BFF]/20 blur-[100px]" />
          
          <span className="text-[#25D366] font-bold tracking-widest uppercase mb-4 block">Lote de produção limitado</span>
          <h2 className="text-4xl md:text-7xl font-bold mb-8">Comece a economizar hoje mesmo!</h2>
          
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="flex items-baseline gap-2">
              <span className="text-gray-400 text-2xl line-through">R$ 79,90</span>
            </div>
            <div className="bg-white/10 px-8 py-4 rounded-2xl flex flex-col items-center">
              <span className="text-gray-300 font-bold">Por apenas</span>
              <p className="text-5xl md:text-8xl font-black text-[#25D366]">R$ 34,90</p>
              <span className="text-gray-400">Preço de lançamento</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={ASSETS.LINKS.SHOPEE} className="bg-white text-[#111] hover:bg-gray-100 flex-1 py-6 h-auto">
              COMPRAR AGORA (SHOPEE)
            </Button>
            <Button href={ASSETS.LINKS.WHATSAPP} variant="whatsapp" className="flex-1 py-6 h-auto">
              COMPRAR VIA WHATSAPP
            </Button>
          </div>
          
          <p className="mt-12 text-sm text-gray-500 flex items-center justify-center gap-2">
            <Clock size={16} /> Restam poucas unidades deste lote. Envio imediato.
          </p>
        </div>
      </Section>

      {/* 11. ENTREGA & INFOS */}
      <Section className="bg-white border-b border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-[#F5F5F5] p-6 rounded-full mb-6">
              <Package size={40} className="text-[#111]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Envio Rápido</h3>
            <p className="text-gray-600">Produto a pronta entrega para todo o Brasil.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-[#25D366]/10 p-6 rounded-full mb-6">
              <MapPin size={40} className="text-[#25D366]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Retirada em Mãos</h3>
            <p className="text-gray-600">Disponível em locais selecionados. Consulte via WhatsApp.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-[#007BFF]/10 p-6 rounded-full mb-6">
              <ShieldCheck size={40} className="text-[#007BFF]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Garantia Duo Head</h3>
            <p className="text-gray-600">Qualidade garantida com suporte pós-venda.</p>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#F5F5F5] text-center text-gray-500 border-t border-gray-200 pb-32">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">D</span>
          </div>
          <span className="font-black text-xl tracking-tighter text-[#111]">DUO HEAD</span>
        </div>
        <p className="mb-4">© 2026 Duo Head Brasil - Todos os direitos reservados.</p>
        <div className="flex justify-center gap-6">
          <a href={ASSETS.LINKS.INSTAGRAM} className="hover:text-[#111] transition-colors"><Instagram /></a>
          <a href={ASSETS.LINKS.WHATSAPP} className="hover:text-[#25D366] transition-colors"><MessageCircle /></a>
        </div>
      </footer>

      {/* 13. STICKY MOBILE CTA */}
      <div className="fixed bottom-6 left-6 right-6 md:hidden z-50 flex gap-2">
        <Button href={ASSETS.LINKS.SHOPEE} className="flex-1 shadow-2xl py-5 text-base rounded-2xl">
          Comprar
        </Button>
        <Button href={ASSETS.LINKS.WHATSAPP} variant="whatsapp" className="flex-1 shadow-2xl py-5 text-base rounded-2xl">
          WhatsApp
        </Button>
      </div>

    </div>
  );
}

// Missing component for delivery section
const MapPin = ({ size, className }: { size: number, className: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
