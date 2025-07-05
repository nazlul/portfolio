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

export function App() {
  return <div className="relative min-h-screen">
    <CustomCursor />
    <ScrollImageSequence />
      <Background />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>;
}