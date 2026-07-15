import React, { Suspense, useState, useEffect, lazy, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppContext } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import { SVGFilters } from 'react-glassy'; // Для крутого стекла в Header
import './index.css';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Features = lazy(() => import('./components/Features'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useContext(AppContext);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SVGFilters>
        <SVGFilters.DefaultFilters />
      </SVGFilters>

      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>

      {!isLoading && (
        <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', width: '100%', transition: 'background-color 0.4s ease' }}>
          <Header />

          <main>
            <Suspense fallback={<div style={{ height: '100vh' }} />}>
              <Hero />
            </Suspense>

            <Suspense fallback={<div />}>
              <About />
            </Suspense>

            <Suspense fallback={<div />}>
              <Features />
            </Suspense>

            <Footer />
          </main>
        </div>
      )}
    </>
  );
}

export default App;