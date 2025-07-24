import CustomCursor from './CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Background from './components/Background';
import LazySection from './components/LazySection';
import LoadingScreen from './components/LoadingScreen';
import { useEffect, useState } from 'react';

export function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    // Optionally, you can add more logic to check for asset/font readiness
    return () => clearTimeout(timer);
  }, []);
  if (loading) return <LoadingScreen />;
  return <div className="relative min-h-screen">
      <CustomCursor />
      <Background />
      <Navbar />
      <main className="relative z-10 backdrop-blur-sm">
        <Hero />
        <LazySection><About /></LazySection>
        <LazySection><Projects /></LazySection>
        <LazySection><Skills /></LazySection>
        <LazySection><Contact /></LazySection>
      </main>
      <Footer />
    </div>;
}