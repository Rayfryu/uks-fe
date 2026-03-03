import { useState, useEffect } from "react";

const navLinks = ["Courses", "Events", "Testimonials", "Articles", "FAQ"];
const leftLinks = ["About", "Contact"];

// Arrow: curves down then turns right (corner-down-right)
const LoginIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2 flex-shrink-0"
    aria-hidden="true"
  >
    <polyline points="15 10 20 15 15 20" />
    <path d="M4 4v7a4 4 0 0 0 4 4h12" />
  </svg>
);

const HamburgerIcon = ({ open }: { open: boolean }) => (
  <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5 relative">
    <span
      className="block h-0.5 w-6 bg-white transition-all duration-300 ease-in-out origin-center"
      style={{
        transform: open ? "translateY(8px) rotate(45deg)" : "none",
      }}
    />
    <span
      className="block h-0.5 w-6 bg-white transition-all duration-300 ease-in-out"
      style={{ opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "none" }}
    />
    <span
      className="block h-0.5 w-6 bg-white transition-all duration-300 ease-in-out origin-center"
      style={{
        transform: open ? "translateY(-8px) rotate(-45deg)" : "none",
      }}
    />
  </div>
);

export default function IOHNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500&display=swap');

        .logo-font { font-family: 'Cormorant Garamond', Georgia, serif; }
        .nav-font  { font-family: 'DM Sans', sans-serif; }

        .nav-link { transition: opacity 0.3s ease; }
        .nav-link:hover { opacity: 0.7; }

        .login-btn {
          background: rgba(255,255,255,0.15);
          transition: background 0.3s ease;
        }
        .login-btn:hover { background: rgba(255,255,255,0.28); }

        .mobile-overlay { transition: opacity 0.3s ease; }
        .mobile-menu    { transition: transform 0.3s ease; }
      `}</style>

      <nav
        aria-label="Main navigation"
        className="absolute top-0 left-0 w-full z-50"
        style={{ height: "80px" }}
      >
        <div
          className="mx-auto h-full"
          style={{
            maxWidth: "1200px",
            paddingLeft: "40px",
            paddingRight: "40px",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
          }}
        >
          {/* ── LEFT: IOH Logo ── */}
          <div className="hidden md:flex items-center">
            <a
              href="/"
              className="logo-font text-white font-semibold select-none nav-link"
              style={{ fontSize: "34px", letterSpacing: "0.05em" }}
              aria-label="UKS Home"
            >
              UKS
            </a>
          </div>

          {/* ── CENTER: Courses · Events · Testimonials · Articles · FAQ ── */}
          <ul
            className="hidden md:flex items-center list-none m-0 p-0"
            style={{ gap: "32px" }}
            role="list"
          >
            {navLinks.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="nav-link nav-font text-white"
                  style={{ fontWeight: 400, fontSize: "15px" }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* ── RIGHT: About · Contact · Student Login ── */}
          <div className="hidden md:flex items-center ps-30 " style={{ gap: "28px" }}>
            {leftLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link nav-font text-white"
                style={{ fontWeight: 400, fontSize: "15px" }}
              >
                {item}
              </a>
            ))}
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="login-btn nav-font text-white flex items-center rounded-lg"
              style={{
                padding: "10px 18px",
                fontSize: "15px",
                fontWeight: 500,
                textDecoration: "none",
              }}
              aria-label="Student Login"
            >
              <LoginIcon />
              Student Login
            </a>
          </div>

          {/* ── MOBILE: Logo left ── */}
          <a
            href="/"
            className="md:hidden logo-font text-white font-semibold select-none"
            style={{ fontSize: "28px", letterSpacing: "0.04em" }}
            aria-label="UKS Home"
          >
            UKS
          </a>

          {/* spacer middle col on mobile */}
          <span className="md:hidden" />

          {/* ── MOBILE: Hamburger right ── */}
          <div className="md:hidden flex justify-end">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      {mounted && (
        <>
          <div
            className="mobile-overlay fixed inset-0 z-40 md:hidden"
            style={{
              background: "rgba(0,0,0,0.45)",
              opacity: menuOpen ? 1 : 0,
              pointerEvents: menuOpen ? "auto" : "none",
            }}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />

          <div
            id="mobile-menu"
            className="mobile-menu fixed top-0 right-0 h-full z-50 md:hidden flex flex-col"
            style={{
              width: "280px",
              background: "rgba(10,10,10,0.97)",
              transform: menuOpen ? "translateX(0)" : "translateX(100%)",
              paddingTop: "96px",
              paddingLeft: "32px",
              paddingRight: "32px",
            }}
            aria-hidden={!menuOpen}
            role="dialog"
            aria-label="Mobile navigation"
          >
            <ul className="list-none m-0 p-0 flex flex-col" style={{ gap: "4px" }}>
              {navLinks.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="nav-font nav-link text-white block py-3"
                    style={{
                      fontSize: "17px",
                      fontWeight: 400,
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
              {leftLinks.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="nav-font nav-link text-white block py-3"
                    style={{
                      fontSize: "17px",
                      fontWeight: 400,
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="login-btn nav-font text-white flex items-center justify-center rounded-lg mt-6"
              style={{
                padding: "12px 18px",
                fontSize: "15px",
                fontWeight: 500,
                textDecoration: "none",
              }}
              aria-label="Student Login"
              onClick={() => setMenuOpen(false)}
            >
              <LoginIcon />
              Student Login
            </a>
          </div>
        </>
      )}
    </>
  );
}
