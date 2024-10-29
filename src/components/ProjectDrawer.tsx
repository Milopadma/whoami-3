import { type FC } from "react";
import { type Project } from "../types/ProjectTypes.ts";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "../shad_components/Drawer.tsx";
import { cn } from "../lib/utils.ts";

interface ProjectDrawerProps {
  project: Project;
  isOpen: boolean;
  onClose?: () => void;
}

const ProjectDrawer: FC<ProjectDrawerProps> = ({
  project,
  isOpen,
  onClose,
}: ProjectDrawerProps) => {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-4xl px-6">
          <DrawerHeader className="pt-8">
            <DrawerTitle className="font-heading text-3xl tracking-[-0.07em] text-neutral-950">
              {project.title}
            </DrawerTitle>
            <DrawerDescription className="text-sm tracking-tighter text-orange-600">
              {project.duration}
            </DrawerDescription>
          </DrawerHeader>

          <div className="mt-8 space-y-8">
            {/* image gallery */}
            <div className="flex -mx-6 gap-4 overflow-x-auto px-6 pb-4">
              {project.images.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  alt={`${project.title} preview ${i + 1}`}
                  className="h-[300px] w-auto rounded-lg object-cover"
                />
              ))}
            </div>

            {/* tech stack */}
            <div>
              <h3 className="mb-3 font-heading text-sm tracking-[-0.07em] text-neutral-950">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="rounded-full border border-neutral-200 px-4 py-1.5 text-xs tracking-tighter text-neutral-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* description */}
            <p className="text-sm tracking-tighter text-neutral-700 leading-relaxed">
              {project.description}
            </p>

            {/* links */}
            <div className="flex items-center gap-6 pt-4">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm tracking-tighter text-orange-600 hover:border-b hover:border-orange-600"
                >
                  Visit Project →
                </a>
              )}
              {project.repository && (
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm tracking-tighter text-orange-600 hover:border-b hover:border-orange-600"
                >
                  View Code →
                </a>
              )}
              <button
                onClick={onClose}
                className="ml-auto text-sm tracking-tighter text-neutral-700 hover:text-neutral-950"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProjectDrawer;
