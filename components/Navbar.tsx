import React, { useState } from 'react';
import { Home, PawPrint, BarChart3, Menu, X, Sparkles } from 'lucide-react';
import { NavbarLogo } from './NavbarLogo';
import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Animals', path: '/animals', icon: <PawPrint className="w-4 h-4" /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'My Score', path: '/calculate', icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <NavbarLogo />

          <NavbarDesktop links={navLinks} />

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-emerald-900 p-2 relative w-10 h-10 flex items-center justify-center focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className={`absolute transition-all duration-300 transform ${isOpen ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`}>
                <Menu className="w-6 h-6" />
              </div>
              <div className={`absolute transition-all duration-300 transform ${isOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`}>
                <X className="w-6 h-6" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <NavbarMobile isOpen={isOpen} setIsOpen={setIsOpen} links={navLinks} />
    </nav>
  );
};

export default Navbar;