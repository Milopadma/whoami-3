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
    title: "YouTube Channel Component",
    duration: "2 hours",
    imageUrl: "/youtube.webp",
    techStack: ["Framer", "React", "TypeScript", "YouTube API"],
    description:
      "Custom Framer component that dynamically fetches and displays YouTube channel content. Features responsive video thumbnails, titles, and smooth hover animations.",
    images: ["/youtube.webp"],
    repository: "https://github.com/milopadma",
  },
  {
    title: "Custom Framer Component #1",
    duration: "2 hours",
    imageUrl: "/mail.webp",
    techStack: ["Framer", "React", "TypeScript", "Framer Motion"],
    description:
      "A reusable Framer Motion component library with complex animations and interactions. Features include gesture controls, smooth transitions, and responsive design patterns.",
    images: ["/mail.webp"],
    repository: "https://github.com/milopadma",
  },
  {
    title: "Beauty Salon Booking App",
    duration: "3 months",
    imageUrl: "/chair.png",
    techStack: ["Next.js", "TypeScript", "Prisma", "tRPC", "Tailwind"],
    description:
      "Full-featured salon management system with real-time booking, staff scheduling, and automated reminders. Includes customer management and analytics dashboard.",
    images: ["/chair.png", "/chair.png", "/chair.png"],
    repository: "https://github.com/milopadma",
  },
  {
    title: "Property Listing Website",
    duration: "3 months",
    imageUrl: "/chair.png",
    techStack: ["React", "Node.js", "PostgreSQL", "AWS", "Mapbox"],
    description:
      "Real estate platform with advanced search filters, virtual tours, and interactive maps. Integrated with multiple listing services and automated property valuation.",
    images: ["/chair.png", "/chair.png", "/chair.png"],
    repository: "https://github.com/milopadma",
  },
  {
    title: "ICP Blockchain Smart Contracts",
    duration: "2 weeks",
    imageUrl: "/chair.png",
    techStack: ["Motoko", "Internet Computer", "TypeScript", "DFX"],
    description:
      "Decentralized application smart contracts for the Internet Computer Protocol. Implements secure token transfers, governance, and cross-canister calls.",
    images: ["/chair.png", "/chair.png", "/chair.png"],
    repository: "https://github.com/milopadma",
  },
  {
    title: "3D Model Loader SwiftUI MVP",
    duration: "2 hours",
    imageUrl: "/chair.png",
    techStack: ["Swift", "SwiftUI", "SceneKit", "ARKit"],
    description:
      "iOS application for loading and viewing 3D models with AR capabilities. Features include model manipulation, texturing, and real-world placement.",
    images: ["/chair.png", "/chair.png", "/chair.png"],
    repository: "https://github.com/milopadma",
  },
  {
    title: "Next 3 UI Layout Slicing",
    duration: "2 weeks",
    imageUrl: "/chair.png",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    description:
      "Modern UI component library built with Next.js 13. Includes complex layouts, animations, and responsive design patterns.",
    images: ["/chair.png", "/chair.png", "/chair.png"],
    repository: "https://github.com/milopadma",
  },
  {
    title: "Calorie Tracking App MVP",
    duration: "1 week",
    imageUrl: "/chair.png",
    techStack: ["React Native", "TypeScript", "Firebase", "Redux"],
    description:
      "Cross-platform mobile app for tracking daily nutrition and exercise. Features include barcode scanning, meal planning, and progress visualization.",
    images: ["/chair.png", "/chair.png", "/chair.png"],
    repository: "https://github.com/milopadma",
  },
  {
    title: "...and many more",
    duration: "???",
    imageUrl: "/chair.png",
    techStack: ["Various", "Technologies", "Used"],
    description:
      "More projects available upon request. Each project demonstrates different technical skills and problem-solving approaches.",
    images: ["/chair.png"],
  },
];

const App: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);

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
              <div className="aspect-square border border-neutral-200 p-4">
                <Drawer>
                  <DrawerTrigger>
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover hover:scale-105 transition-all duration-300"
                    />
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-6 overflow-y-scroll">
                      <DrawerHeader className="pt-8 flex flex-col items-center justify-center">
                        <div className="flex flex-row gap-4 overflow-scroll">
                          {project.images.map((image, i) => (
                            <img
                              key={i}
                              src={image}
                              alt={project.title}
                              className="h-full w-full max-h-[400px] max-w-[400px] object-cover"
                            />
                          ))}
                        </div>
                        <DrawerTitle className="font-heading text-3xl tracking-[-0.07em] text-neutral-950">
                          {project.title}
                        </DrawerTitle>
                        <DrawerDescription className="text-sm tracking-tighter text-orange-600">
                          This took {project.duration} to complete
                        </DrawerDescription>
                        {/* tech stack */}
                        <div className="flex flex-wrap gap-2 justify-center items-center">
                          {project.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="rounded-full border border-neutral-200 px-4 py-1.5 text-xs tracking-tighter text-neutral-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <DrawerDescription className="text-sm tracking-tighter text-neutral-700 text-center max-w-md">
                          {project.description}
                        </DrawerDescription>
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
