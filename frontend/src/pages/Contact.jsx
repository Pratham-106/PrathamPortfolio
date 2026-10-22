
import { useState } from "react";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaPaperPlane,
  FaBriefcase,
} from "react-icons/fa";
import axios from "axios";
import "../styles/Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    message: "",
    error: false,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      loading: true,
      message: "",
      error: false,
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/contact`,
        form
      );

      setStatus({
        loading: false,
        message: response.data.message || "Message sent successfully!",
        error: false,
      });

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        loading: false,
        message:
          error.response?.data?.message ||
          "Unable to send your message. Please try again.",
        error: true,
      });
    }
  };

  return (
    <section className="contact section-container" id="contact">
      <div className="section-heading">
        <p className="section-eyebrow">GET IN TOUCH</p>

        <h2>
          Let's work <span>together.</span>
        </h2>

        <p className="section-subtitle">
          Looking for a developer or want to discuss an opportunity?
          I'd love to hear from you.
        </p>
      </div>

      <div className="contact-layout">
        {/* Contact information */}
        <div className="contact-info">
          <h3>Have a project or opportunity?</h3>

          <p>
            Feel free to send me a message about jobs, internships,
            collaborations, or development projects.
          </p>

          {/* Email */}
          <a
            className="contact-method"
            href="mailto:prathamsurvase04@gmail.com"
          >
            <span className="contact-method-icon">
              <FaEnvelope />
            </span>

            <span>
              <small>Email me</small>
              <strong>prathamsurvase04@gmail.com</strong>
            </span>
          </a>

          {/* Social and job profiles */}
          <div className="contact-socials">
            <a
              href="https://github.com/Pratham-106"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/pratham-survase"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://profile.indeed.com/?hl=en_IN&co=IN&from=gnav-homepage"
              target="_blank"
              rel="noreferrer"
              aria-label="Indeed"
              title="Indeed"
            >
              <FaBriefcase />
            </a>

            <a
              href="https://www.naukri.com/mnjuser/profile?id=&altresid"
              target="_blank"
              rel="noreferrer"
              aria-label="Naukri"
              title="Naukri"
            >
              <FaBriefcase />
            </a>

            <a
              href="YOUR_APNAJOBS_PROFILE_URL"
              target="_blank"
              rel="noreferrer"
              aria-label="ApnaJobs"
              title="ApnaJobs"
            >
              <FaBriefcase />
            </a>
          </div>
        </div>

        {/* Contact form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Your name

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Pratham Survase"
                minLength={2}
                maxLength={80}
                autoComplete="name"
                required
              />
            </label>

            <label>
              Email address

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                maxLength={254}
                autoComplete="email"
                required
              />
            </label>
          </div>

          <label>
            Subject

            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Job opportunity / Collaboration"
              minLength={3}
              maxLength={150}
              required
            />
          </label>

          <label>
            Message

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me a little about your message..."
              rows={5}
              minLength={10}
              maxLength={5000}
              required
            />
          </label>

          {status.message && (
            <p
              className={`form-status ${
                status.error ? "error" : "success"
              }`}
              role="status"
            >
              {status.message}
            </p>
          )}

          <button
            className="btn btn-primary contact-submit"
            type="submit"
            disabled={status.loading}
          >
            {status.loading ? "Sending..." : "Send Message"}

            {!status.loading && <FaPaperPlane />}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
