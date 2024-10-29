import { type FC } from "react";

interface FloatingNavProps {
  visible: boolean;
}

const FloatingNav: FC<FloatingNavProps> = ({ visible }: FloatingNavProps) => {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transform transition-all duration-300 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between border-b border-neutral-200 bg-neutral-50/80 px-6 backdrop-blur-sm">
        <p className="font-heading text-lg tracking-[-0.07em] text-neutral-950">
          Something with software?
        </p>
        <a
          href="#quote"
          className="text-sm tracking-tighter text-orange-600 hover:border-b hover:border-orange-600"
        >
          Get a Quote →
        </a>
      </div>
    </nav>
  );
};

export default FloatingNav; 