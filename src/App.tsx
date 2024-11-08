// @deno-types="@types/react"
import "./index.css";
import { type FC, useRef, useState, useEffect } from "react";
import { type Project } from "./types/ProjectTypes.ts";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "./shad_components/Drawer.tsx";
import FloatingNav from "./components/FloatingNav.tsx";

const projects: Project[] = [
  {
    title: "Nuxt 3 UI Layout Slicing",
    duration: "1 week",
    imageUrl: "/marechalverchetti_portfolio.webp",
    techStack: ["Vue", "Nuxt 3", "TypeScript", "Tailwind", "GSAP Animation"],
    description:
      "Modern application built with Nuxt 3. Includes complex layouts, animations, and responsive design patterns. An experimental project to explore Nuxt 3 capabilities.",
    images: ["/marechalverchetti_portfolio.webp"],
    repository: "https://github.com/Milopadma/franklineco-fleava",
    liveProject: "https://franklineco-fleava.vercel.app/",
  },
  {
    title: "Property Listing Website",
    duration: "3 months",
    imageUrl: "/blirumah_portfolio.webp",
    techStack: ["React", "Next.js", "PostgreSQL", "Supabase"],
    description:
      "Real estate platform with advanced search filters, and interactive maps. Integrated with a listing service.",
    images: ["/blirumah_portfolio.webp"],
    liveProject: "https://blirumah-alpha.milopadma.com",
  },
  {
    title: "ICP Blockchain Smart Contracts",
    duration: "4 weeks",
    imageUrl: "Image coming soon...",
    techStack: ["Internet Computer", "Rust", "DFX"],
    description:
      "Decentralized application smart contracts for the Internet Computer Protocol. Implementing secure group functionality for medical records, kyc-verification, and admin roles.",
    images: ["Image coming soon...", "Image coming soon...", "Image coming soon..."],
    repository: "https://github.com/baliola/medblock/",
  },
  {
    title: "Custom Framer YouTube Channel Component",
    duration: "2 hours",
    imageUrl: "/youtube.webp",
    techStack: ["Framer", "React", "TypeScript", "YouTube API"],
    description:
      "Custom Framer component that dynamically fetches and displays YouTube channel content. Features responsive video thumbnails, titles, and smooth hover animations.",
    images: ["/youtube.webp"],
    repository: "https://github.com/milopadma",
  },
  {
    title: "Custom Framer Mail Component",
    duration: "2 hours",
    imageUrl: "/mail.webp",
    techStack: ["Framer", "React", "TypeScript", "Framer Motion", "NocoDB"],
    description:
      "A reusable Framer Motion component with animations and interactions. Features include gesture controls, smooth transitions, and responsive design patterns.",
    images: ["/mail.webp"],
    repository: "https://github.com/milopadma",
  },
  {
    title: "Beauty Salon Booking App",
    duration: "In Progress...",
    imageUrl: "Image coming soon...",
    techStack: ["Next.js", "TypeScript", "Prisma", "tRPC", "Tailwind", "Supabase"],
    description:
      "Full-featured salon management system with real-time booking, staff scheduling, and automated reminders. Includes customer management and analytics dashboard.",
    images: ["Image coming soon...", "Image coming soon...", "Image coming soon..."],
    repository: "https://github.com/milopadma",
  },
  {
    title: "3D Model Loader SwiftUI MVP",
    duration: "2 hours",
    imageUrl: "Image coming soon...",
    techStack: ["Swift", "SwiftUI", "SceneKit", "ARKit"],
    description:
      "iOS SwiftUI application for loading and viewing 3D models with AR capabilities. Features include model loading, viewing and real-world placement.",
    images: ["Image coming soon...", "Image coming soon...", "Image coming soon..."],
    repository: "https://github.com/Milopadma/inventory",
  },

  {
    title: "Calorie Tracking App MVP",
    duration: "1 week",
    imageUrl: "Image coming soon...",
    techStack: ["React Native", "TypeScript", "Supabase"],
    description:
      "Cross-platform mobile app for tracking daily nutrition and exercise. Features planned include barcode scanning, meal planning, and progress visualization.",
    images: ["Image coming soon...", "Image coming soon...", "Image coming soon..."],
    repository: "https://github.com/milopadma",
  },
  {
    title: "...and many more",
    duration: "???",
    imageUrl: "Image coming soon...",
    techStack: ["Various", "Technologies", "Used"],
    description:
      "More projects available upon request. Each project demonstrates different technical skills and problem-solving approaches.",
    images: ["Image coming soon..."],
  },
];

const App: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show nav when CTA is not visible
        setShowFloatingNav(!entry.isIntersecting);
      },
      {
        // Adjust threshold as needed
        threshold: 0,
      }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useGSAP(() => {
    const mainTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Set initial states
    gsap.set([".char-main", ".char-secondary", ".cta", ".bounce"], {
      opacity: 0,
    });
    gsap.set(".char-main", { yPercent: 100 });
    gsap.set(".char-secondary", { yPercent: 100 });

    // animate main text
    mainTl
      .to(".char-main", {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.03,
      })
      .to(".char-secondary", {
        yPercent: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.03,
        delay: 0.05,
      })
      .fromTo(
        ".cta",
        {
          opacity: 0,
          y: -20,
          duration: 0.6,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.2"
      )
      .to(".bounce", {
        opacity: 1,
        duration: 0.6,
      })
      .to(".bounce", {
        y: -10,
        duration: 1.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
  }, []);

  // helper function to wrap each character in a span
  const splitText = (text: string, className: string): JSX.Element[] => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className={`${className} inline-block`}
        style={{ display: char === " " ? "inline" : "inline-block" }}
      >
        {char}
      </span>
    ));
  };

  return (
    <body className="min-h-screen bg-neutral-50 font-mono">
      <FloatingNav visible={showFloatingNav} />

      {/* first viewport section */}
      <section className="relative h-screen">
        {/* centered main text */}
        <div
          ref={containerRef}
          className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center"
        >
          <h1 className="font-heading text-5xl font-light tracking-[-0.09em] text-neutral-950">
            {splitText("Something", "char-main")}
            <br />
            {splitText("with", "char-main")}
            <br />
            {splitText("software?", "char-main")}
          </h1>
          <p className="mt-4 text-5xl font-heading tracking-tighter">
            <span className="text-orange-600 tracking-[-0.08em]">
              {splitText("I'll do it.", "char-secondary")}
            </span>
          </p>
          <a
            ref={ctaRef}
            href="https://wa.me/6285121020001?text=Hello%2C%20I%20need%20a%20quote%20for%20your%20services"
            className="cta mt-8 inline-block border-b border-neutral-950 text-xl tracking-[-0.08em] hover:text-orange-600 hover:border-orange-600"
          >
            Get a Quote
          </a>
        </div>

        {/* updated bounce div - initially invisible */}
        <div className="bounce absolute bottom-8 left-0 right-0 text-center">
          <p className="text-sm tracking-tighter text-neutral-700">
            what can
            <br />i do?
          </p>
          <div className="mt-2 text-neutral-700">↓</div>
        </div>
      </section>

      {/* new services description section */}
      <section className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="space-y-12">
          <div className="space-y-2">
            <h3 className="font-heading text-2xl tracking-[-0.07em] text-neutral-950">
              For Businesses
            </h3>
            <p className="text-sm tracking-tighter text-neutral-700">
              streamline operations, automate workflows,
              <br />
              and reach more customers through digital transformation
            </p>
            <p className="mt-4 text-sm tracking-tighter text-orange-600">
              don't let competitors outpace you,
              <br />
              losing your market advantage
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-heading text-2xl tracking-[-0.07em] text-neutral-950">
              For Creators
            </h3>
            <p className="text-sm tracking-tighter text-neutral-700">
              bring your ideas to life with custom software
              <br />
              that matches your unique vision and workflow
            </p>
            <p className="mt-4 text-sm tracking-tighter text-orange-600">
              don't settle for generic tools,
              <br />
              compromising your creative vision
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-heading text-2xl tracking-[-0.07em] text-neutral-950">
              For Startups
            </h3>
            <p className="text-sm tracking-tighter text-neutral-700">
              validate ideas quickly, iterate faster,
              <br />
              and scale with confidence using modern tech
            </p>
            <p className="mt-4 text-sm tracking-tighter text-orange-600">
              don't delay your market entry,
              <br />
              missing your window of opportunity
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-heading text-2xl tracking-[-0.07em] text-neutral-950">
              For Everyone
            </h3>
            <p className="text-sm tracking-tighter text-neutral-700">
              transform challenges into opportunities
              <br />
              with tailored software solutions
            </p>
            <p className="mt-4 text-sm tracking-tighter text-orange-600">
              don't stay stuck with inefficiencies,
              <br />
              watching others succeed instead
            </p>
          </div>
        </div>
      </section>

      {/* separator line */}
      <div className="mx-auto w-[1px] h-24 bg-gradient-to-b from-neutral-300 to-transparent" />

      {/* projects section */}
      <section className="px-4 pt-12 text-center">
        <p className="mb-12 text-sm tracking-tighter">
          what i did in the
          <br />
          <span className="text-orange-600">past year</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pb-24 mx-8 sm:mx-48">
          {projects.map((project, index) => (
            <div
              key={index}
              className="space-y-2 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Fixed aspect ratio container */}
              <div className="aspect-square border border-neutral-200 p-4 relative">
                <Drawer>
                  <DrawerTrigger className="w-full h-full">
                    {project.imageUrl === "Image coming soon..." ? (
                      <div className="absolute inset-0 m-4 flex items-center justify-center bg-neutral-100">
                        <p className="text-sm tracking-tighter text-neutral-500">
                          Image coming soon...
                        </p>
                      </div>
                    ) : (
                      <div className="absolute inset-0 m-4">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-contain hover:scale-105 transition-all duration-300"
                        />
                      </div>
                    )}
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-6 overflow-y-scroll">
                      <DrawerHeader className="pt-8 flex flex-col items-center justify-center">
                        <div className="relative w-[400px] h-[400px] overflow-hidden">
                          <div className="flex absolute left-0 top-0" ref={(el) => {
                            if (el && project.images.length > 1) {
                              // clone the images for seamless loop
                              const images = [...project.images, ...project.images];
                              
                              // reset any existing animation
                              gsap.killTweensOf(el);
                              
                              // calculate total width
                              const totalWidth = 400 * project.images.length;
                              
                              gsap.to(el, {
                                x: -totalWidth,
                                duration: project.images.length * 3,
                                ease: "none",
                                repeat: -1,
                                paused: false,
                              });
                            }
                          }}>
                            {/* double the images for seamless loop */}
                            {[...project.images, ...project.images].map((image, idx) => (
                              <div key={idx} className="w-[400px] h-[400px] flex-shrink-0">
                                {image === "Image coming soon..." ? (
                                  <div className="h-full w-full flex items-center justify-center bg-neutral-100">
                                    <p className="text-sm tracking-tighter text-neutral-500">
                                      Image coming soon...
                                    </p>
                                  </div>
                                ) : (
                                  <div className="h-full w-full">
                                    <img
                                      src={image}
                                      alt={`${project.title} - image ${(idx % project.images.length) + 1}`}
                                      className="h-full w-full object-contain"
                                    />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        <DrawerTitle className="font-heading text-3xl tracking-[-0.07em] text-neutral-950 pt-4">
                          {project.title}
                        </DrawerTitle>
                        <DrawerDescription className="text-sm tracking-tighter text-orange-600">
                          This took {project.duration} to complete
                        </DrawerDescription>
                        {/* tech stack */}
                        <div className="flex flex-wrap gap-2 justify-center items-center pt-2">
                          {project.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="rounded-full border border-neutral-200 px-4 py-1.5 text-xs tracking-tighter text-neutral-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <DrawerDescription className="text-sm tracking-tighter text-neutral-700 text-center max-w-md pt-2">
                          {project.description}
                        </DrawerDescription>

                        {/* repository and live project links */}
                        <div className="flex gap-4 mt-4">
                          {project.repository && (
                            <a 
                              href={project.repository}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm tracking-tighter text-neutral-950 hover:text-orange-600"
                            >
                              View Repository
                            </a>
                          )}
                          {project.liveProject && (
                            <a 
                              href={project.liveProject}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm tracking-tighter text-neutral-950 hover:text-orange-600"
                            >
                              View Live Project
                            </a>
                          )}
                        </div>

                        <DrawerFooter>
                          <DrawerClose>
                            <a className="text-sm tracking-tighter text-neutral-950 hover:text-orange-600 hover:cursor-pointer border-b border-neutral-950">
                              Close
                            </a>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerHeader>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
              <div className="text-center">
                <p className="text-sm tracking-tighter text-neutral-950">
                  {project.title}
                </p>
                <p className="text-xs tracking-tighter text-orange-600">
                  {project.duration}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* separator line */}
        <div className="mx-auto w-[1px] h-24 bg-gradient-to-b from-neutral-300 to-transparent" />

        {/* footer section */}
        <div className="py-20">
          <p className="font-heading text-2xl tracking-[-0.07em] text-neutral-950">
            You've scrolled this
            <br />
            far, i've already <span className="text-orange-600">solved</span>
            <br />
            your problem
          </p>
          <a
            href="https://wa.me/6285121020001?text=Hello%2C%20I%20need%20a%20quote%20for%20your%20services"
            className="mt-8 inline-block font-mono border-b tracking-[-0.08em] border-neutral-950 text-xl hover:text-orange-600 hover:border-orange-600"
          >
            Get a Quote
          </a>
        </div>
      </section>

      {/* separator line */}
      <div className="mx-auto w-[1px] h-24 bg-gradient-to-b from-neutral-200 to-transparent pb-72" />
    </body>
  );
};

export default App;
