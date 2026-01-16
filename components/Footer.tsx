import React from 'react';
import { NavbarLogo } from './NavbarLogo';

export const Footer = () => (
  <footer className="bg-emerald-950 text-emerald-100/80 py-16">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <div className="flex items-center justify-center mb-6">
        <NavbarLogo variant="light" />
      </div>
      <p className="text-base max-w-2xl mx-auto leading-relaxed text-emerald-200/70 font-light">
        Quantifying the spiritual resonance of the natural world. By understanding the consciousness of our fellow beings, we cultivate a deeper connection to the web of life.
      </p>
    </div>
  </footer>
);