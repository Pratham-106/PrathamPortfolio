
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

          {/* Left Side - Introduction */}
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

            {/* Social Links */}
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

          {/* Right Side - Profile Photo */}
          <div className="hero-visual">

            <div className="hero-photo-frame">

              <img
                src="/pratham-photo.png"
                alt="Pratham Survase - MERN Stack Developer"
                className="hero-photo"
              />

              <div className="photo-caption">
                <span className="status-dot" />
                MERN STACK DEVELOPER
              </div>

            </div>

          </div>

        </div>
      </section>
    </main>
  );
};

export default Home;
