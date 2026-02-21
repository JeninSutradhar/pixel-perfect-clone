import { useState, useEffect } from "react";

const Index = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative flex flex-col">
      {/* NAV */}
      <header className="flex items-start justify-between px-8 pt-6 md:px-12 md:pt-8">
        {/* Logo */}
        <div className="w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="24" cy="24" r="3" />
            <circle cx="24" cy="24" r="10" />
            <line x1="24" y1="4" x2="24" y2="14" />
            <line x1="24" y1="34" x2="24" y2="44" />
            <line x1="4" y1="24" x2="14" y2="24" />
            <line x1="34" y1="24" x2="44" y2="24" />
            <line x1="9.9" y1="9.9" x2="16.9" y2="16.9" />
            <line x1="31.1" y1="31.1" x2="38.1" y2="38.1" />
            <line x1="38.1" y1="9.9" x2="31.1" y2="16.9" />
            <line x1="16.9" y1="31.1" x2="9.9" y2="38.1" />
          </svg>
        </div>

        <div className="flex items-start gap-12 md:gap-20">
          <div className="hidden md:block text-right">
            <p className="text-xs tracking-wide">Say hello</p>
            <a href="mailto:hello@chrls.design" className="text-xs underline underline-offset-2 hover:opacity-70 transition-opacity">
              hello@chrls.design
            </a>
          </div>
          <a href="#" className="text-sm font-medium tracking-wider underline underline-offset-4 hover:opacity-70 transition-opacity uppercase">
            Archive
          </a>
        </div>
      </header>

      {/* MAIN HERO TEXT */}
      <main className="flex-1 flex flex-col justify-end px-8 md:px-12 pb-0">
        <h1
          className="font-black uppercase leading-[0.85] tracking-tighter"
          style={{ fontSize: "clamp(4rem, 14vw, 16rem)" }}
        >
          CHRLS.DSGN
        </h1>

        {/* ORANGE BAR */}
        <div className="bg-primary text-accent-foreground mt-0 -mx-8 md:-mx-12 px-8 md:px-12 py-5 flex flex-col md:flex-row md:items-end gap-4 relative">
          {/* Binary pattern box */}
          <div className="hidden md:block w-60 h-24 border border-foreground/20 bg-primary/80 p-2 overflow-hidden font-mono text-[8px] leading-tight opacity-70 flex-shrink-0">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                {Array.from({ length: 48 }).map(() => (Math.random() > 0.5 ? "1" : "0")).join(" ")}
              </div>
            ))}
          </div>

          <div className="flex-1">
            <p className="text-[10px] md:text-xs leading-snug uppercase tracking-wide max-w-xl">
              CAN BE HANDLED BY BOTH MEN AND WOMEN. THINK MORE, DESIGN LESS. AFTER USE APPLY ON
              SOCIAL MEDIA AND SHARE. SIDE STEP. MAKE STEAK (OPTIONAL, BUT RECOMMENDED). FOR BEST
              RESULTS, PLEASE CONTACT YOUR PROFESSIONAL DESIGNER / DEVELOPER. SOMETHING'S NEVER
              TOO FANCY. FOR WORST RESULTS, USE WITHOUT COFFEE/TEA. NOW TIME TO SIT BACK & RELAX.
            </p>
            <p className="text-lg md:text-xl font-bold uppercase mt-3 tracking-wide">
              Independent Developer
            </p>
          </div>

          {/* Right side info */}
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className="text-xs font-medium tracking-wide">CHRLS©2023</span>
            {/* Barcode-like lines */}
            <div className="flex items-end gap-[2px] h-6 mt-1">
              {[3,1,4,1,2,3,1,1,4,2,1,3,1,2,1,4,1,1,3,2].map((h, i) => (
                <div key={i} className="bg-foreground" style={{ width: 2, height: h * 5 }} />
              ))}
            </div>
            <span className="text-xs tracking-wide mt-1">MADE IN INDONESIA.</span>
          </div>
        </div>
      </main>

      {/* BOTTOM TICKER BAR */}
      <div className="bg-background border-t border-foreground/10 px-4 py-2 flex items-center justify-center gap-4 text-xs tracking-wider overflow-hidden">
        {/* Left barcode */}
        <div className="flex items-center gap-[1px] flex-shrink-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="bg-foreground" style={{ width: Math.random() > 0.5 ? 2 : 1, height: 16 + Math.random() * 8 }} />
          ))}
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-foreground inline-block" />
          </span>
          <span>AVLB : 2025(MMXXV)</span>
          <span className="w-1.5 h-1.5 rounded-full border border-foreground inline-block" />
          <span>COMING SOON</span>
          <span className="w-1.5 h-1.5 rounded-full border border-foreground inline-block" />
          <span>{formattedTime}</span>
          <span className="w-1.5 h-1.5 rounded-full border border-foreground inline-block" />
        </div>

        {/* Right barcode */}
        <div className="flex items-center gap-[1px] flex-shrink-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="bg-foreground" style={{ width: Math.random() > 0.5 ? 2 : 1, height: 16 + Math.random() * 8 }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
