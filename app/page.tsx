import Hero from "./components/Hero";
import About from "./components/About";
import Timeline from "./components/Timeline";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <Hero />
      <About />
      <Timeline />
    </div>
  );
}
