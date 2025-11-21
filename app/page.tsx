import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <Header />
      <main>
        <Hero />
        <About />
        <Timeline />
      </main>
      <Footer />
    </div>
  );
}
