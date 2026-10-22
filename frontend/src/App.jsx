
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import GameCompanion from "./components/GameCompanion";
import CursorSpotlight from "./components/CurserSpotlight";

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("portfolio-theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

 return (
  <>
    <CursorSpotlight />

    <Navbar theme={theme} onToggleTheme={toggleTheme} />
    <Home />
    <About />
    <Skills />
    <Projects />
    <Contact />
    <Footer />
    <GameCompanion />
  </>
);
}

export default App;
