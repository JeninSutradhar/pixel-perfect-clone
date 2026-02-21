

## Project Showcase Section

A full-viewport scroll-driven section below the hero with stacked project cards that fan out as you scroll, plus two diagonal animated orange text strips running behind the cards.

### Visual Breakdown

**1. Diagonal Orange Strips**
- Two orange banner strips rotated diagonally (~-8deg and ~8deg) running across the full viewport width
- Text reads "SELECTED CLIENT WORK" repeated, in a blocky/pixel-style font (we will use uppercase Inter black with letter-spacing to approximate)
- Strips sit behind the cards (z-index layering)

**2. Stacked Project Cards**
- 5-6 cards stacked in the center with slight offset (like a deck)
- Each card has:
  - A large project image (top portion, rounded corners at top)
  - A colored ticket/label at the bottom with: project name, decorative braille dots, a faux QR code pattern, barcode, "EXPIRED DATE" + year
  - Different label colors per card: orange, lime/yellow, cyan, etc.
  - Black border, slight shadow
- As the user scrolls, cards peel off one by one -- alternating left and right with rotation
- Uses scroll-driven transforms (translateX + rotate) calculated from scroll position

**3. Pink Circle Button**
- A pink/magenta circle with a cursor arrow icon, positioned bottom-left

**4. "VIEW ALL" Link**
- Top-right with a sparkle icon

### Technical Approach

**New Component: `src/components/ProjectShowcase.tsx`**

- Uses `useEffect` + `useRef` to track scroll position within the section
- A sticky container (height ~400vh to give scroll room) with the visual content fixed in view
- Each card gets a computed transform based on scroll progress:
  - Cards start stacked in center
  - As scroll progresses, card index determines: odd cards slide left + rotate negative, even cards slide right + rotate positive
  - Use `transform: translateX(${x}px) rotate(${deg}deg)` with CSS transitions for smoothness
- The two diagonal strips are absolutely positioned divs with `transform: rotate()` and overflow hidden

**Project Data Structure:**
```typescript
const projects = [
  { name: "JEAN PHILIPPE", year: "2023", color: "#FF6600", image: placeholder },
  { name: "THE FLEUR", year: "2022", color: "#CCFF00", image: placeholder },
  { name: "ZUNC STUDIO", year: "2022", color: "#00FFFF", image: placeholder },
  { name: "NEON ARTS", year: "2023", color: "#FF6600", image: placeholder },
  { name: "PIXEL LABS", year: "2022", color: "#CCFF00", image: placeholder },
]
```

**Card Component (inline):**
- Image section: 60-70% height, dark rounded corners at top
- Ticket section: colored background with dotted border at top, contains project name, faux braille dots (small squares), a fake QR code (grid of small black squares), barcode lines, "EXPIRED DATE" + year

**Scroll Animation Logic:**
1. Section has `height: 400vh` with a sticky inner container
2. On scroll, calculate progress (0 to 1) within the section
3. Map progress to card animations:
   - Card 0 (front): stays until progress > 0.2, then flies left
   - Card 1: stays until progress > 0.35, then flies right
   - Card 2: stays until progress > 0.5, then flies left
   - etc.
4. Each card's translateX goes from 0 to +/-120vw, rotate from 0 to +/-15deg

**Integration in `src/pages/Index.tsx`:**
- Import and place `<ProjectShowcase />` between the `</main>` and the bottom ticker bar

**Tailwind Config Updates:**
- Add a marquee/scroll keyframe animation for the diagonal strips text (continuous horizontal scroll)

### Files to Create/Modify
1. **Create** `src/components/ProjectShowcase.tsx` - The full showcase section
2. **Modify** `src/pages/Index.tsx` - Import and add the component
3. **Modify** `tailwind.config.ts` - Add marquee animation keyframe
