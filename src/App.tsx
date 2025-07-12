import CustomCursor from './CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Background from './components/Background';
import ScrollImageSequence from './components/ScrollImageSequence';
import LazySection from './components/LazySection';

export function App() {
  return <div className="relative min-h-screen">
    <CustomCursor />
    <ScrollImageSequence />
      <Background />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <LazySection><About /></LazySection>
        <LazySection><Projects /></LazySection>
        <LazySection><Skills /></LazySection>
        <LazySection><Contact /></LazySection>
      </main>
      <Footer />
    </div>;
}