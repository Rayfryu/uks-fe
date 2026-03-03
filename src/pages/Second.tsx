"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SlideData {
  id: number;
  title: string;
  category: string;
  units: number;
  image: string;
  alt: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const SLIDES: SlideData[] = [
  {
    id: 1,
    title: "Advanced Gut Health",
    category: "Seminars",
    units: 18,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    alt: "Fresh vegetables for gut health",
  },
  {
    id: 2,
    title: "Mould & Mycotoxins",
    category: "Seminars",
    units: 23,
    image: "https://images.unsplash.com/photo-1584464457574-9e8e18e57e56?w=600&q=80",
    alt: "Mould and mycotoxins course",
  },
  {
    id: 3,
    title: "Stress & Cortisol",
    category: "Workshops",
    units: 14,
    image: "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=600&q=80",
    alt: "Stress management and cortisol",
  },
  {
    id: 4,
    title: "Men's Health",
    category: "Masterclass",
    units: 31,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    alt: "Men's health and fitness",
  },
  {
    id: 5,
    title: "Hormonal Balance",
    category: "Seminars",
    units: 20,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
    alt: "Hormonal balance course",
  },
  {
    id: 6,
    title: "Sleep Optimization",
    category: "Workshops",
    units: 12,
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80",
    alt: "Sleep optimization and recovery",
  },
];

const HEADING = "Program kesehatan terstruktur dan kegiatan berdampak yang dijalankan oleh UKS dan PMR.";

// ─── Hook: Scroll Into View ───────────────────────────────────────────────────

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── Animated Heading ────────────────────────────────────────────────────────

function AnimatedHeading({ text, inView }: { text: string; inView: boolean }) {
  const words = text.split(" ");
  return (
    <h2
      className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.15] font-normal text-zinc-900 mb-8"
      style={{ fontFamily: "'DM Serif Display', serif" }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.25em] last:mr-0"
          aria-hidden="true"
        >
          <span
            style={{
              display: "inline-block",
              transform: inView ? "translateY(0)" : "translateY(110%)",
              opacity: inView ? 1 : 0,
              transition: `transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.035}s,
                           opacity   0.45s ease                            ${i * 0.035}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </h2>
  );
}

// ─── Floating Label Box ───────────────────────────────────────────────────────

interface FloatingLabelProps {
  category: string;
  units: number;
}

function FloatingLabel({ category, units }: FloatingLabelProps) {
  return (
    <div
      className="
        absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
        z-20 pointer-events-none
        bg-white/95 backdrop-blur-sm
        rounded-xl shadow-lg shadow-black/10
        px-5 py-3
        flex items-center justify-between gap-10
        min-w-[220px]
        transition-all duration-500 ease-out
      "
      role="status"
      aria-live="polite"
      aria-label={`${category}, ${units} units`}
    >
      <span
        className="text-sm font-semibold tracking-wide text-zinc-800"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {category}
      </span>
      <span
        className="text-xs font-medium text-zinc-400"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {units} Units
      </span>
    </div>
  );
}

// ─── Slide Card ───────────────────────────────────────────────────────────────

interface SlideCardProps {
  slide: SlideData;
  isActive: boolean;
}

function SlideCard({ slide, isActive }: SlideCardProps) {
  return (
    <div
      className="
        embla__slide flex-shrink-0
        w-[72vw] sm:w-[48vw] md:w-[36vw] lg:w-[28vw] xl:w-[24vw]
        mr-5
      "
      role="group"
      aria-label={slide.title}
    >
      <div
        className={`
          relative overflow-hidden rounded-2xl
          transition-all duration-500 ease-out
          ${isActive
            ? "shadow-2xl shadow-black/20 scale-100"
            : "shadow-md shadow-black/10 scale-95 opacity-75"}
        `}
      >
        <div className="aspect-[4/3] overflow-hidden bg-zinc-100">
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </div>
        <div className="px-4 py-4 bg-white">
          <h3
            className="text-sm font-semibold text-zinc-800 leading-snug"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {slide.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HealthEducationSection() {
  const { ref: sectionRef, inView } = useInView(0.15);

  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false, dragFree: false },
    [autoplay.current]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const activeSlide = SLIDES[activeIndex % SLIDES.length];

  // Button + carousel fade-up, staggered after heading finishes
  const wordCount = HEADING.split(" ").length;
  const headingDuration = wordCount * 0.035 + 0.65; // last word finish time
  const buttonDelay  = `${headingDuration - 0.1}s`;
  const carouselDelay = `${headingDuration + 0.05}s`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .embla { overflow: hidden; }
        .embla__container { display: flex; }

        .fade-up {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .fade-up.in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <section
        ref={sectionRef}
        className="
          relative min-h-screen w-full
          bg-[#EBEBEB]
          px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28
          pt-20 pb-16
          flex flex-col justify-center
          overflow-hidden
        "
        aria-label="Health education courses"
      >
        {/* ── Heading (word-by-word animation) ── */}
        <div className="max-w-2xl mb-10 md:mb-14">
          <AnimatedHeading text={HEADING} inView={inView} />

          {/* Button fades in after heading */}
          <a
            href="#courses"
            className={`fade-up ${inView ? "in" : ""}
              inline-flex items-center gap-3
              bg-zinc-900 text-white
              px-6 py-3.5 rounded-lg
              text-sm font-medium tracking-wide
              transition-colors duration-300
              hover:bg-zinc-700 hover:gap-4
              group
            `}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              transitionDelay: inView ? buttonDelay : "0s",
            }}
            aria-label="Browse all courses"
          >
            Lihat Program
            <span
              className="text-base opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              ↳
            </span>
          </a>
        </div>

        {/* ── Carousel Wrapper ── */}
        <div
          className={`fade-up ${inView ? "in" : ""} relative pt-8`}
          style={{ transitionDelay: inView ? carouselDelay : "0s" }}
        >
          <FloatingLabel category={activeSlide.category} units={activeSlide.units} />

          <div
            className="embla -mx-6 sm:-mx-10 md:-mx-16 lg:-mx-20 xl:-mx-28"
            ref={emblaRef}
            aria-label="Course carousel"
          >
            <div className="embla__container pl-6 sm:pl-10 md:pl-16 lg:pl-20 xl:pl-28">
              {SLIDES.map((slide, index) => (
                <SlideCard key={slide.id} slide={slide} isActive={index === activeIndex} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Dot Indicators ── */}
        <div
          className={`fade-up ${inView ? "in" : ""} flex items-center gap-2 mt-8`}
          style={{ transitionDelay: inView ? carouselDelay : "0s" }}
          role="tablist"
          aria-label="Carousel navigation"
        >
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`
                h-1.5 rounded-full transition-all duration-300
                ${index === activeIndex
                  ? "w-6 bg-zinc-800"
                  : "w-1.5 bg-zinc-400 hover:bg-zinc-600"}
              `}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Go to slide: ${slide.title}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
