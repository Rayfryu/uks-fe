import { useEffect, useRef, useState } from "react";
import { Stats } from "../components/Stats";

interface HeroStats {
  course_units: number;
  countries_educated: number;
  laboratory_tests: number;
}

const DEFAULT_STATS: HeroStats = {
  course_units: 0,
  countries_educated: 0,
  laboratory_tests: 0,
};

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stats, setStats] = useState<HeroStats>(DEFAULT_STATS);
  const [isLoading, setIsLoading] = useState(true);
  const [btnHovered, setBtnHovered] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/hero-stats");
        if (!response.ok) throw new Error("Failed to fetch");
        const data: HeroStats = await response.json();
        setStats(data);
      } catch {
        setStats({ course_units: 966, countries_educated: 46, laboratory_tests: 22 });
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statItems = [
    { label: "Course Units", value: stats.course_units },
    { label: "Countries Educated", value: stats.countries_educated },
    { label: "Laboratory Tests", value: stats.laboratory_tests },
  ];

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
      }}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/video/bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.28) 55%, rgba(0,0,0,0.18) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── TOP RIGHT: Stats ── */}
      {!isLoading && (
        <div
          style={{
            position: "absolute",
            top: "150px",
            right: "52px",
            zIndex: 2,
            width: "260px",
          }}
          className="hero-stats-pos"
        >
          <Stats stats={statItems} />
        </div>
      )}

      {/* ── BOTTOM LEFT: Headline + Subtext ── */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "52px",
          zIndex: 2,
          maxWidth: "520px",
        }}
        className="hero-headline-pos"
      >
      <h1
  style={{
    fontFamily: "'Lay Grotesk', 'DM Sans', sans-serif",
    fontSize: "64px",
    fontWeight: 500,
    color: "#F1F1F1",
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
    margin: 0,
    maxWidth: "720px",
  }}
>
  Global leaders in functional medicine and nutrition
</h1>

<p
  style={{
    fontFamily: "'Lay Grotesk', 'DM Sans', sans-serif",
    fontSize: "18px",
    fontWeight: 400,
    color: "rgba(241,241,241,0.75)",
    lineHeight: 1.65,
    maxWidth: "520px",
    margin: 0,
    marginTop: "20px",
  }}
>
  The only integrative nutritional therapy certification combining
  functional blood work, nutrition and business mentorship.
</p>
      </div>

      {/* ── BOTTOM RIGHT: Learn More Button ── */}
<div
  style={{
    position: "absolute",
    bottom: "20px",
    right: "40px",
    zIndex: 2,
  }}
  className="hero-btn-pos"
>
  <button
    onMouseEnter={() => setBtnHovered(true)}
    onMouseLeave={() => setBtnHovered(false)}
    style={{
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
      width: "210px",
      height: "100px",
      padding: "20px 18px",
      background: btnHovered
        ? "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.12))"
        : "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08))",
      border: "1px solid rgba(255,255,255,0.25)",
      borderRadius: "1px",
      cursor: "pointer",
      backdropFilter: "blur(30px)",
      WebkitBackdropFilter: "blur(30px)",
      transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
      outline: "none",
      transform: btnHovered ? "translateY(-4px) scale(1.03)" : "translateY(0) scale(1)",
      boxShadow: btnHovered
        ? "0 12px 30px rgba(0,0,0,0.25)"
        : "0 6px 18px rgba(0,0,0,0.18)",
    }}
  >
    {/* Text top-left */}
    <span
      style={{
        fontFamily: "'Lay Grotesk', 'DM Sans', sans-serif",
        fontSize: "15px",
        fontWeight: 500,
        color: "#F5F5F5",
        letterSpacing: "0.03em",
      }}
    >
      Learn More
    </span>

    {/* Arrow bottom-right */}
   <span
  style={{
    alignSelf: "flex-end",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "22px",
    height: "22px",
    transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
    transform: btnHovered ? "translate(-3px, 3px)" : "translate(0, 0)",
  }}
>
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 5V13M13 13H5M13 13L5 5"
      stroke="#F5F5F5"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</span>
  </button>
</div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .hero-stats-pos {
            top: 24px !important;
            right: 24px !important;
            width: 180px !important;
          }
          .hero-headline-pos {
            bottom: 140px !important;
            left: 24px !important;
            right: 24px !important;
            max-width: 100% !important;
          }
          .hero-headline-pos h1 {
            font-size: 28px !important;
          }
          .hero-btn-pos {
            bottom: 32px !important;
            right: 24px !important;
          }
        }
        @media (max-width: 480px) {
          .hero-headline-pos h1 {
            font-size: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
