import { useState, useEffect, useRef } from "react";

interface UseCounterOptions {
  end: number;
  duration?: number;
  start?: number;
  enabled?: boolean;
}

export function useCounter({
  end,
  duration = 2000,
  start = 0,
  enabled = true,
}: UseCounterOptions): number {
  const [count, setCount] = useState(start);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || end === 0) return;

    const startTime = performance.now();
    const range = end - start;

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.round(start + range * easedProgress);

      setCount(currentValue);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, start, duration, enabled]);

  return count;
}
