
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGitAlt,
  FaServer,
  FaDatabase,
  FaTools,
} from "react-icons/fa";
import {
  SiExpress,
  SiMongodb,
  SiVite,
  SiPostman,
} from "react-icons/si";
import "../styles/Skills.css";
import SkillConstellation from "../components/SkillConstellation";

const skillGroups = [
  {
    title: "Frontend",
    icon: <FaReact />,
    skills: [
      { name: "HTML5", icon: <FaHtml5 /> },
      { name: "CSS3", icon: <FaCss3Alt /> },
      { name: "JavaScript", icon: <FaJs /> },
      { name: "React", icon: <FaReact /> },
      { name: "Vite", icon: <SiVite /> },
    ],
  },
  {
    title: "Backend",
    icon: <FaServer />,
    skills: [
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "REST APIs", icon: <FaServer /> },
    ],
  },
  {
    title: "Database",
    icon: <FaDatabase />,
    skills: [
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "Mongoose", icon: <FaDatabase /> },
    ],
  },
  {
    title: "Tools & Workflow",
    icon: <FaTools />,
    skills: [
      { name: "Git", icon: <FaGitAlt /> },
      { name: "GitHub", icon: <FaGitAlt /> },
      { name: "Postman", icon: <SiPostman /> },
    ],
  },
];

const Skills = () => {
  return (
    <section className="skills section-container" id="skills">
      <div className="section-heading">
        <p className="section-eyebrow">MY TECH STACK</p>
        <h2>Skills & <span>Technologies</span></h2>
        <p className="section-subtitle">
          The technologies I use to build, test, and develop web applications.
        </p>
      </div>

      <div className="skills-grid">
        {skillGroups.map((group) => (
          <article className="skill-card" key={group.title}>
            <div className="skill-card-heading">
              <span className="skill-group-icon">{group.icon}</span>
              <h3>{group.title}</h3>
            </div>

            <div className="skill-list">
              {group.skills.map((skill) => (
                <div className="skill-item" key={skill.name}>
                  <span className="skill-icon">{skill.icon}</span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
      <section className="skills" id="skills">
  <div className="section-container">
    {/* Keep your existing section heading */}

    <div className="skills-grid">
      {/* Keep all your existing skill cards */}
    </div>

    <SkillConstellation />
  </div>
</section>
    </section>
  );
};

export default Skills;
