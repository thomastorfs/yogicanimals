import React, { useState, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

// Data
import { ANIMALS as initialData } from './data';
import { Animal } from './types';

// Components
import Navbar from './components/Navbar';
import { Footer } from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Page Components
import HomePage from './components/HomePage';
import AnimalList from './components/AnimalList';
import AnimalDetail from './components/AnimalDetail';
import Analytics from './components/Analytics';

const App = () => {
  // Store animals in state as requested
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    // Simulate loading data into state
    setAnimals(initialData);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-200 selection:text-emerald-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage animals={animals} />} />
            <Route path="/animals" element={<AnimalList animals={animals} />} />
            <Route path="/species/:slug" element={<AnimalDetail animals={animals} />} />
            <Route path="/analytics" element={<Analytics animals={animals} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;