import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Gestion du scroll pour l'effet Glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'À propos', href: '#about' },
    { name: 'Réalisations', href: '#projects' },
    { name: 'Expertise', href: '#skills' }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-background/70 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div 
          className={`max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'py-4' : 'py-6'
          }`}
          style={{ paddingTop: `calc(${isScrolled ? '1rem' : '1.5rem'} + env(safe-area-inset-top))` }}
        >
          
          {/* Logo */}
          <a href="#" className="relative z-50 flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="Logo Williams Biamou" 
              className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                // Fallback text if logo isn't found
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span className="hidden text-xl font-serif font-bold text-white tracking-wide">
              Williams <span className="text-accent">.</span>
            </span>
          </a>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Bouton Contact Desktop */}
          <div className="hidden md:block">
            <a 
              href="#contact"
              className="group relative flex items-center justify-center gap-2 px-6 py-2.5 bg-accent text-background text-sm font-semibold rounded-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(0,168,204,0.4)] active:scale-95"
            >
              <div className="absolute inset-0 bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <span className="relative z-10">Contact</span>
            </a>
          </div>

          {/* Bouton Menu Hamburger (Mobile) */}
          <button 
            className="md:hidden relative z-50 p-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* Menu Mobile Overlay */}
      <div 
        className={`fixed inset-0 z-40 md:hidden flex items-center justify-center ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Fond cliquable (Glassmorphism léger) avec transition explicite du flou */}
        <div 
          className={`absolute inset-0 transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-100 bg-background/50 backdrop-blur-md' : 'opacity-0 bg-transparent backdrop-blur-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Conteneur des liens avec animation de slide synchrone, parfaitement centré */}
        <div className={`relative z-10 flex flex-col items-center gap-8 transform transition-all duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
        }`}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-serif text-white hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="group relative flex items-center justify-center gap-3 px-8 py-4 mt-4 bg-accent text-background text-lg font-semibold rounded-full overflow-hidden transition-all duration-300 active:scale-95 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,168,204,0.4)]"
          >
            <div className="absolute inset-0 bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <span className="relative z-10">Contact</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </>
  );
}
