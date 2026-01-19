import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Data
import { RAW_ANIMAL_DATA } from './data';
import { Animal } from './types';
import { loadAnimals } from './utils';

// Components
import Navbar from './components/Navbar';
import { Footer } from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Page Components
import HomePage from './components/HomePage';
import AnimalList from './components/AnimalList';
import AnimalDetail from './components/AnimalDetail';
import Analytics from './components/Analytics';
import PersonalScoreCalculator from './components/PersonalScoreCalculator';

const App = () => {
  // Store animals in state as requested
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    // Load and process data into state
    const processedAnimals = loadAnimals(RAW_ANIMAL_DATA);
    setAnimals(processedAnimals);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-200 selection:text-emerald-900">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage animals={animals} />} />
          <Route path="/animals" element={<AnimalList animals={animals} />} />
          <Route path="/animals/:slug" element={<AnimalDetail animals={animals} />} />
          <Route path="/analytics" element={<Analytics animals={animals} />} />
          <Route path="/calculate" element={<PersonalScoreCalculator />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;