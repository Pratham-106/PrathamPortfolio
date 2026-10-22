
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <a href="#home" className="footer-logo">
          Pratham<span>.</span>
        </a>

        <p>Building. Learning. Improving.</p>

        <div className="footer-socials">
          <a
            href="https://github.com/Pratham-106"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/pratham-survase"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Pratham. All rights reserved.</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
