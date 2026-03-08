import React from "react";

const Footer: React.FC = () => {
  const discoverLinks = [
    { label: "Program", href: "/" },
    { label: "Misi", href: "/" },
    { label: "Articles", href: "/" },
    { label: "Keunggulan", href: "/" },
    { label: "Tentang", href: "/" },
    { label: "Footer", href: "/" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/" },
    { label: "Cookie Policy", href: "/" },
    { label: "Terms & Conditions", href: "/" },
  ];

  const socialIcons = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/smknegeri46jakarta/",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@smkn4644",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative bg-[#1a1a1a] overflow-hidden">
      {/* Large background text - sized to always fit within footer width */}
      <div
        className="absolute bottom-8 left-0 right-0 pointer-events-none select-none px-2 pb-10"
        aria-hidden="true"
      >
        <p
          className="text-[#272727] font-bold text-center leading-none tracking-tight"
          style={{ fontSize: "clamp(28px, 6vw, 100px)" }}
        >
          Usaha Kesehatan Sekolah
        </p>
      </div>

      {/* Main footer content */}
      <div className="relative z-10 px-6 pt-12 pb-0 max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-white font-serif text-3xl font-bold tracking-tight">
              UKS
            </span>
          </div>

          {/* Center columns: Discover + Legals + Contact */}
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 md:gap-20">
            {/* Discover */}
            <div>
              <p className="text-[#888] text-xs uppercase tracking-widest mb-4 font-medium">
                Discover
              </p>
              <ul className="space-y-2">
                {discoverLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white text-sm font-semibold hover:text-gray-300 transition-opacity duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legals */}
            <div>
              <p className="text-[#888] text-xs uppercase tracking-widest mb-4 font-medium">
                Legals
              </p>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white text-sm font-semibold hover:text-gray-300 transition-opacity duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-[#888] text-xs uppercase tracking-widest mb-4 font-medium">
                Contact
              </p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="tel: (021) 8195127"
                    className="text-white text-sm font-semibold hover:text-gray-300 transition-opacity duration-200"
                  >
                    (021) 8195127
                  </a>
                </li>
                <li>
                  <a
                    href="mailto: smkn46jakarta@gmail.com"
                    className="text-white text-sm font-semibold hover:text-gray-300 transition-opacity duration-200"
                  >
                     smkn46jakarta@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex md:flex-col items-start gap-3">
            <div className="flex md:flex-col gap-2">
              {socialIcons.map((icon) => (
                <a
                  key={icon.name}
                  href={icon.href}
                  aria-label={icon.name}
                  className="w-8 h-8 rounded-full border border-[#444] flex items-center justify-center text-white hover:border-white hover:text-white transition-all duration-200"
                >
                  {icon.svg}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Spacer to push background text into view */}
        <div className="h-40 md:h-52" />
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-[#2e2e2e] px-6 py-4 max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-[#888] text-xs">
          2026 © SMKN 46 Jakarta. All rights reserved.
        </p>
        <a
          href="https://portofolio-website-ebon-three.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#888] text-xs hover:text-white hover:underline transition-all duration-200"
        >
          Website by Abdullah Rayhan Al Ayyubi
        </a>
      </div>
    </footer>
  );
};

export default Footer;
