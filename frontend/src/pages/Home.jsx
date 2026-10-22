
import {
  FaArrowRight,
  FaGithub,
  FaLinkedinIn,
  FaDownload,
} from "react-icons/fa";
import "../styles/Home.css";

const Home = () => {
  return (
    <main>
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-eyebrow">
              <span className="status-dot" />
              OPEN TO JOBS &amp; INTERNSHIPS
            </p>

            <h1>
              Hi, I'm Pratham.
              <br />
              I build <span>web experiences.</span>
            </h1>

            <p className="hero-description">
              I'm a BCS graduate pursuing MCA, passionate about
              building modern, responsive web applications using
              React, Node.js, Express, and MongoDB.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                Explore My Work <FaArrowRight />
              </a>

              <a
                href="/resume.pdf"
                download="Pratham_Survase_Resume.pdf"
                className="btn btn-secondary"
              >
                Download Resume <FaDownload />
              </a>
            </div>

            <div className="hero-socials">
              <a
                href="https://github.com/Pratham-106"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                title="GitHub"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/pratham-survase"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                title="LinkedIn"
              >
                <FaLinkedinIn />
              </a>

              <span>Building. Learning. Improving.</span>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="visual-card">
              <div className="visual-dots">
                <span />
                <span />
                <span />
              </div>

              <p className="visual-label">CURRENTLY BUILDING</p>

              <h2>Ideas into reality.</h2>

              <p className="visual-text">
                Full-stack development · Problem solving · Continuous
                learning
              </p>

              <div className="tech-tags">
                <span>React</span>
                <span>Node.js</span>
                <span>Express</span>
                <span>MongoDB</span>
              </div>

              <div className="visual-line" />

              <div className="visual-footer">
                <span>PORTFOLIO / 2026</span>
                <span>01 — 04</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
