// @deno-types="@types/react"
import "./index.css";
import { type FC } from "react";
import { type Project } from "./types/ProjectTypes.ts";

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
  return (
    <div className="min-h-screen bg-neutral-50 font-mono">
      {/* first viewport section */}
      <section className="relative h-screen">
        {/* centered main text */}
        <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="font-heading text-5xl font-light tracking-[-0.09em] text-neutral-950">
            Something
            <br />
            with
            <br />
            software?
          </h1>
          <p className="mt-4 text-5xl font-heading tracking-tighter">
            <span className="text-orange-600 tracking-[-0.12em]">
              I'll do it
            </span>
          </p>
          <a
            href="#quote"
            className="mt-8 inline-block border-b border-neutral-950 text-xl hover:text-orange-600"
          >
            Get a Quote
          </a>
        </div>

        {/* bottom scroll prompt */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
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

        <div className="grid grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div key={index} className="space-y-2">
              <div className="aspect-square border border-neutral-200 p-4">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-sm tracking-tighter text-neutral-950">
                {project.title}
              </p>
              <p className="text-xs tracking-tighter text-orange-600">
                {project.duration}
              </p>
            </div>
          ))}
        </div>

        {/* footer section */}
        <div className="py-20">
          <p className="font-heading text-2xl font-light tracking-tighter text-neutral-950">
            You've scrolled this
            <br />
            far, i've already <span className="text-orange-600">solved</span>
            <br />
            your problem
          </p>
          <a
            href="#quote"
            className="mt-8 inline-block border-b border-neutral-950 text-sm hover:text-orange-600"
          >
            Get a Quote
          </a>
        </div>
      </section>
    </div>
  );
};

export default App;
