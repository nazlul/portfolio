import { GithubIcon, TwitterIcon, LinkedinIcon, ArrowUpIcon } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#fffde8] relative z-10">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center">
          <button
            onClick={scrollToTop}
            className="bg-gradient-to-r from-[#a9170a] to-[#831010] p-3 rounded-full mb-8 transform hover:scale-110 transition-transform shadow-lg shadow-purple-500/20"
            aria-label="Scroll to top"
          >
            <ArrowUpIcon size={24} className="text-[#fffde8]" />
          </button>

          <div className="text-2xl font-bold bg-gradient-to-r from-[#a9170a] to-[#831010] bg-clip-text text-transparent mb-6">
            Portfolio
          </div>

          <div className="flex space-x-4 mb-8 cursor-link">
            <a
              href="https://www.github.com/nazlul/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#a9170a] p-2 rounded-full hover:bg-[#831010] transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={20} className="text-white" />
            </a>
            <a
              href="https://www.x.com/DegenNaz_"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#a9170a] p-2 rounded-full hover:bg-[#831010] transition-colors"
              aria-label="Twitter"
            >
              <TwitterIcon size={20} className="text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/nazlul-rizan/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#a9170a] p-2 rounded-full hover:bg-[#831010] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={20} className="text-white" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-8 cursor-link">
            <a href="#home" className="text-[#a9170a] hover:text-[#831010] transition-colors">
              Home
            </a>
            <a href="#about" className="text-[#a9170a] hover:text-[#831010] transition-colors">
              About
            </a>
            <a href="#projects" className="text-[#a9170a] hover:text-[#831010] transition-colors">
              Projects
            </a>
            <a href="#skills" className="text-[#a9170a] hover:text-[#831010] transition-colors">
              Skills
            </a>
            <a href="#contact" className="text-[#a9170a] hover:text-[#831010] transition-colors">
              Contact
            </a>
          </div>

          <div className="text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Nazlul Rizan. All rights reserved.</p>
            <p className="mt-1">Designed & Built with ❤️</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;