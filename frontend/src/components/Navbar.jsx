
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
  FaArrowRight,
} from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = ({ theme, onToggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="navbar">
      <div className="navbar-container">
        <a href="#home" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-bracket">{"<"}</span>
          Pratham<span className="logo-highlight">.</span>
          <span className="logo-bracket">{"/>"}</span>
        </a>

        <nav className={`navbar-links ${menuOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            className="navbar-cta"
            onClick={closeMenu}
          >
            Let's Talk <FaArrowRight />
          </a>

          <button
            type="button"
            className="theme-toggle"
            onClick={() => {
              onToggleTheme?.();
              closeMenu();
            }}
            aria-label={
              theme === "light"
                ? "Switch to dark theme"
                : "Switch to light theme"
            }
            title={theme === "light" ? "Dark mode" : "Light mode"}
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
            <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
          </button>
        </nav>

        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
