
import { FaGraduationCap, FaCode, FaLaptopCode } from "react-icons/fa";
import "../styles/About.css";

const highlights = [
  {
    icon: <FaGraduationCap />,
    title: "Education",
    description: "BCS graduate, currently pursuing MCA.",
  },
  {
    icon: <FaCode />,
    title: "MERN Stack Training",
    description: "Completed MERN Stack Developer training at Speedup Infotech.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Hands-on Projects",
    description: "Building full-stack applications, from UI to backend APIs.",
  },
];

const About = () => {
  return (
    <section className="about section-container" id="about">
      <div className="section-heading">
        <p className="section-eyebrow">GET TO KNOW ME</p>
        <h2>About <span>Me</span></h2>
        <p className="section-subtitle">
          A little about my background, interests, and what I bring to the table.
        </p>
      </div>

      <div className="about-layout">
        <div className="about-copy">
          <h3>Turning ideas into working applications.</h3>

          <p>
            I'm a BCS graduate currently pursuing my Master of Computer
            Applications (MCA), with a strong interest in web development
            and building useful digital products.
          </p>

          <p>
            My focus is on the MERN stack — React, Node.js, Express, and
            MongoDB. Through personal projects, I've been learning how
            frontend interfaces, backend APIs, authentication, and
            databases work together.
          </p>

          <p>
            I'm looking for an opportunity to contribute to a development
            team, strengthen my technical skills, and grow as a software
            developer.
          </p>

          <a className="about-link" href="#projects">
            Explore my projects <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="about-highlights">
          {highlights.map((item) => (
            <article className="highlight-card" key={item.title}>
              <div className="highlight-icon">{item.icon}</div>

              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
