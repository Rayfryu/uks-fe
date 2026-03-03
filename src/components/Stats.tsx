import { useEffect, useRef, useState } from "react";
import { useCounter } from "./../hooks/UseCounter";

interface StatItem {
  label: string;
  value: number;
}

interface SingleStatProps {
  label: string;
  value: number;
  index: number;
  isVisible: boolean;
  duration: number;
}

function SingleStat({ label, value, index, isVisible, duration }: SingleStatProps) {
  const count = useCounter({ end: value, duration, enabled: isVisible });
  const progress = value > 0 ? count / value : 0;
  const stagger = index * 0.2;

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(-32px)",
        transition: `opacity 0.65s ease ${stagger}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${stagger}s`,
        paddingBottom: "28px",
      }}
    >
      {/* Label */}
      <p
        style={{
          fontFamily: "'Lay Grotesk', 'DM Sans', sans-serif",
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: "rgba(241,241,241,0.5)",
          marginBottom: "10px",
          fontWeight: 400,
          textTransform: "uppercase",
        }}
      >
        {label}
      </p>

      {/* Number */}
      <p
        style={{
          fontFamily: "'Lay Grotesk', 'DM Sans', sans-serif",
          fontSize: "72px",
          fontWeight: 300,
          color: "#F1F1F1",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          marginBottom: "14px",
        }}
      >
        {count}
      </p>

      {/* Progress bar track */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background: "rgba(241,241,241,0.15)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated fill bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: isVisible ? `${progress * 100}%` : "0%",
            background: "rgba(241,241,241,0.85)",
            transition: isVisible
              ? `width ${duration}ms cubic-bezier(0.22,1,0.36,1) ${stagger}s`
              : "none",
            borderRadius: "1px",
          }}
        />
      </div>
    </div>
  );
}

interface StatsProps {
  stats: StatItem[];
}

export function Stats({ stats }: StatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const DURATION = 2400;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0",
        minWidth: "220px",
        width: "100%",
      }}
    >
      {stats.map((stat, i) => (
        <SingleStat
          key={stat.label}
          label={stat.label}
          value={stat.value}
          index={i}
          isVisible={isVisible}
          duration={DURATION}
        />
      ))}
    </div>
  );
}
