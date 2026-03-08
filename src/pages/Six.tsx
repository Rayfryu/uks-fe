import { useState, useEffect, useRef } from "react";

interface Section {
  label: string;
  title: string;
  description: string;
}

const sections: Section[] = [
  {
    label: "Kesadaran Kesehatan",
    title: "Siswa Sehat",
    description:
      "Melalui kegiatan UKS dan PMR, siswa belajar pentingnya menjaga kesehatan diri dan lingkungan. Kebiasaan sederhana seperti mencuci tangan, berolahraga, dan mengonsumsi makanan bergizi dapat memberikan dampak besar bagi kesehatan sehari-hari.",
  },
  {
    label: "Pertolongan Pertama",
    title: "Siap Membantu",
    description:
      "Anggota PMR dilatih untuk memberikan pertolongan pertama ketika terjadi kecelakaan atau keadaan darurat di sekolah. Mulai dari menangani luka ringan hingga merespons situasi tak terduga, keterampilan ini membantu menciptakan lingkungan sekolah yang lebih aman.",
  },
  {
    label: "Lingkungan Sekolah",
    title: "Sekolah Sehat",
    description:
      "UKS dan PMR mendorong siswa untuk peduli terhadap lingkungan sekitar. Kelas yang bersih, pengelolaan sampah yang baik, serta kampanye kesehatan membantu membangun budaya sekolah yang sehat dan saling mendukung.",
  },
];

interface CardProps {
  section: Section;
  activeIndex: number;
  index: number;
}

function Card({ section, activeIndex, index }: CardProps) {
  const offset = index - activeIndex;

  return (
    <div
      className="absolute inset-0 w-full transition-all duration-700 ease-out"
      style={{
        transform: `translateY(${offset * 70}px) scale(${1 - Math.abs(offset) * 0.05})`,
        zIndex: 100 - Math.abs(offset),
        opacity: Math.abs(offset) > 4 ? 0 : 1,
      }}
    >
      <div className="bg-white/95 backdrop-blur rounded-3xl shadow-xl border border-gray-200 p-10 md:p-12 h-full flex flex-col justify-between">

        {/* Label */}
        <div className="flex items-center justify-between mb-8">
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {section.label}
          </span>

          <span className="w-2 h-2 rounded-full bg-gray-900 block" />
        </div>

        {/* Title */}
        <div className="flex-1 flex flex-col justify-center py-10">
          <p
            className="text-6xl md:text-7xl font-light text-gray-900 leading-none tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {section.title}
          </p>
        </div>

        {/* Description */}
        <p
          className="text-base text-gray-500 leading-relaxed max-w-md"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {section.description}
        </p>

        {/* Indicator */}
        <div className="flex gap-2 mt-10">
          {sections.map((_, i) => (
            <div
              key={i}
              className={`h-0.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-8 bg-gray-900" : "w-3 bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WhyWeExist() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        {
          threshold: 0.6,
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
      `}</style>

      <div className="min-h-screen bg-[#e8e8e8]">

        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-16">
            <div className="flex gap-24 relative">

              {/* LEFT */}
              <div className="w-1/2 sticky top-0 h-screen flex flex-col justify-center">
                <div className="flex items-start gap-5">

                  <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0 mt-2">
                    <span
                      className="text-white text-sm"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      1
                    </span>
                  </div>

                  <h2
                    className="text-7xl font-light text-gray-900 leading-tight"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Why we<br />exist
                  </h2>

                </div>
              </div>

              {/* RIGHT */}
              <div className="w-1/2 py-32">

                <div className="sticky top-20">
                  <div className="relative h-[520px]">

                    {sections.map((section, i) => (
                      <Card
                        key={i}
                        section={section}
                        index={i}
                        activeIndex={activeIndex}
                      />
                    ))}

                  </div>
                </div>

                {sections.map((_, i) => (
                  <div
                    key={i}
                    ref={(el) => { sectionRefs.current[i] = el; }}
                    className="mt-20 first:mt-0"
                    style={{ height: "85vh" }}
                  />
                ))}

              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
