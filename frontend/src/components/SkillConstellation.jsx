
import { useState } from "react";
import "../styles/SkillConstellation.css";

const skills = [
  {
    id: "react",
    name: "React",
    group: "Frontend",
    x: 30,
    y: 22,
    description:
      "Building component-based interfaces with reusable UI, hooks, and state management.",
    projects: ["ArenaHub", "Desi Saaj", "Portfolio"],
    technologies: ["Vite", "React Router", "Axios"],
    featured: true,
  },
  {
    id: "javascript",
    name: "JavaScript",
    group: "Frontend",
    x: 50,
    y: 12,
    description:
      "The core language I use to build interactive frontend experiences and application logic.",
    projects: ["ArenaHub", "Desi Saaj", "Portfolio"],
    technologies: ["ES6+", "Async/Await", "Array Methods"],
    featured: true,
  },
  {
    id: "css",
    name: "HTML & CSS",
    group: "Frontend",
    x: 12,
    y: 45,
    description:
      "Creating responsive layouts, accessible interfaces, and custom styling without relying on a CSS framework.",
    projects: ["ArenaHub", "Desi Saaj", "Portfolio"],
    technologies: ["Responsive Design", "Flexbox", "CSS Grid"],
    featured: false,
  },
  {
    id: "node",
    name: "Node.js",
    group: "Backend",
    x: 72,
    y: 29,
    description:
      "Using JavaScript on the server to build application logic and backend services.",
    projects: ["ArenaHub", "Desi Saaj"],
    technologies: ["Express.js", "REST APIs"],
    featured: true,
  },
  {
    id: "express",
    name: "Express",
    group: "Backend",
    x: 85,
    y: 52,
    description:
      "Building API routes, request handling, middleware, and server-side functionality.",
    projects: ["ArenaHub", "Desi Saaj"],
    technologies: ["Routing", "Middleware", "REST APIs"],
    featured: false,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    group: "Database",
    x: 64,
    y: 70,
    description:
      "Working with document-based data storage for full-stack applications.",
    projects: ["ArenaHub", "Desi Saaj"],
    technologies: ["MongoDB Atlas", "Mongoose"],
    featured: true,
  },
  {
    id: "git",
    name: "Git & GitHub",
    group: "Tools",
    x: 34,
    y: 78,
    description:
      "Managing source code, tracking changes, and maintaining project repositories.",
    projects: ["ArenaHub", "Portfolio"],
    technologies: ["Git", "GitHub"],
    featured: false,
  },
  {
    id: "api",
    name: "REST APIs",
    group: "Backend",
    x: 46,
    y: 46,
    description:
      "Connecting frontend interfaces to backend endpoints and handling application data.",
    projects: ["ArenaHub", "Desi Saaj"],
    technologies: ["HTTP", "JSON", "Axios"],
    featured: false,
  },
];

const connections = [
  ["react", "javascript"],
  ["react", "css"],
  ["javascript", "node"],
  ["node", "express"],
  ["express", "api"],
  ["api", "mongodb"],
  ["mongodb", "git"],
  ["react", "api"],
  ["javascript", "api"],
  ["node", "mongodb"],
  ["css", "git"],
];

const SkillConstellation = () => {
  const [selectedId, setSelectedId] = useState("react");
  const [filter, setFilter] = useState("All");

  const selectedSkill =
    skills.find((skill) => skill.id === selectedId) ?? skills[0];

  const visibleSkills =
    filter === "All"
      ? skills
      : skills.filter((skill) => skill.group === filter);

  const visibleIds = new Set(visibleSkills.map((skill) => skill.id));

  const visibleConnections = connections.filter(
    ([from, to]) => visibleIds.has(from) && visibleIds.has(to)
  );

  const handleFilterChange = (nextFilter) => {
    setFilter(nextFilter);

    if (nextFilter !== "All") {
      const firstMatch = skills.find(
        (skill) => skill.group === nextFilter
      );
      if (firstMatch) setSelectedId(firstMatch.id);
    }
  };

  return (
    <div className="skill-constellation">
      <div className="constellation-heading">
        <div>
          <span className="constellation-eyebrow">Explore my stack</span>
          <h3>Skills, connected.</h3>
          <p>
            Select a node to explore a technology and see where I use it.
          </p>
        </div>

        <span className="constellation-count">
          {skills.length} technologies
        </span>
      </div>

      <div className="constellation-filters" aria-label="Filter skills">
        {["All", "Frontend", "Backend", "Database", "Tools"].map(
          (group) => (
            <button
              key={group}
              type="button"
              className={`constellation-filter ${
                filter === group ? "is-active" : ""
              }`}
              aria-pressed={filter === group}
              onClick={() => handleFilterChange(group)}
            >
              {group}
            </button>
          )
        )}
      </div>

      <div className="constellation-layout">
        <div
          className="constellation-canvas"
          role="group"
          aria-label="Interactive technology constellation"
        >
          <svg
            className="constellation-lines"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {visibleConnections.map(([from, to]) => {
              const start = skills.find((skill) => skill.id === from);
              const end = skills.find((skill) => skill.id === to);

              return (
               
<line
  key={`${from}-${to}`}
  x1={start.x * 10}
  y1={start.y * 6}
  x2={end.x * 10}
  y2={end.y * 6}
  className={
    from === selectedId || to === selectedId
      ? "constellation-line is-connected"
      : "constellation-line"
  }
/>

              );
            })}
          </svg>

          {visibleSkills.map((skill) => {
            const isSelected = selectedId === skill.id;
            const isConnected = connections.some(
              ([from, to]) =>
                (from === selectedId && to === skill.id) ||
                (to === selectedId && from === skill.id)
            );

            return (
              <button
                key={skill.id}
                type="button"
                className={[
                  "constellation-node",
                  skill.featured ? "is-featured" : "",
                  isSelected ? "is-selected" : "",
                  isConnected ? "is-connected" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  "--node-x": `${skill.x}%`,
                  "--node-y": `${skill.y}%`,
                }}
                aria-pressed={isSelected}
                onClick={() => setSelectedId(skill.id)}
              >
                <span className="constellation-node-dot" />
                <span>{skill.name}</span>
              </button>
            );
          })}

          <span className="constellation-hint">
            <span aria-hidden="true">✦</span> Click a node to explore
          </span>
        </div>

        <aside className="constellation-detail" aria-live="polite">
          <span className="constellation-detail-label">
            {selectedSkill.group}
          </span>

          <h4>{selectedSkill.name}</h4>
          <p>{selectedSkill.description}</p>

          <div className="constellation-detail-group">
            <span className="constellation-detail-heading">
              Related technologies
            </span>

            <div className="constellation-tags">
              {selectedSkill.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>

          <div className="constellation-detail-group">
            <span className="constellation-detail-heading">
              Used in
            </span>

            <div className="constellation-tags">
              {selectedSkill.projects.map((project) => (
                <span key={project}>{project}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <p className="constellation-note">
        A map of technologies I've worked with and how they fit into my
        projects—not a proficiency ranking.
      </p>
    </div>
  );
};

export default SkillConstellation;
