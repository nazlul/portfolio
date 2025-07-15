import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import MagneticCard from './ui/MagneticCard';

type SkillCategory = 'frontend' | 'backend' | 'tools';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-10% 0px -10% 0px',
  });

  const [activeTab, setActiveTab] = useState<SkillCategory>('frontend');

  const skillCategories: Record<SkillCategory, { name: string; level: number }[]> = {
    frontend: [
      { name: 'NextJS', level: 90 },
      { name: 'ReactJS', level: 85 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML/CSS', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
    ],
    backend: [
      { name: 'Node.js', level: 80 },
      { name: 'Python', level: 85 },
      { name: 'Express', level: 60 },
      { name: 'PostgreSQL', level: 65 },
      { name: 'REST APIs', level: 65 },
    ],
    tools: [
      { name: 'Git', level: 88 },
      { name: 'Hardhat', level: 75 },
      { name: 'Figma', level: 65 },
      { name: 'VS Code', level: 95 },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const barVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: { duration: 1, ease: 'easeOut' },
    }),
  };

  const overviewData = [
    { id: 'frontend', label: 'Frontend', percent: 83, desc: 'Modern UI with React' },
    { id: 'backend', label: 'Backend', percent: 76, desc: 'Node.js & API Development' },
    { id: 'tools', label: 'Tools', percent: 78, desc: 'Dev and Design Tools' },
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-[#fffde8]/70 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[#a9170a] to-[#831010] bg-clip-text text-transparent">
              My Skills
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#a9170a] to-[#831010] mx-auto mb-6" />
        </motion.div>

        <div ref={ref}>
          <div className="mb-10">
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {(['frontend', 'backend', 'tools'] as SkillCategory[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full text-[#fffde8] font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-[#a9170a] to-[#831010] shadow-lg'
                      : 'bg-[#a9170a]/70 hover:bg-[#a9170a]/50'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === 'tools' ? ' & Others' : ''}
                </button>
              ))}
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="grid gap-6"
            >
              {skillCategories[activeTab].map((skill, index) => (
                <motion.div key={index} variants={itemVariants} className="skill-item">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-[#a9170a]">{skill.name}</span>
                    <span className="text-[#a9170a]">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-[#B8B1A8] rounded-full overflow-hidden">
                    <motion.div
                      custom={skill.level}
                      variants={barVariants}
                      className="h-full rounded-full bg-gradient-to-r from-[#a9170a] to-[#831010]"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <MagneticCard>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="rounded-xl"
            >
              <h3 className="text-xl font-bold mb-4 text-center text-[#fffde8]">Skills Overview</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {overviewData.map(({ id, label, percent, desc }) => (
                  <div key={id} className="skill-overview">
                    <div className="relative mb-4 mx-auto w-32 h-32">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#334155" strokeWidth="8" />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={`url(#${id}Gradient)`}
                          strokeWidth="8"
                          strokeDasharray="283"
                          strokeDashoffset={inView ? 283 - 283 * (percent / 100) : 283}
                          strokeLinecap="round"
                          transition={{ duration: 1.5, delay: 0.2 * overviewData.findIndex(d => d.id === id) }}
                        />
                        <defs>
                          <linearGradient id={`${id}Gradient`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#fffde8" />
                            <stop offset="100%" stopColor="#f7f0a3" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-[#fffde8]">
                        {percent}%
                      </div>
                    </div>
                    <h4 className="text-center text-lg font-medium mb-2 text-[#fffde8]">{label}</h4>
                    <p className="text-center text-[#fffde8] text-sm">{desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </MagneticCard>
        </div>
      </div>
    </section>
  );
};

export default Skills;
