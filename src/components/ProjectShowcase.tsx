import { useEffect, useRef, useState, useMemo } from "react";

const projects = [
  { name: "JEAN PHILIPPE", year: "2023", color: "hsl(24, 100%, 50%)" },
  { name: "THE FLEUR", year: "2022", color: "hsl(75, 100%, 50%)" },
  { name: "ZUNC STUDIO", year: "2022", color: "hsl(180, 100%, 50%)" },
  { name: "NEON ARTS", year: "2023", color: "hsl(24, 100%, 50%)" },
  { name: "PIXEL LABS", year: "2024", color: "hsl(75, 100%, 50%)" },
];

// Generate a small fake QR code grid
const FauxQR = ({ size = 7 }: { size?: number }) => {
  const grid = useMemo(
    () =>
      Array.from({ length: size }, () =>
        Array.from({ length: size }, () => Math.random() > 0.4)
      ),
    [size]
  );
  return (
    <div className="grid gap-[1px]" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
      {grid.flat().map((filled, i) => (
        <div
          key={i}
          className={filled ? "bg-foreground" : "bg-transparent"}
          style={{ width: 4, height: 4 }}
        />
      ))}
    </div>
  );
};

// Generate barcode lines
const Barcode = ({ count = 24 }: { count?: number }) => {
  const bars = useMemo(
    () => Array.from({ length: count }, () => ({ w: Math.random() > 0.5 ? 2 : 1, h: 18 + Math.random() * 14 })),
    [count]
  );
  return (
    <div className="flex items-end gap-[1px]">
      {bars.map((b, i) => (
        <div key={i} className="bg-foreground" style={{ width: b.w, height: b.h }} />
      ))}
    </div>
  );
};

// Braille-like dots
const BrailleDots = () => (
  <div className="grid grid-cols-2 gap-[2px]">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="w-1.5 h-1.5 rounded-full bg-foreground/70" />
    ))}
  </div>
);

const ProjectCard = ({
  project,
  style,
}: {
  project: (typeof projects)[0];
  style: React.CSSProperties;
}) => (
  <div
    className="absolute w-[320px] md:w-[380px] border-2 border-foreground shadow-[4px_4px_0px_0px] shadow-foreground/30 bg-card overflow-hidden will-change-transform"
    style={style}
  >
    {/* Image area */}
    <div className="w-full h-[220px] md:h-[260px] bg-foreground/10 overflow-hidden rounded-t-sm">
      <div className="w-full h-full bg-gradient-to-br from-foreground/5 to-foreground/20 flex items-center justify-center">
        <span className="text-foreground/30 text-xs uppercase tracking-widest">Project Preview</span>
      </div>
    </div>

    {/* Ticket section */}
    <div
      className="p-4 border-t-2 border-dashed border-foreground/40"
      style={{ backgroundColor: project.color }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-black uppercase tracking-tight text-foreground leading-tight">
            {project.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <BrailleDots />
            <span className="text-[9px] uppercase tracking-wider text-foreground/70 font-medium">
              EXPIRED DATE
            </span>
            <span className="text-[9px] font-bold text-foreground">{project.year}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <FauxQR size={7} />
          <Barcode count={16} />
        </div>
      </div>
    </div>
  </div>
);

const MARQUEE_TEXT = "SELECTED CLIENT WORK \u00A0\u2022\u00A0 ";

const DiagonalStrip = ({
  angle,
  top,
}: {
  angle: number;
  top: string;
}) => (
  <div
    className="absolute left-[-20%] w-[140%] overflow-hidden z-0 pointer-events-none"
    style={{ top, transform: `rotate(${angle}deg)` }}
  >
    <div className="bg-primary py-3 flex whitespace-nowrap animate-marquee">
      {Array.from({ length: 4 }).map((_, i) => (
        <span
          key={i}
          className="text-primary-foreground text-2xl md:text-3xl font-black uppercase tracking-[0.2em] mx-4"
        >
          {Array.from({ length: 6 }).map((_, j) => (
            <span key={j}>{MARQUEE_TEXT}</span>
          ))}
        </span>
      ))}
    </div>
  </div>
);

const ProjectShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      // progress 0 when section top hits viewport bottom, 1 when section bottom hits viewport top
      const scrolled = -rect.top;
      const total = sectionHeight - viewportHeight;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCardStyle = (index: number): React.CSSProperties => {
    const total = projects.length;
    // Each card has a threshold where it starts flying off
    const threshold = 0.1 + (index / total) * 0.7;
    const exitDuration = 0.18; // portion of progress for the exit anim

    // Stack offset when idle
    const stackOffsetY = index * -6;
    const stackOffsetX = index * 2;
    const stackRotate = index * -1.5;

    let x = stackOffsetX;
    let y = stackOffsetY;
    let rotate = stackRotate;
    let opacity = 1;
    let scale = 1 - index * 0.02;

    if (progress > threshold) {
      const exitProgress = Math.min(1, (progress - threshold) / exitDuration);
      const eased = exitProgress * exitProgress; // ease-in
      const direction = index % 2 === 0 ? -1 : 1;
      x = stackOffsetX + direction * eased * 120; // vw units handled via calc
      y = stackOffsetY - eased * 80;
      rotate = stackRotate + direction * eased * 25;
      opacity = 1 - eased;
      scale = scale + eased * 0.05;
    }

    return {
      transform: `translateX(${x}vw) translateY(${y}px) rotate(${rotate}deg) scale(${scale})`,
      opacity,
      zIndex: total - index,
      transition: "transform 0.05s linear, opacity 0.05s linear",
    };
  };

  return (
    <section ref={sectionRef} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Diagonal strips behind cards */}
        <DiagonalStrip angle={-8} top="20%" />
        <DiagonalStrip angle={8} top="55%" />

        {/* VIEW ALL link */}
        <div className="absolute top-8 right-8 md:right-12 z-20 flex items-center gap-2">
          <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14 8H20L15 12L17 18L12 14L7 18L9 12L4 8H10L12 2Z" />
          </svg>
          <a href="#" className="text-sm font-bold uppercase tracking-wider underline underline-offset-4 hover:opacity-70 transition-opacity">
            View All
          </a>
        </div>

        {/* Pink circle button */}
        <div className="absolute bottom-8 left-8 md:left-12 z-20">
          <div className="w-14 h-14 rounded-full bg-[hsl(330,80%,55%)] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg">
            <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M5 3L19 12L5 21V3Z" />
            </svg>
          </div>
        </div>

        {/* Project cards */}
        <div className="relative z-10 flex items-center justify-center">
          {[...projects].reverse().map((project, reverseIndex) => {
            const index = projects.length - 1 - reverseIndex;
            return (
              <ProjectCard
                key={project.name}
                project={project}
                style={getCardStyle(index)}
              />
            );
          })}
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 right-8 md:right-12 z-20 text-xs tracking-wider text-foreground/50 font-medium">
          SCROLL TO EXPLORE
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
