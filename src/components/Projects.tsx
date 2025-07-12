"use client";

import { useEffect, useState } from "react";
import { GithubIcon, ExternalLinkIcon } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import { LinkPreview } from "../components/ui/link-preview";

const projects = [
  {
    title: "Meta Ads Analytics",
    description: "Dashboard for analyzing Meta Ads performance using data from the Meta Marketing API, with integrated Auth (SignIn, SignUp, Email Verification).",
    image: "/dash.mp4",
    demoLink: "https://adsdash.vercel.app/",
    codeLink: "https://github.com/nazlul/analytics-dash",
  },
  {
    title: "Lifeliner by BMH",
    description: "A life saving initiative by Baby Memorial Hospital.",
    image: "/lifeliner.mp4",
    demoLink: "https://lifeliner.org/",
    codeLink: "https://github.com/nazlul/lifeliner",
  },
  {
    title: "LocalConnect AI",
    description: "LocalConnect AI is a cutting-edge, fully responsive, scroll-animated web experience.",
    image: "/localconnectai.mp4",
    demoLink: "https://localconnectai.vercel.app/",
    codeLink: "https://github.com/nazlul/localconnectai",
  },
  {
    title: "Base Loans App",
    description: "A yield dapp built on base mainnet.",
    image: "/loans.mp4",
    demoLink: "https://baseyield.vercel.app/",
    codeLink: "https://github.com/nazlul/base-loans-app",
  },
  {
    title: "Decentralised Exchange",
    description: "A DEX to swap tokens on Ethereum Mainnet.",
    image: "/dex.mp4",
    demoLink: "https://drip-dex-one.vercel.app/",
    codeLink: "https://github.com/nazlul/DripDEX",
  },
  {
    title: "Interactive Crypto Trasfer App",
    description: "An app to send crypto to friends along with a gif and message.",
    image: "/transfer.mp4",
    demoLink: "https://arachnida-livid.vercel.app/",
    codeLink: "https://github.com/nazlul/CryptoTransferApp",
  },
];

export default function Projects() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    const handleResize = () => setIsSmallScreen(mediaQuery.matches);
    handleResize();
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <section id="projects" className="py-12 px-4 sm:px-10 md:px-20 lg:px-40 bg-[#a9170a]/70">
      <h2 className="text-3xl font-bold text-center mb-3 text-[#fffde8]">Projects</h2>
      <div className="mx-auto h-1 w-20 bg-[#fffde8] mb-10" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {projects.map((project, idx) => (
          <CardContainer key={idx} className="inter-var">
            <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-white/[0.1] bg-[#fffde8] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
              <CardItem translateZ="70" className="text-xl font-bold text-[#a9170a]">
                {project.title}
              </CardItem>
              <CardItem translateZ="65" className="text-sm max-w-sm mt-2 text-[#a9170a]">
                {project.description}
              </CardItem>
              <CardItem translateZ="80" className="w-full mt-4">
                {project.image.endsWith(".mp4") ? (
                  <video
                    src={project.image}
                    loop
                    muted
                    playsInline
                    autoPlay={isSmallScreen}
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    onMouseEnter={(e) => {
                      if (!isSmallScreen) e.currentTarget.play();
                    }}
                    onMouseLeave={(e) => {
                      if (!isSmallScreen) {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }
                    }}
                  />
                ) : (
                  <img
                    src={project.image}
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="Project screenshot"
                  />
                )}
              </CardItem>
              <div className="flex justify-between items-center mt-6">
                <CardItem translateZ={81} className="text-xs font-normal">
                  <LinkPreview url={project.demoLink}>
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#a9170a] hover:underline cursor-link"
                    >
                      <ExternalLinkIcon size={18} />
                      Live
                    </a>
                  </LinkPreview>
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="a"
                  href={project.codeLink}
                  target="_blank"
                  className="px-4 py-2 rounded-xl bg-white dark:bg-black text-black dark:text-white text-xs font-bold cursor-link"
                >
                  <GithubIcon size={18} />
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </section>
  );
}
