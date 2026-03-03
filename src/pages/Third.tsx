import { useState, useEffect, useCallback, useRef } from "react";

// ─── NOTE: Add to your index.html or _document.tsx ───────────────────────────
// <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CarouselItem {
  id: string;
  category: string;
  heading: string;
  description: string;
  image: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const carouselData: CarouselItem[] = [
  {
    id: "evidence-based",
    category: "Evidence-Based",
    heading: "Fortified by over 2,000 published medical journals",
    description:
      "We do the research that you don't have the time for, so that you can focus on what you love most. Gain the clarity, confidence and certainty to create lasting results and stay ahead of the industry.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=90",
  },
  {
    id: "expert-led",
    category: "Expert-Led",
    heading: "Taught by world-class practitioners with decades of experience",
    description:
      "Every course is designed and delivered by recognised leaders in their specialty. You'll gain real-world insights that go far beyond what textbooks can offer, sharpening your edge in the field.",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=1400&q=90",
  },
  {
    id: "accredited",
    category: "Accredited",
    heading: "Globally recognised accreditation you can trust",
    description:
      "Our certifications are accepted by leading professional bodies worldwide. Employers and clients recognise the rigour behind our credentials, giving you the competitive advantage you deserve.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1400&q=90",
  },
  {
    id: "practical",
    category: "Practical",
    heading: "Hands-on learning designed for real-world application",
    description:
      "Theory alone won't cut it. Our curriculum is built around case studies, applied projects and skill-based assessments so you graduate ready to make an immediate impact from day one.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=90",
  },
];

const AUTO_INTERVAL = 4500;
const RESUME_DELAY = 8000;

// ─── Injected CSS ─────────────────────────────────────────────────────────────

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  .cs-root *, .cs-root *::before, .cs-root *::after { box-sizing: border-box; }

  /* ── Tab navigation box ── */
  .cs-tabbox {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    overflow: hidden;
  }
  .cs-tabs-row {
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    border-bottom: 1px solid #f3f4f6;
  }
  .cs-tabs-row::-webkit-scrollbar { display: none; }
  .cs-tab {
    position: relative;
    padding: 12px 18px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12.5px;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: #9ca3af;
    background: transparent;
    border: none;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: color 0.2s ease;
  }
  .cs-tab::after {
    content: '';
    position: absolute;
    bottom: 0; left: 14px; right: 14px;
    height: 2px;
    background: #111827;
    border-radius: 2px 2px 0 0;
    transform: scaleX(0);
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .cs-tab.active { color: #111827; }
  .cs-tab.active::after { transform: scaleX(1); }
  .cs-tab:hover:not(.active) { color: #374151; }

  /* ── Arrow controls row ── */
  .cs-controls-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 18px;
  }
  .cs-arrow {
    width: 40px; height: 40px;
    border-radius: 50%;
    border: 1.5px solid #e5e7eb;
    background: #f9fafb;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: all 0.22s ease;
    flex-shrink: 0;
  }
  .cs-arrow:hover {
    background: #111827;
    border-color: #111827;
  }
  .cs-arrow:hover svg path { stroke: #fff; }
  .cs-arrow svg path { stroke: #6b7280; transition: stroke 0.22s ease; }

  .cs-progress-track {
    flex: 1;
    height: 3px;
    background: #f3f4f6;
    border-radius: 99px;
    overflow: hidden;
  }
  .cs-progress-bar {
    height: 100%;
    background: #111827;
    border-radius: 99px;
    transform-origin: left;
    animation: cs-fill 4.5s linear forwards;
  }
  @keyframes cs-fill {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  .cs-slide-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: #6b7280;
    white-space: nowrap;
    min-width: 36px;
    text-align: right;
  }

  /* ── Text fade ── */
  .cs-fade { transition: opacity 0.32s ease, transform 0.32s ease; }
  .cs-fade.out { opacity: 0; transform: translateY(10px); }

  /* ── Thumbnails ── */
  .cs-thumb {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  .cs-thumb:hover { transform: scale(1.03); }
  .cs-thumb img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
    transition: transform 0.5s ease;
  }
  .cs-thumb:hover img { transform: scale(1.07); }
  .cs-thumb-overlay {
    position: absolute; inset: 0;
    background: rgba(0,0,0,0.4);
    transition: all 0.3s ease;
    border-radius: 12px;
  }
  .cs-thumb.active .cs-thumb-overlay {
    background: rgba(0,0,0,0.05);
    box-shadow: inset 0 0 0 2.5px rgba(255,255,255,0.95);
  }
  .cs-thumb:not(.active):hover .cs-thumb-overlay { background: rgba(0,0,0,0.2); }

  /* ── Main image ── */
  .cs-main-img-wrap {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    background: #d1d5db;
  }
  .cs-main-img {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    transition: opacity 0.5s ease;
  }
  .cs-main-badge {
    position: absolute;
    bottom: 22px; left: 22px;
    background: rgba(255,255,255,0.14);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.28);
    border-radius: 10px;
    padding: 8px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    color: #fff;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: opacity 0.3s ease;
  }

  /* ── CTA ── */
  .cs-cta {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    background: #111827;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    padding: 16px 22px;
    border-radius: 14px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    box-shadow: 0 2px 10px rgba(0,0,0,0.14);
    transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }
  .cs-cta:hover {
    background: #1f2937;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  }
  .cs-cta-icon {
    width: 30px; height: 30px;
    background: rgba(255,255,255,0.12);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.2s ease;
  }
  .cs-cta:hover .cs-cta-icon { transform: translateX(4px); }

  /* ── Section entrance ── */
  .cs-enter { transition: opacity 0.9s ease, transform 0.9s ease; }
  .cs-enter.out { opacity: 0; transform: translateY(30px); }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .cs-body { flex-direction: column !important; }
    .cs-left { flex: 0 0 auto !important; width: 100% !important; }
    .cs-right { width: 100% !important; }
  }
  @media (max-width: 640px) {
    .cs-thumb-col {
      flex-direction: row !important;
      width: 100% !important;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .cs-thumb-col::-webkit-scrollbar { display: none; }
    .cs-thumb { width: 80px !important; height: 80px !important; flex-shrink: 0; }
    .cs-right { flex-direction: column-reverse !important; }
    .cs-main-img-wrap { min-height: 280px !important; }
    .cs-cta { max-width: 100% !important; }
  }
`;

// ─── FadeContent ──────────────────────────────────────────────────────────────

function FadeContent({ children, trigger }: { children: React.ReactNode; trigger: string }) {
  const [show, setShow] = useState(true);
  const prev = useRef(trigger);

  useEffect(() => {
    if (prev.current !== trigger) {
      setShow(false);
      const t = setTimeout(() => { setShow(true); prev.current = trigger; }, 240);
      return () => clearTimeout(t);
    }
  }, [trigger]);

  return <div className={`cs-fade${show ? "" : " out"}`}>{children}</div>;
}

// ─── Arrow SVG ────────────────────────────────────────────────────────────────

function ArrowSVG({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path
        d={dir === "right" ? "M2.5 7.5h10m-4.5-4 4.5 4-4.5 4" : "M12.5 7.5h-10m4.5-4-4.5 4 4.5 4"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CertificationSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(carouselData[0].image);
  const [imgVisible, setImgVisible] = useState(true);
  const [inView, setInView] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const paused = useRef(false);

  const active = carouselData[activeIndex];

  // Entrance animation
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Image crossfade
  useEffect(() => {
    setImgVisible(false);
    const t = setTimeout(() => {
      setImgSrc(carouselData[activeIndex].image);
      setImgVisible(true);
    }, 130);
    return () => clearTimeout(t);
  }, [activeIndex]);

  // Auto-rotate
  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      if (!paused.current) {
        setActiveIndex(i => (i + 1) % carouselData.length);
        setProgressKey(k => k + 1);
      }
    }, AUTO_INTERVAL);
  }, []);

  useEffect(() => {
    startAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [startAuto]);

  const handleSelect = (i: number) => {
    if (i === activeIndex) return;
    paused.current = true;
    setActiveIndex(i);
    setProgressKey(k => k + 1);
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => { paused.current = false; }, RESUME_DELAY);
  };

  const handlePrev = () => handleSelect((activeIndex - 1 + carouselData.length) % carouselData.length);
  const handleNext = () => handleSelect((activeIndex + 1) % carouselData.length);

  return (
    <>
      <style>{CSS}</style>

      <section
        ref={sectionRef}
        className="cs-root"
        style={{
          width: "100%",
          background: "#f0f0ed",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "80px 48px",
          minHeight: "100vh",
        }}
      >
        {/* ── Title ── */}
        <div
          className={`cs-enter${inView ? "" : " out"}`}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 4vw, 3.6rem)",
            fontWeight: 400,
            color: "#111827",
            lineHeight: 1.18,
            letterSpacing: "-0.025em",
            margin: 0,
          }}>
            What makes our<br />
            <em style={{ fontStyle: "italic", fontWeight: 700 }}>certification</em>{" "}
            <span style={{ fontWeight: 400 }}>different</span>
          </h2>
        </div>

        {/* ── Body ── */}
        <div
          className={`cs-body cs-enter${inView ? "" : " out"}`}
          style={{
            transitionDelay: "0.2s",
            width: "100%",
            maxWidth: "1300px",
            display: "flex",
            gap: "56px",
            alignItems: "flex-start",
          }}
        >
          {/* ── LEFT ── */}
          <div
            className="cs-left"
            style={{
              flex: "0 0 360px",
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              paddingTop: "8px",
            }}
          >
            {/* Tabbed navigation box */}
            <div className="cs-tabbox">
              {/* Tab row */}
              <div className="cs-tabs-row">
                {carouselData.map((item, i) => (
                  <button
                    key={item.id}
                    className={`cs-tab${i === activeIndex ? " active" : ""}`}
                    onClick={() => handleSelect(i)}
                  >
                    {item.category}
                  </button>
                ))}
              </div>

              {/* Arrow + progress row */}
              <div className="cs-controls-row">
                <button className="cs-arrow" onClick={handlePrev} aria-label="Previous">
                  <ArrowSVG dir="left" />
                </button>
                <div className="cs-progress-track">
                  <div key={progressKey} className="cs-progress-bar" />
                </div>
                <button className="cs-arrow" onClick={handleNext} aria-label="Next">
                  <ArrowSVG dir="right" />
                </button>
                <span className="cs-slide-label">
                  {activeIndex + 1} / {carouselData.length}
                </span>
              </div>
            </div>

            {/* Heading */}
            <FadeContent trigger={active.id}>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.5rem, 2.2vw, 2.1rem)",
                fontWeight: 700,
                color: "#111827",
                lineHeight: 1.3,
                letterSpacing: "-0.015em",
                margin: 0,
              }}>
                {active.heading}
              </h3>
            </FadeContent>

            {/* Description */}
            <FadeContent trigger={active.id}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                color: "#6b7280",
                lineHeight: 1.8,
                margin: 0,
              }}>
                {active.description}
              </p>
            </FadeContent>

            {/* CTA */}
            <a
              href="#courses"
              className="cs-cta"
              style={{ width: "100%", maxWidth: "280px", marginTop: "4px" }}
            >
              <span>Explore Courses</span>
              <span className="cs-cta-icon">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>

          {/* ── RIGHT ── */}
          <div
            className="cs-right"
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              gap: "12px",
              alignItems: "stretch",
            }}
          >
            {/* Thumbnail strip */}
            <div
              className="cs-thumb-col"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "96px",
                flexShrink: 0,
              }}
            >
              {carouselData.map((item, i) => (
                <div
                  key={item.id}
                  className={`cs-thumb${i === activeIndex ? " active" : ""}`}
                  style={{ width: "100%", height: "118px" }}
                  onClick={() => handleSelect(i)}
                  role="button"
                  aria-label={`View ${item.category}`}
                  tabIndex={0}
                  onKeyDown={e => e.key === "Enter" && handleSelect(i)}
                >
                  <img src={item.image} alt={item.category} />
                  <div className="cs-thumb-overlay" />
                </div>
              ))}
            </div>

            {/* Main image */}
            <div
              className="cs-main-img-wrap"
              style={{ flex: 1, minHeight: "530px" }}
            >
              <img
                className="cs-main-img"
                src={imgSrc}
                alt={active.category}
                style={{ opacity: imgVisible ? 1 : 0 }}
              />
              {/* Vignette */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.28) 100%)",
                pointerEvents: "none",
              }} />
              {/* Active category badge */}
              <FadeContent trigger={active.id}>
                <div className="cs-main-badge">{active.category}</div>
              </FadeContent>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
