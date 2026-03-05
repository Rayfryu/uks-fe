import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="w-full bg-[#f0eeec] overflow-hidden">
      {/* Heading Area */}
      <div className="w-full px-6 pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20 flex items-center justify-center">
        <h1
          className="
            text-center
            font-semibold
            leading-tight
            tracking-tight
            text-[#3d3228]
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            xl:text-8xl
            max-w-5xl
          "
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Redefining healthcare education for a healthier world
        </h1>
      </div>

      {/* Hero Image Area */}
      <div className="w-full">
        <img
          src="/images/about.jpg"
          alt="Healthcare education team"
          className="w-full object-cover object-top"
          style={{ maxHeight: "80vh", minHeight: "400px" }}
        />
      </div>
    </section>
  );
};

export default HeroSection;