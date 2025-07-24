'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  UserIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  HeartIcon
} from 'lucide-react';
import MagneticCard from '../components/ui/MagneticCard';
import { useIsMobile } from '../hooks/useIsMobile';

const About = () => {
  const isMobile = useIsMobile();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: isMobile ? 0.05 : 0.1,
    rootMargin: isMobile ? '-5% 0px -5% 0px' : '-2% 0px -2% 0px'
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 4 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: isMobile ? 0.25 : 0.5 }
    }
  };

  return (
    <section id="about" className="relative bg-[#fffde8] noise-bg py-20 px-4">
      {/* All background SVG elements removed */}
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 12 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: isMobile ? 0.4 : 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">
            <span className="bg-gradient-to-r from-[#a9170a] to-[#831010] bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="mx-auto h-1 w-20 bg-[#a9170a]" />
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 min-h-[40vh]">
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -10 }}
            animate={inView || isMobile ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: isMobile ? 0.4 : 0.6 }}
            ref={ref}
            className="relative"
          >
            <div className="absolute inset-0 rotate-3 rounded-lg bg-[#918a81]" />
            <div className="relative -rotate-3 transform rounded-lg transition-transform duration-300 hover:rotate-0">
              <MagneticCard>
                <h3 className="mb-4 text-2xl font-bold text-[#fffde8]">Who I Am</h3>
                <p className="mb-4 text-[#fffde8]">
                  I'm a <span className='text-black font-bold'>Web Developer</span> who loves crafting clean, responsive UIs that feel smooth and look great. I focus on the little interactions that make a site feel alive, and I enjoy turning ideas into something real with code and design.
                </p>
                <p className="text-[#fffde8]">
                  Lately, I've been diving into the world of blockchain and building frontend experiences for web3 apps. When I'm not coding, I'm exploring new design trends, messing around with creative side projects. Always learning, always building.
                </p>
              </MagneticCard>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView || isMobile ? 'visible' : 'hidden'}
            className="grid grid-cols-1 gap-6"
          >
            {[
              {
                icon: <UserIcon className="text-[#fffde8]" size={24} />,
                title: <span className="text-[#fffde8]">Personal Touch</span>,
                text: 'I approach every project with care and personality — no copy-paste templates, just thoughtful design and development.'
              },
              {
                icon: <BriefcaseIcon className="text-[#fffde8]" size={24} />,
                title: <span className="text-[#fffde8]">Real-World Projects</span>,
                text: "I'm still early in my career, but I focus on writing clean, maintainable code and building projects that solve real problems."
              },
              {
                icon: <GraduationCapIcon className="text-[#fffde8]" size={24} />,
                title: <span className="text-[#fffde8]">Always Learning</span>,
                text: "I'm constantly picking up new tools, keeping up with the latest frontend tech, and pushing myself to grow as a developer."
              },
              {
                icon: <HeartIcon className="text-[#fffde8]" size={24} />,
                title: <span className="text-[#fffde8]">Passionate Creator</span>,
                text: 'I love building web experiences that are not only functional, but also feel smooth, modern, and enjoyable to use.'
              }
            ].map((item, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <MagneticCard>
                  <div className="flex items-start">
                    <div className="mr-4 rounded-lg bg-[#fffde8]/20 p-3">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                      <p className="text-[#fffde8]">{item.text}</p>
                    </div>
                  </div>
                </MagneticCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
