import React, { useState, useEffect, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Data
import { RAW_ANIMAL_DATA } from './data';
import { Animal } from './types';
import { loadAnimals } from './utils';

// Components (always loaded)
import Navbar from './components/Navbar';
import { Footer } from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LoadingThrobber from './components/LoadingThrobber';
import { LazyBoundary } from './components/LazyBoundary';

// Page Components (lazy loaded for code splitting)
const HomePage = React.lazy(() => import('./components/HomePage'));
const AnimalList = React.lazy(() => import('./components/AnimalList'));
const AnimalDetail = React.lazy(() => import('./components/AnimalDetail'));
const Analytics = React.lazy(() => import('./components/Analytics'));
const PersonalScoreCalculator = React.lazy(() => import('./components/PersonalScoreCalculator'));

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
        <LazyBoundary message="Loading page..." size="md">
          <Routes>
            <Route path="/" element={<HomePage animals={animals} />} />
            <Route path="/animals" element={<AnimalList animals={animals} />} />
            <Route path="/animals/:slug" element={<AnimalDetail animals={animals} />} />
            <Route path="/analytics" element={<Analytics animals={animals} />} />
            <Route path="/calculate" element={<PersonalScoreCalculator />} />
          </Routes>
        </LazyBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default App;