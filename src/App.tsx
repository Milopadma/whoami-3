// @deno-types="@types/react"
import "./index.css";
import { type FC, useRef } from "react";
import { type Project } from "./types/ProjectTypes.ts";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const projects: Project[] = [
  {
    title: "Custom Figma Component #1",
    duration: "2 hours",
    imageUrl: "/chair.jpg",
  },
  {
    title: "Beauty Salon Booking App",
    duration: "3 months",
    imageUrl: "/chair.jpg",
  },
  {
    title: "Property Listing Website",
    duration: "3 months",
    imageUrl: "/chair.jpg",
  },
  {
    title: "ICP Blockchain Smart Contracts",
    duration: "2 weeks",
    imageUrl: "/chair.jpg",
  },
  {
    title: "3D Model Loader SwiftUI MVP",
    duration: "2 hours",
    imageUrl: "/chair.jpg",
  },
  {
    title: "Next 3 UI Layout Slicing",
    duration: "2 weeks",
    imageUrl: "/chair.jpg",
  },
  {
    title: "Calorie Tracking App MVP",
    duration: "1 week",
    imageUrl: "/chair.jpg",
  },
  { title: "...and many more", duration: "???", imageUrl: "/chair.jpg" },
];

const App: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mainTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // animate main text
    mainTl
      .from(".char-main", {
        yPercent: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.03,
      })
      .from(".char-secondary", {
        yPercent: 100,
        opacity: 0,
        duration: 0.6,
        stagger: 0.03,
        delay: 0.05,
      })
      .from(
        ".cta",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
        },
        "-=0.2"
      );

    // separate timeline for bounce
    gsap.to(".bounce", {
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
    <div className="min-h-screen bg-neutral-50 font-mono">
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
              {splitText("I'll do it", "char-secondary")}
            </span>
          </p>
          <a
            href="#quote"
            className="cta mt-8 inline-block border-b tracking-[-0.08em] border-neutral-950 text-xl hover:text-orange-600"
          >
            Get a Quote
          </a>
        </div>

        {/* bottom scroll prompt with bounce animation */}
        <div className="bounce absolute bottom-8 left-0 right-0 text-center">
          <p className="text-sm tracking-tighter text-neutral-700">
            what can
            <br />i do?
          </p>
          <div className="mt-2 text-neutral-700">↓</div>
        </div>
      </section>

      {/* projects section */}
      <section className="px-4 pt-12 text-center">
        <p className="mb-12 text-sm tracking-tighter">
          what i did in the
          <br />
          <span className="text-orange-600">past year</span>
        </p>

        <div className="grid grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <div key={index} className="space-y-2">
              <div className="aspect-square border border-neutral-200 p-4">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-sm tracking-tighter text-neutral-950">
                  {project.title}
                </p>
                <p className="text-left text-xs tracking-tighter text-orange-600">
                  {project.duration}
                </p>
              </div>
            </div>
          ))}
        </div>

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
            href="#quote"
            className="mt-8 inline-block font-mono border-b tracking-[-0.08em] border-neutral-950 text-xl hover:text-orange-600"
          >
            Get a Quote
          </a>
        </div>
      </section>
    </div>
  );
};

export default App;
