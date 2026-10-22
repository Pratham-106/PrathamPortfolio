
import {
  FaArrowRight,
  FaGithub,
  FaExternalLinkAlt,
  FaServer,
} from "react-icons/fa";

import ScrollReveal from "../components/ScrollReveal";
import "../styles/Projects.css";

const projects = [
  {
    number: "01",
    title: "ArenaHub",
    category: "Esports Platform",
    image: "/arenahub-preview.png",
    imageAlt:
      "ArenaHub esports dashboard showing tournaments, teams, matches, and wins",
    description:
      "A full-stack esports platform for gamers to register, build teams, and participate in tournament workflows.",
    features: [
      "User registration and login",
      "Team creation and team management",
      "Tournament-focused platform workflows",
    ],
    technologies: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    liveUrl: "https://arenahub109.vercel.app/",
    apiUrl: "https://arenahub109.onrender.com",
    githubUrl: "",
  },
  {
    number: "02",
    title: "Desi Saaj",
    category: "E-commerce",
    image: "/desi-saaj-preview.png",
    imageAlt:
      "Desi Saaj clothing storefront displaying product categories and products",
    description:
      "A full-stack e-commerce website for an Indian clothing brand, featuring product browsing, cart and order management, and online payment integration.",
    features: [
      "Product management and Cloudinary image uploads",
      "Shopping cart and order management",
      "Razorpay integration and cash on delivery",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Razorpay",
      "Cloudinary",
    ],
    liveUrl: "https://desi-saaj.vercel.app/",
    apiUrl: "",
    githubUrl: "",
  },
];

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <div className="section-container">
        <ScrollReveal>
          <div className="section-heading">
            <span className="section-eyebrow">
              Selected Work
            </span>

            <h2>Projects I've Built</h2>

            <p>
              A selection of full-stack applications that showcase
              my development skills and learning journey.
            </p>
          </div>
        </ScrollReveal>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.number}
              delay={index * 150}
            >
              <article className="project-card">
                {/* Project screenshot preview */}
                <div className="project-image">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    loading="lazy"
                  />

                  <span className="project-image-label">
                    Project Preview
                  </span>
                </div>

                {/* Project heading */}
                <div className="project-top">
                  <span className="project-number">
                    {project.number}
                  </span>

                  <span className="project-category">
                    {project.category}
                  </span>
                </div>

                <h3>{project.title}</h3>

                <p className="project-description">
                  {project.description}
                </p>

                {/* Features */}
                <ul className="project-features">
                  {project.features.map((feature) => (
                    <li
                      className="project-feature"
                      key={feature}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="project-tech">
                  {project.technologies.map((technology) => (
                    <span key={technology}>
                      {technology}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="project-links">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="project-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaExternalLinkAlt />
                      Live Demo
                    </a>
                  )}

                  {project.apiUrl && (
                    <a
                      href={project.apiUrl}
                      className="project-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaServer />
                      Backend
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      className="project-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaGithub />
                      Source Code
                    </a>
                  )}

                  {!project.liveUrl &&
                    !project.apiUrl &&
                    !project.githubUrl && (
                      <span className="project-links-pending">
                        Source links coming soon
                      </span>
                    )}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={100}>
          <div className="projects-more">
            <p>Interested in what I'm building?</p>

            <a href="#contact" className="project-link">
              Let's connect <FaArrowRight />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Projects;
