import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Experience from "./components/Experience";
import Leadership from "./components/Leadership";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-[#1C1C1C] antialiased font-sans selection:bg-[#CFAE70]/30 selection:text-[#1C1C1C]">
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
        <TechStack />
        <Experience />
        <Leadership />
      </main>
      <Footer />
    </div>
  );
}
