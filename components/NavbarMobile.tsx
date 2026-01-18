import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLink {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface NavbarMobileProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  links: NavLink[];
}

export const NavbarMobile: React.FC<NavbarMobileProps> = ({ isOpen, setIsOpen, links }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div 
      className={`md:hidden bg-white border-emerald-100 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-[400px] opacity-100 border-t' : 'max-h-0 opacity-0 border-t-0'
      }`}
    >
      <div className="px-4 pt-4 pb-6 space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={`flex items-center space-x-4 block px-4 py-4 rounded-xl text-base font-medium transition-all min-h-[56px] active:bg-emerald-100/50 ${
              isActive(link.path)
                ? 'text-emerald-900 bg-emerald-50 border border-emerald-100'
                : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 border border-transparent'
            }`}
          >
            <span className={`${isActive(link.path) ? 'text-emerald-600' : 'text-slate-400'}`}>
                {link.icon}
            </span>
            <span className="font-semibold tracking-wide">{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};