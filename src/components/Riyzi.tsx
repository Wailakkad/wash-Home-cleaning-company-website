"use client";
import React, { useState, useEffect, } from 'react';
import { 
  Car, Building, Home, Sparkles, CheckCircle, Star, 
  Phone, Mail, MapPin, MessageCircle, ArrowRight, 
  Shield, Clock, Award, Droplet, ChevronLeft, ChevronRight,
  Facebook, Instagram, Linkedin, Play , Menu, X
} from 'lucide-react';

// Custom hook for intersection observer
const useInView = (threshold = 0.1, rootMargin = '0px') => {
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold, rootMargin }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  return [setRef, isInView];
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView(0.5);

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
};


// Modern Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = ['Accueil', 'Services', 'Galerie', 'Contact'];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled 
                ? 'bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent' 
                : 'text-white'
            }`}>
              RIYZI WASH
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase()}`}
                className={`font-medium transition-colors duration-300 hover:scale-105 transform ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className={`flex items-center space-x-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
              isScrolled
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}>
              <MessageCircle size={18} />
              <span>WhatsApp</span>
            </button>
            
            <button className={`flex items-center space-x-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
              isScrolled
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-sky-500 hover:bg-sky-600 text-white'
            }`}>
              <Phone size={18} />
              <span>Téléphoner</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled 
                ? 'text-gray-700 hover:text-blue-600' 
                : 'text-white hover:text-sky-300'
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-xl transition-all duration-300 ${
            isScrolled ? 'bg-white' : 'bg-white/95 backdrop-blur-md'
          }`}>
            <nav className="p-6 space-y-4">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              
              <div className="border-t pt-4 space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full font-semibold transition-colors duration-300">
                  <MessageCircle size={18} />
                  <span>WhatsApp</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full font-semibold transition-colors duration-300">
                  <Phone size={18} />
                  <span>Téléphoner</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Updated Hero Section Component with 2-column layout
const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-sky-600">
      {/* Animated Background Elements - Preserve existing */}
     
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10 animate-float"
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${20 + ((i % 4) * 20)}%`,
              transform: `translate(${mousePosition.x * (i % 2 === 0 ? 1 : -1)}px, ${mousePosition.y * (i % 3 === 0 ? 1 : -1)}px)`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${4 + (i % 3)}s`
            }}
          >
            <div className="w-16 h-16 bg-white/20 rounded-full blur-sm"></div>
          </div>
        ))}
        
        {/* Steam Effect - Preserve existing */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-steam opacity-30"
              style={{
                left: `${15 + i * 15}%`,
                bottom: '-10%',
                animationDelay: `${i * 0.8}s`,
                animationDuration: '6s'
              }}
            >
              <div className="w-2 h-32 bg-gradient-to-t from-white/40 to-transparent rounded-full blur-sm"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        {/* New 2-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          
          {/* Left Column - Hero Content */}
          <div className="text-center lg:text-left">
            <div 
              className={`transform transition-all duration-1000 ease-out ${
                isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
              }`}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">
                  RIYZI
                </span>
                <span className="block text-sky-300 text-4xl md:text-5xl lg:text-6xl font-light">
                  WASH
                </span>
              </h1>
            </div>

            <div 
              className={`transform transition-all duration-1000 delay-300 ease-out ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <p className="text-lg md:text-xl text-blue-100 mb-4 leading-relaxed">
                Excellence en nettoyage à vapeur
              </p>
              <p className="text-base md:text-lg text-blue-200/80 mb-8">
                Solutions professionnelles sans produits chimiques pour votre domicile et entreprise
              </p>
            </div>

            <div 
              className={`transform transition-all duration-1000 delay-600 ease-out ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="group bg-sky-400 hover:bg-sky-300 text-blue-900 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg">
                  Réserver maintenant
                  <ArrowRight className="inline ml-3 transition-transform duration-300 group-hover:translate-x-1" size={20} />
                </button>
                
                <button className="group border-2 border-white/30 hover:border-white/60 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                  <Play className="inline mr-3 transition-transform duration-300 group-hover:scale-110" size={18} />
                  Voir nos services
                </button>
              </div>
            </div>

            {/* Stats - Preserve existing */}
            <div 
              className={`grid grid-cols-3 gap-6 mt-16 transform transition-all duration-1000 delay-900 ease-out ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                  <AnimatedCounter end={500} />+
                </div>
                <p className="text-blue-200 text-xs md:text-sm">Clients satisfaits</p>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                  <AnimatedCounter end={99} />%
                </div>
                <p className="text-blue-200 text-xs md:text-sm">Satisfaction</p>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                  <AnimatedCounter end={24} />/7
                </div>
                <p className="text-blue-200 text-xs md:text-sm">Disponibilité</p>
              </div>
            </div>
          </div>

          {/* Right Column - Mascot Image */}
          <div className="flex justify-center lg:justify-end">
            <div 
              className={`transform transition-all duration-1000 delay-400 ease-out ${
                isLoaded ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-12 opacity-0 scale-95'
              }`}
            >
              <div className="relative">
                {/* Glow effect behind mascot */}
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400/30 to-blue-500/30 rounded-full blur-3xl scale-110"></div>
                
                {/* Mascot Image */}
                <img
                  src="/img.jpeg"
                  alt="Mascotte Riyzi Wash holding sponge"
                  className="relative max-h-[500px] lg:max-h-[600px] w-auto rounded-lg drop-shadow-2xl object-contain hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating elements around mascot */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400/80 rounded-full animate-bounce"></div>
                <div className="absolute top-1/3 -left-6 w-6 h-6 bg-sky-300/80 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-8 w-4 h-4 bg-white/80 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Preserve existing */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-16 bg-gradient-to-b from-white/60 to-transparent rounded-full"></div>
      </div>
    </section>
  );
};

// Services Section Component
const ServicesSection = () => {
  const [ref, isInView] = useInView(0.2);

  const services = [
    {
      icon: Droplet,
      title: "Nettoyage vapeur",
      description: "Technologie avancée 100% écologique pour un nettoyage en profondeur sans produits chimiques",
      gradient: "from-blue-500 to-sky-400"
    },
    {
      icon: Car,
      title: "Lavage véhicules",
      description: "Intérieur et extérieur, votre véhicule retrouve son éclat d'origine avec notre méthode vapeur",
      gradient: "from-sky-500 to-cyan-400"
    },
    {
      icon: Building,
      title: "Nettoyage bureaux",
      description: "Environnement professionnel sain et impeccable pour la productivité de vos équipes",
      gradient: "from-cyan-500 to-blue-400"
    },
    {
      icon: Home,
      title: "Nettoyage maisons",
      description: "Votre foyer mérite le meilleur, de la cave au grenier avec attention aux détails",
      gradient: "from-blue-600 to-sky-500"
    },
    {
      icon: Sparkles,
      title: "Surfaces diverses",
      description: "Solutions adaptées pour tous matériaux : textile, bois, carrelage, pierre naturelle",
      gradient: "from-sky-600 to-cyan-500"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-20 transform transition-all duration-1000 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Nos <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Des solutions complètes et innovantes pour tous vos besoins de nettoyage
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-700 hover:-translate-y-2 ${
                isInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)'
              }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="text-white" size={28} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>

              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-sky-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  const [ref, isInView] = useInView(0.3);

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div className={`relative transform transition-all duration-1000 ${
  isInView ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
}`}>
  <div className="relative">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-sky-100 rounded-3xl transform rotate-6"></div>
    <div 
      className="relative rounded-3xl min-h-[400px] overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: 'url(/new.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-slate-900/60 to-black/70"></div>
      
      {/* Content */}
      <div className="relative flex items-center justify-center min-h-[400px] p-12">
        <div className="text-center">
          <div className="bg-white/20 backdrop-blur-lg rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/30">
            <Droplet className="text-white drop-shadow-lg" size={40} />
          </div>
          <div className="text-white text-2xl font-bold drop-shadow-lg">10+ Années</div>
          <div className="text-blue-100 drop-shadow-md">d'Excellence</div>
        </div>
      </div>
    </div>
  </div>
</div>
          
          <div className={`transform transition-all duration-1000 delay-300 ${
            isInView ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
          }`}>
            <h2 className="text-4xl font-bold text-gray-900  mb-8">
              L'Excellence du 
              <span className="block bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text  text-transparent">
                Nettoyage Vapeur
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Pionniers du nettoyage à vapeur au Maroc, nous révolutionnons l'industrie avec 
              des techniques écologiques et des résultats exceptionnels.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Notre mission : offrir un service premium qui dépasse vos attentes, 
              tout en préservant votre santé et l'environnement.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                <span className="text-gray-700 font-medium">100% Écologique</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                <span className="text-gray-700 font-medium">Équipe Certifiée</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                <span className="text-gray-700 font-medium">Résultats Garantis</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                <span className="text-gray-700 font-medium">Service Premium</span>
              </div>
            </div>
            
            <button className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Découvrir notre histoire
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Section
const WhyChooseUsSection = () => {
  const [ref, isInView] = useInView(0.2);

  const features = [
    {
      icon: Droplet,
      title: "100% Vapeur",
      description: "Nettoyage sans produits chimiques, respectueux de votre santé et de l'environnement",
      color: "text-blue-600"
    },
    {
      icon: Shield,
      title: "Équipe Professionnelle",
      description: "Techniciens formés et certifiés pour un service de qualité supérieure",
      color: "text-green-600"
    },
    {
      icon: Clock,
      title: "Déplacement Rapide",
      description: "Intervention dans les 24h, ponctualité et flexibilité garanties",
      color: "text-orange-600"
    },
    {
      icon: Award,
      title: "Satisfaction Garantie",
      description: "Engagement qualité avec garantie satisfaction ou remboursement",
      color: "text-purple-600"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-20 transform transition-all duration-1000 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Pourquoi 
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent"> Nous Choisir</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des avantages uniques qui font toute la différence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-700 hover:-translate-y-3 ${
                isInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`w-16 h-16 ${feature.color} bg-gray-100 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all duration-300 shadow-md`}>
                <feature.icon size={32} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Gallery Slider Section
const GallerySection = () => {
   const [ref, isInView] = useInView(0.2); // <-- FIXED
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const projects = [
    { 
      id: 1, 
      title: "Nettoyage Bureau Premium", 
      category: "Commercial", 
      before: "Avant", 
      after: "Après",
      image: "/bureaux.jpg"
    },
    { 
      id: 2, 
      title: "Restauration Véhicule", 
      category: "Automobile", 
      before: "Avant", 
      after: "Après",
      image: "/car.jpg"
    },
    { 
      id: 3, 
      title: "Rénovation Maison", 
      category: "Résidentiel", 
      before: "Avant", 
      after: "Après",
      image: "/Home.jpg"
    },
    { 
      id: 4, 
      title: "Nettoyage Industriel", 
      category: "Industrie", 
      before: "Avant", 
      after: "Après",
      image: "/indis.jpg"
    }
  ];

  useEffect(() => {
    if (!isAutoplay) return;
    
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % projects.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [isAutoplay, projects.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Nos <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Réalisations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des transformations spectaculaires qui parlent d'elles-mêmes
          </p>
        </div>

       <div className="relative max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={project.id} className="w-full flex-shrink-0 group">
                  <div 
                    className="relative aspect-video overflow-hidden bg-cover bg-center bg-no-repeat transform transition-all duration-500 hover:scale-105"
                    style={{ 
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-900/50 to-black/60 transition-all duration-500 group-hover:from-blue-900/30 group-hover:via-slate-900/40 group-hover:to-black/50"></div>
                    
                    {/* Hover brightness overlay */}
                    <div className="absolute inset-0 bg-white/0 transition-all duration-500 group-hover:bg-white/10"></div>
                    
                    {/* Content positioned on top */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-12 transform transition-all duration-500 group-hover:scale-105">
                        <div className="bg-white/20 backdrop-blur-lg rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/30 transition-all duration-500 group-hover:bg-white/30 group-hover:scale-110">
                          <Sparkles className="text-white drop-shadow-lg" size={40} />
                        </div>
                        
                        <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg tracking-wide">
                          {project.title}
                        </h3>
                        
                        <p className="text-sky-200 font-semibold mb-6 text-lg drop-shadow-md">
                          {project.category}
                        </p>
                        
                        <div className="flex justify-center">
                          <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-blue-50 border border-blue-100">
                            Voir les détails
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Subtle gradient borders for 3D effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-blue-600 p-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-blue-200/50 backdrop-blur-sm border border-white/50"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-blue-600 p-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-blue-200/50 backdrop-blur-sm border border-white/50"
          >
            <ChevronRight size={24} />
          </button>

          {/* Enhanced Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative transition-all duration-500 rounded-full ${
                  index === currentSlide 
                    ? 'w-12 h-3 bg-gradient-to-r from-blue-600 to-sky-500 shadow-lg shadow-blue-500/30' 
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 hover:scale-125 shadow-md'
                }`}
              >
                {index === currentSlide && (
                  <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
    const [ref, isInView] = useInView(0.2);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Fatima Zahra",
      role: "Directrice Générale",
      company: "TechCorp Maroc",
      content: "RIYZI WASH a transformé nos bureaux ! Le nettoyage à vapeur est révolutionnaire. Aucun produit chimique, résultat impeccable. Notre équipe travaille dans un environnement plus sain.",
      rating: 5,
      image: "/testimonial1.jpeg"
    },
    {
      name: "Hassan Benali",
      role: "Propriétaire",
      company: "Villa Anfa",
      content: "Service exceptionnel pour ma maison. L'équipe est professionnelle, ponctuelle et le résultat dépasse mes attentes. Je recommande vivement RIYZI WASH à tous mes proches.",
      rating: 5,
      image: "/testimonial2.jpg"
    },
    {
      name: "Aicha Kassimi",
      role: "Responsable Flotte",
      company: "Transport Elite",
      content: "Nos véhicules n'ont jamais été aussi propres ! Le service de lavage intérieur/extérieur est parfait. Relation client exceptionnelle, je suis conquise par leur professionnalisme.",
      rating: 5,
      image: "/testimonial3.jpeg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-sky-50/50"></div>
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => {
          // Fixed positions to avoid hydration mismatch
          const positions = [
            { left: '15%', top: '20%' },
            { left: '75%', top: '10%' },
            { left: '25%', top: '70%' },
            { left: '85%', top: '60%' },
            { left: '45%', top: '30%' },
            { left: '65%', top: '80%' }
          ];
          return (
            <div
              key={i}
              className="absolute w-32 h-32 bg-blue-100/20 rounded-full blur-3xl animate-pulse"
              style={{
                left: positions[i].left,
                top: positions[i].top,
                animationDelay: `${i * 2}s`,
                animationDuration: `${4 + i}s`
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Témoignages <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Clients</span>
          </h2>
          <p className="text-xl text-gray-600">La satisfaction client au cœur de notre mission</p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className={`bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 m-15 transform transition-all duration-1000 ${
                    isInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}>
                    <div className="text-center">
                      {/* Profile Image */}
                      <div className="relative mx-auto mb-8 w-24 h-24">
                        <div 
                          className="w-full h-full rounded-full bg-cover bg-center bg-gray-200 border-4 border-white shadow-xl"
                          style={{ backgroundImage: `url(${testimonial.image})` }}
                        />
                        <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                          <Star className="w-4 h-4 fill-current" />
                        </div>
                      </div>
                      
                      {/* Rating Stars */}
                      <div className="flex justify-center mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="text-yellow-400 fill-current w-6 h-6 mx-0.5" />
                        ))}
                      </div>
                      
                      {/* Testimonial Content */}
                      <blockquote className="text-lg text-gray-700 mb-8 italic leading-relaxed max-w-2xl mx-auto">
                        "{testimonial.content}"
                      </blockquote>
                      
                      {/* Client Info */}
                      <div className="border-t border-gray-200/50 pt-6">
                        <h4 className="font-bold text-gray-900 text-xl mb-1">{testimonial.name}</h4>
                        <p className="text-blue-600 font-semibold text-lg">{testimonial.role}</p>
                        <p className="text-gray-500">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white/90 hover:bg-white text-blue-600 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/50 z-10"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white/90 hover:bg-white text-blue-600 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/50 z-10"
          >
            <ChevronRight size={24} />
          </button>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`relative transition-all duration-500 rounded-full ${
                  index === currentTestimonial 
                    ? 'w-12 h-3 bg-gradient-to-r from-blue-600 to-sky-500 shadow-lg shadow-blue-500/30' 
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 hover:scale-125 shadow-md'
                }`}
              >
                {index === currentTestimonial && (
                  <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA Section Component
const CTASection = () => {
 const [ref, isInView] = useInView(0.2);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden min-h-[600px]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/cleaning-hero-bg.jpg)' }}
      />
      
      {/* Blue Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-sky-800/75 to-cyan-700/70"></div>

      {/* Animated Elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10 animate-pulse"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.2}s`
            }}
          >
            <div className="w-20 h-20 bg-white rounded-full blur-sm"></div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center max-w-4xl mx-auto transform transition-all duration-1000 ${
          isInView ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
        }`}>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight drop-shadow-2xl">
            Transformez Vos Espaces
            <span className="block text-sky-200">Dès Aujourd'hui</span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Rejoignez plus de 500 clients satisfaits qui nous font confiance pour leurs besoins de nettoyage premium
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button className="group relative bg-white text-blue-600 hover:bg-gray-50 font-bold py-5 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/25 overflow-hidden">
              <span className="relative z-10 flex items-center">
                Obtenir un devis gratuit
                <ArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" size={24} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-sky-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="group relative border-2 border-white/80 hover:border-white text-white hover:bg-white/20 font-semibold py-5 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm overflow-hidden">
              <span className="relative z-10 flex items-center">
                <Phone className="mr-3 transition-transform duration-300 group-hover:scale-110" size={20} />
                Appeler maintenant
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/30">
            {[
              { value: "Gratuit", desc: "Devis sans engagement" },
              { value: "24h", desc: "Intervention rapide" },
              { value: "100%", desc: "Satisfaction garantie" }
            ].map((item, index) => (
              <div key={index} className="text-center transform transition-all duration-500 hover:scale-105">
                <div className="text-4xl font-bold text-white mb-2 drop-shadow-lg">{item.value}</div>
                <p className="text-blue-100 text-sm drop-shadow-md">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
   const [ref, isInView] = useInView(0.2);
  const [email, setEmail] = useState('');

  const quickLinks = [
    "Accueil", "Services", "À propos", "Réalisations", "Contact"
  ];

  const services = [
    "Nettoyage vapeur", "Lavage véhicules", "Nettoyage bureaux", "Nettoyage maisons"
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail('');
  };

  return (
    <footer ref={ref} className="relative overflow-hidden">
      {/* Glass Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-sky-900/20"></div>
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className={`py-20 transform transition-all duration-1000 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <div className="grid lg:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-8">
                <h3 className="text-4xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
                    RIYZI WASH
                  </span>
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Excellence en nettoyage à vapeur. Votre partenaire de confiance pour des solutions de nettoyage écologiques et professionnelles.
                </p>
              </div>
              
              {/* Social Media */}
              <div className="flex space-x-4">
                {[
                  { Icon: Facebook, color: 'bg-blue-600 hover:bg-blue-700' },
                  { Icon: Instagram, color: 'bg-pink-600 hover:bg-pink-700' },
                  { Icon: MessageCircle, color: 'bg-green-600 hover:bg-green-700' },
                  { Icon: Linkedin, color: 'bg-blue-500 hover:bg-blue-600' }
                ].map(({ Icon, color }, index) => (
                  <div key={index} className={`group ${color} p-3 rounded-xl transition-all duration-300 transform hover:scale-110 cursor-pointer shadow-lg hover:shadow-xl`}>
                    <Icon className="text-white group-hover:scale-110 transition-transform duration-300" size={20} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-blue-300">Navigation</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group py-1"
                    >
                      <ArrowRight className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" size={16} />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-blue-300">Services</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group py-1"
                    >
                      <ArrowRight className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" size={16} />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{service}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-blue-300">Contact</h4>
              <div className="space-y-4 mb-8">
                {[
                  { Icon: Phone, title: "+2126 63 17 05 39", desc: "Disponible 24/7" },
                  { Icon: Mail, title: "rizyiwash@gmail.com", desc: "Réponse sous 24h" },
                  { Icon: MapPin, title: "Moroc", desc: "Casablanca-Settat, Maroc" }
                ].map(({ Icon, title, desc }, index) => (
                  <div key={index} className="flex items-start space-x-3 group">
                    <div className="bg-blue-600/20 p-2 rounded-lg group-hover:bg-blue-600/30 transition-colors duration-300 border border-blue-500/20">
                      <Icon className="text-blue-400" size={18} />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{title}</p>
                      <p className="text-gray-400 text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Newsletter */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h5 className="text-white font-semibold mb-3">Newsletter</h5>
                <p className="text-gray-400 text-sm mb-4">Recevez nos dernières offres</p>
                <form onSubmit={handleNewsletterSubmit} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    className="flex-1 bg-white/10 border border-white/20 rounded-l-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-300"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-xl transition-colors duration-300 border border-blue-600"
                  >
                    <ArrowRight size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t border-gray-800/50 py-8 transform transition-all duration-1000 delay-300 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              <p>&copy; 2025 RIYZI WASH. Tous droits réservés.</p>
              <p className="text-sm mt-1">Conçu avec ❤️ pour l'excellence</p>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Conditions d'utilisation
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


// Main Landing Page Component
const RiyziWashLanding = () => {
  useEffect(() => {
    // Add custom CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      
      @keyframes steam {
        0% { transform: translateY(0px) scaleX(1); opacity: 0.3; }
        50% { transform: translateY(-100px) scaleX(1.5); opacity: 0.6; }
        100% { transform: translateY(-200px) scaleX(2); opacity: 0; }
      }
      
      .animate-float {
        animation: float ease-in-out infinite;
      }
      
      .animate-steam {
        animation: steam ease-out infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* SEO Meta Tags (would be in Next.js Head in real implementation) */}
      <div style={{ display: 'none' }}>
        <title>RIYZI WASH | Nettoyage vapeur professionnel</title>
        <meta name="description" content="Service de nettoyage à domicile et vapeur haut de gamme" />
      </div>
      
      <div className="min-h-screen">
         <Header/>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <WhyChooseUsSection />
        <GallerySection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
};

export default RiyziWashLanding;