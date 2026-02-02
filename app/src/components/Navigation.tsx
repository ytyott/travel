import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Fixed Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-navy/80 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="flex items-center justify-between px-[6vw]">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="micro-label text-white/90 hover:text-white transition-colors tracking-[0.2em]"
          >
            TRAILTRUST
          </button>

          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="micro-label text-white/90 hover:text-white transition-colors"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-[200] transition-all duration-500 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-navy/95 backdrop-blur-xl"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-[6vw] py-6">
            <span className="micro-label text-white/90 tracking-[0.2em]">
              TRAILTRUST
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white/90 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 flex flex-col justify-center px-[6vw]">
            <div className="space-y-6">
              {[
                { label: 'Home', id: 'hero' },
                { label: 'Everest Base Camp', id: 'everest-base-camp' },
                { label: 'Annapurna Base Camp', id: 'annapurna-base-camp' },
                { label: 'Langtang Valley', id: 'langtang-valley' },
                { label: 'Manaslu Circuit', id: 'manaslu-circuit' },
                { label: 'Ghorepani Poon Hill', id: 'ghorepani-poon-hill' },
                { label: 'Mardi Himal', id: 'mardi-himal' },
                { label: 'Gokyo Lakes', id: 'gokyo-lakes' },
                { label: 'Contact', id: 'contact' },
              ].map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block text-left group"
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                  }}
                >
                  <span
                    className={`font-display text-4xl md:text-5xl font-bold text-white/80 group-hover:text-lavender transition-all duration-300 block transform ${
                      isMenuOpen
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-4 opacity-0'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="px-[6vw] py-8 flex items-center justify-between text-white/50 micro-label">
            <span>hello@trailtrust.com</span>
            <span>Kathmandu, Nepal</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
