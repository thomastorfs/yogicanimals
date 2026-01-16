import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLink {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface NavbarDesktopProps {
  links: NavLink[];
}

export const NavbarDesktop: React.FC<NavbarDesktopProps> = ({ links }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="hidden md:flex items-center space-x-8">
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            isActive(link.path)
              ? 'text-emerald-800 bg-emerald-50 ring-1 ring-emerald-200'
              : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
          }`}
        >
          {link.icon}
          <span>{link.name}</span>
        </Link>
      ))}
    </div>
  );
};