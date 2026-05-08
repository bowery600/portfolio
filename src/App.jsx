import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Experience from "./components/Experience";
import Leadership from "./components/Leadership";
import Footer from "./components/Footer";
import SectionTransition from "./components/SectionTransition";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-[#1C1C1C] antialiased font-sans selection:bg-[#CFAE70]/30 selection:text-[#1C1C1C] dark:bg-[#0E0E10] dark:text-white dark:selection:bg-[#CFAE70]/40 dark:selection:text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[#1C1C1C] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-[#CFAE70]"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <SectionTransition
          from="blueprint"
          to="circuit"
          bgFrom="#FAFAFA"
          bgTo="#FFFFFF"
          bgFromDark="#121215"
          bgToDark="#0E0E10"
        />
        <TechStack />
        <SectionTransition
          from="circuit"
          to="market"
          bgFrom="#FFFFFF"
          bgTo="#FFFFFF"
          bgFromDark="#0E0E10"
          bgToDark="#0E0E10"
        />
        <Experience />
        <SectionTransition
          from="market"
          to="network"
          bgFrom="#FFFFFF"
          bgTo="#FAFAFA"
          bgFromDark="#0E0E10"
          bgToDark="#121215"
        />
        <Leadership />
        <SectionTransition
          from="network"
          to="contact"
          bgFrom="#FAFAFA"
          bgTo="#1C1C1C"
          bgFromDark="#121215"
          bgToDark="#1C1C1C"
        />
      </main>
      <Footer />
    </div>
  );
}
