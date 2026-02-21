import { useEffect, useRef, useState, useMemo } from "react";

const projects = [
  {
    name: "JEAN PHILIPPE",
    year: "2023",
    color: "#FF6600",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=600&fit=crop"
  },
  {
    name: "ZUNC STUDIO",
    year: "2022",
    color: "#FF6600",
    image: "https://images.unsplash.com/photo-1634842460017-c2b6bad3e07c?w=800&h=600&fit=crop"
  },
  {
    name: "ONDREJ ZUNKA",
    year: "2023",
    color: "#DFFF00",
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867eeb?w=800&h=600&fit=crop"
  },
  {
    name: "RAGS",
    year: "2022",
    color: "#00E5FF",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop"
  },
  {
    name: "THE FLEUR",
    year: "2024",
    color: "#00FF88",
    image: "https://images.unsplash.com/photo-1618219878776-593523677036?w=800&h=600&fit=crop"
  },
];

const FauxQR = ({ size = 8 }: { size?: number }) => {
  const grid = useMemo(
    () =>
      Array.from({ length: size }, () =>
        Array.from({ length: size }, () => Math.random() > 0.5)
      ),
    [size]
  );
  return (
    <div
      className="grid gap-[1px] border-2 border-foreground p-1"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
    >
      {grid.flat().map((filled, i) => (
        <div
          key={i}
          className={filled ? "bg-foreground" : "bg-transparent"}
          style={{ width: 3, height: 3 }}
        />
      ))}
    </div>
  );
};

const Barcode = ({ count = 20 }: { count?: number }) => {
  const bars = useMemo(
    () => Array.from({ length: count }, () => ({ w: Math.random() > 0.5 ? 2 : 1, h: 20 + Math.random() * 10 })),
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

const BrailleDots = () => (
  <div className="grid grid-cols-2 gap-[2px]">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="w-1 h-1 rounded-full bg-foreground" />
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
    className="absolute w-[340px] md:w-[400px] border-[3px] border-foreground shadow-[8px_8px_0px_0px] shadow-foreground/40 bg-card overflow-hidden will-change-transform rounded-md"
    style={style}
  >
    <div className="w-full h-[280px] md:h-[320px] bg-foreground/5 overflow-hidden">
      <img
        src={project.image}
        alt={project.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>

    <div
      className="px-3 py-2 border-t-[3px] border-dashed border-foreground"
      style={{ backgroundColor: project.color }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <Barcode count={12} />
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-[8px] uppercase tracking-wide font-medium leading-none">EXPIRED</p>
            <p className="text-[8px] uppercase tracking-wide font-medium leading-none">DATE</p>
            <p className="text-[10px] font-bold leading-none mt-0.5">{project.year}</p>
          </div>
          <FauxQR size={8} />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <h3 className="text-base md:text-lg font-black uppercase tracking-tight text-foreground leading-none">
          {project.name}
        </h3>
        <BrailleDots />
      </div>
    </div>
  </div>
);

const MARQUEE_TEXT = "WORK SELECTED CLIENT WORK SELECTED CLIENT ";

const DiagonalStrip = () => (
  <div
    className="absolute left-[-10%] w-[120%] overflow-hidden z-0 pointer-events-none"
    style={{
      top: "50%",
      transform: "translateY(-50%) rotate(-5deg)"
    }}
  >
    <div className="bg-primary py-4 md:py-6 flex whitespace-nowrap animate-marquee">
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className="text-foreground text-3xl md:text-5xl font-black uppercase tracking-wider mx-2"
          style={{
            WebkitTextStroke: "2px currentColor",
            WebkitTextFillColor: "transparent",
            textShadow: "none"
          }}
        >
          {MARQUEE_TEXT}
        </span>
      ))}
    </div>
  </div>
);

const ProjectShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      const total = sectionHeight - viewportHeight;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const getCardStyle = (index: number): React.CSSProperties => {
    const total = projects.length;
    const threshold = 0.1 + (index / total) * 0.7;
    const exitDuration = 0.18;

    const stackOffsetY = index * -8;
    const stackOffsetX = index * 4;
    const stackRotate = index * -2;

    let x = stackOffsetX;
    let y = stackOffsetY;
    let rotate = stackRotate;
    let opacity = 1;
    let scale = 1 - index * 0.03;

    if (progress > threshold) {
      const exitProgress = Math.min(1, (progress - threshold) / exitDuration);
      const eased = exitProgress * exitProgress;
      const direction = index % 2 === 0 ? -1 : 1;
      x = stackOffsetX + direction * eased * 120;
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
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "400vh" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-background">
        <DiagonalStrip />

        <div className="absolute top-8 right-8 md:right-12 z-20 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14 8H20L15 12L17 18L12 14L7 18L9 12L4 8H10L12 2Z" />
          </svg>
          <a href="#" className="text-sm font-bold uppercase tracking-wider text-foreground hover:opacity-70 transition-opacity">
            View All
          </a>
        </div>

        {isHovering && (
          <div
            className="fixed w-20 h-20 rounded-full flex items-center justify-center cursor-none z-50 pointer-events-none transition-opacity duration-300"
            style={{
              left: cursorPos.x - 40,
              top: cursorPos.y - 40,
              background: "linear-gradient(135deg, #E91E63 0%, #FF4081 100%)",
              boxShadow: "0 4px 20px rgba(233, 30, 99, 0.4)"
            }}
          >
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 7L17 17M17 17V7M17 17H7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}

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

        <div className="absolute bottom-8 right-8 md:right-12 z-20 text-xs tracking-wider text-foreground/50 font-medium uppercase">
          Scroll to Explore
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
