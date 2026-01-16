import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

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
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-200 selection:text-emerald-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/animals" element={<AnimalList />} />
            <Route path="/species/:slug" element={<AnimalDetail />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;