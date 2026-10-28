import { useEffect, useState } from "react";
import "./App.css";

const skills = [
  { name: "HTML", category: "Frontend" },
  { name: "CSS", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Java", category: "Backend" },
  { name: "Spring Boot", category: "Backend" },
  { name: "Git & GitHub", category: "Tools" },
];

const projects = [
  {
    number: "01",
    title: "Contract Management System",
    description:
      "A software project focused on managing contracts, parties, and related contract information.",
    technologies: ["Java", "Spring Boot"],
    category: "Backend",
    github: "",
  },
  {
    number: "02",
    title: "MU-CLRIS",
    description:
      "A university information and resource-sharing system designed to support access to academic resources.",
    technologies: ["Django", "JavaScript"],
    category: "Full Stack",
    github: "",
  },
  {
    number: "03",
    title: "Personal Portfolio",
    description:
      "An interactive portfolio built to present my background, technical skills, and development projects.",
    technologies: ["React", "CSS", "JavaScript"],
    category: "Frontend",
    github: "",
  },
];

const roles = [
  "Software Developer",
  "IT Engineer",
  "Java Developer",
  "Web Developer",
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [activeFilter, setActiveFilter] = useState("All");
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [showTopButton, setShowTopButton] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Typing animation
  useEffect(() => {
    const role = roles[roleIndex];
    let index = 0;

    setDisplayedRole("");

    const interval = setInterval(() => {
      index += 1;
      setDisplayedRole(role.slice(0, index));

      if (index >= role.length) {
        clearInterval(interval);

        setTimeout(() => {
          setRoleIndex((current) => (current + 1) % roles.length);
        }, 1800);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [roleIndex]);

  // Scroll effects and back-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      observer.observe(element);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // Theme toggle
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const closeMenu = () => setMenuOpen(false);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const handleFormChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  // Opens the visitor's email application.
 
const handleSubmit = (event) => {
  event.preventDefault();

  const recipient = "lwamtesfaygss2@gmail.com";

  const subject = encodeURIComponent(
    `Portfolio message from ${form.name}`
  );

  const body = encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
  );

  window.location.href =
    `mailto:${recipient}?subject=${subject}&body=${body}`;
};

  return (
    <>
      {/* NAVIGATION */}
      <header className="navbar">
        <a className="logo" href="#home" onClick={closeMenu}>
          <span className="logo-symbol">&lt;</span>
          Lwam<span className="gradient-text">.dev</span>
          <span className="logo-symbol">/&gt;</span>
        </a>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={() =>
              setTheme((current) =>
                current === "dark" ? "light" : "dark"
              )
            }
            aria-label={`Switch to ${
              theme === "dark" ? "light" : "dark"
            } theme`}
            title="Change theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {["Home", "About", "Skills", "Projects", "Education", "Contact"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={closeMenu}
              >
                {item}
              </a>
            )
          )}

          <a href="resume.pdf" className="nav-resume" download>
            Download CV ↓
          </a>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="hero section-container" id="home">
          <div className="hero-content reveal">
            <p className="eyebrow">
              <span className="status-dot"></span>
              WELCOME TO MY PROFILE PORTFOLIO
            </p>

            <h1>
              Hi, I'm <span className="gradient-text">Lwam Tesfay.</span>
            </h1>

            <h2 className="hero-role">
              I'm a <span>{displayedRole}</span>
              <span className="typing-cursor">|</span>
            </h2>

            <p className="hero-description">
              I'm an IT Engineering graduate passionate about software
              development and building practical digital solutions. I enjoy
              solving problems, exploring new technologies, and transforming
              ideas into useful applications.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="button button-primary">
                Explore My Work
              </a>

              <a href="/Resume.pdf" className="button button-secondary" download>
                Download CV ↓
              </a>
            </div>

            <div className="hero-social">
              <span>JAVA</span>
              <span>JAVASCRIPT</span>
              <span>WEB DEVELOPMENT</span>
            </div>

            <div className="social-links">
                 {/*profile links */}
              <a
                href="https://github.com/lwam24"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                title="GitHub profile URL"
              >
                GitHub 
              </a>

              <a
                href="https://www.linkedin.com/in/lwam-tesfay-054542316/"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="Visit my LinkedIn profile"
               title="Visit my LinkedIn profile"
              >
                LinkedIn 
              </a>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="photo-glow"></div>

            <div className="photo-frame">
              <img
                src="/profile.png"
                alt="Portrait of Lwam Tesfay"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className="photo-placeholder">
                <span className="placeholder-icon">✳</span>
                <p>Your Photo Goes Here</p>
                <small>Add your picture </small>
              </div>
            </div>

            <div className="floating-card card-top">
              <span className="floating-icon">✦</span>
              <div>
                <strong>Always Learning</strong>
                <small>Growing every day</small>
              </div>
            </div>

            <div className="floating-card card-bottom">
              <span className="floating-icon">&lt;/&gt;</span>
              <div>
                <strong>Developer</strong>
                <small>Building new ideas</small>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section-container section reveal" id="about">
          <p className="section-label">GET TO KNOW ME</p>

          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>

          <div className="about-card">
            <p>
              I'm an IT Engineering graduate from Mekelle Institute of
              Technology with an interest in software development and building
              practical technology solutions. I enjoy learning new tools,
              solving technical challenges, and improving my skills through
              hands-on projects.
            </p>

            <p>
              My goal is to continue growing as a developer and contribute to
              projects that solve real-world problems.
            </p>

            <a href="#contact" className="text-link">
              Let's connect <span>↗</span>
            </a>
          </div>
        </section>

        {/* SKILLS */}
        <section className="section-container section reveal" id="skills">
          <p className="section-label">WHAT I WORK WITH</p>

          <h2 className="section-title">
            My <span className="gradient-text">Skills</span>
          </h2>

          <p className="section-description">
            Technologies I've worked with through my studies and projects.
          </p>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <article className="skill-card" key={skill.name}>
                <span className="skill-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3>{skill.name}</h3>
                  <span className="skill-category">{skill.category}</span>
                </div>

                <span className="skill-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section-container section reveal" id="projects">
          <p className="section-label">SOME THINGS I'VE WORKED ON</p>

          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>

          <p className="section-description">
            A selection of projects reflecting my learning and development.
          </p>

          <div className="project-filters" aria-label="Filter projects">
            {["All", "Frontend", "Backend", "Full Stack"].map((filter) => (
              <button
                key={filter}
                className={
                  activeFilter === filter
                    ? "filter-button active"
                    : "filter-button"
                }
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className="project-top">
                  <span className="project-number">{project.number}</span>
                  <span className="project-symbol">↗</span>
                </div>

                <span className="project-category">{project.category}</span>

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="project-technologies">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>

                {project.github ? (
                  <a
                    href={project.github}
                    className="project-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on GitHub 
                  </a>
                ) : (
                  <span className="project-link project-link-disabled">
                    GitHub link coming soon
                  </span>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="section-container section reveal" id="education">
          <p className="section-label">MY BACKGROUND</p>

          <h2 className="section-title">
            My <span className="gradient-text">Education</span>
          </h2>

          <div className="education-card">
            <div className="education-icon">✦</div>

            <div>
              <p className="education-date">2026</p>

              <h3>Bachelor's Degree in IT Engineering</h3>

              <p>Mekelle Institute of Technology</p>

              <p className="education-description">
                Studied information technology, that includes programming, and software
                development.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section-container section reveal" id="contact">
          <div className="contact-layout">
            <div className="contact-intro">
              <p className="section-label">LET'S CONNECT</p>

              <h2 className="section-title">
                Let's build something{" "}
                <span className="gradient-text">meaningful.</span>
              </h2>

              <p className="section-description">
                Have an opportunity, a project idea, or just want to connect?
                Send me a message.
              </p>

              <div className="contact-note">
                <span>✉</span>
                <p>
                  Fill in the form to prepare a message in your email
                  application.
                </p>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="contact-name">Your name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleFormChange}
                required
              />

              <label htmlFor="contact-email">Your email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleFormChange}
                required
              />

              <label htmlFor="contact-message">Your message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell me about your message..."
                rows="5"
                value={form.message}
                onChange={handleFormChange}
                required
              />

              <button type="submit" className="button button-primary">
                Submit Message 
              </button>

              <small className="form-note">
                This form opens your email application. It does not send
                messages directly from the website.
              </small>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <a href="#home" className="logo">
          <span className="logo-symbol">&lt;</span>
          Lwam<span className="gradient-text">.dev</span>
          <span className="logo-symbol">/&gt;</span>
        </a>

        <p>© {new Date().getFullYear()} Lwam Tesfay. Built with React.</p>

        <a href="#home" className="back-to-top">
          Back to top ↑
        </a>
      </footer>

      {showTopButton && (
        <button
          className="scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          title="Back to top"
        >
          ↑
        </button>
      )}
    </>
  );
}

export default App;
