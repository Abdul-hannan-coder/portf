"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import portfolioData from "../../data/portfolio.json";

// Material Icons Outlined styles
const materialIconsOutlined = {
  fontFamily: "Material Icons Outlined",
  fontFeatureSettings: "'liga'",
};

export default function ProjectsPage() {
  const { projects } = portfolioData;
  const [selectedPlatform, setSelectedPlatform] = useState("All Projects");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const filteredProjects = projects.items.filter((project) => {
    const platformMatch =
      selectedPlatform === "All Projects" || project.platform === selectedPlatform;
    return platformMatch;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className="material-icons-outlined text-yellow-400 text-base"
        style={materialIconsOutlined}
      >
        star
      </span>
    ));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-background-light dark:bg-background-dark min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 text-glow">
            {projects.title}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            {projects.subtitle}
          </p>
        </motion.div>

        <div className="flex justify-center border-b border-gray-800 mb-12">
          <div className="flex space-x-8">
            {projects.filters.platforms.map((platform) => (
              <motion.button
                key={platform}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPlatform(platform)}
                className={`py-3 font-semibold transition-colors ${
                  selectedPlatform === platform
                    ? "text-white border-b-2 border-primary"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {platform}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-6 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="font-semibold text-white w-28 text-sm uppercase tracking-wider">
              Category:
            </span>
            <div className="flex flex-wrap gap-2">
              {projects.filters.categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`font-semibold px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedCategory === category
                      ? "bg-emerald-400 text-gray-900"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="font-semibold text-white w-28 text-sm uppercase tracking-wider">
              Domain:
            </span>
            <div className="flex flex-wrap gap-2">
              {projects.filters.domains.map((domain) => (
                <motion.button
                  key={domain}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDomain(domain)}
                  className={`font-semibold px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedDomain === domain
                      ? "bg-emerald-400 text-gray-900"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {domain}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <Link
              key={index}
              href={`/projects/${project.slug || project.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                }}
                className="bg-[#141419] p-6 rounded-2xl border border-gray-800 flex flex-col space-y-4 transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer"
              >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="bg-green-500 text-black text-xs font-bold px-2 py-1 rounded">
                    {project.platform}
                  </span>
                  {project.featured && (
                    <span className="bg-orange-400 text-black text-xs font-bold px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  {renderStars(project.rating)}
                  <span className="text-white font-semibold text-sm">
                    {project.rating}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white hover:text-primary transition-colors">
                {project.title}
              </h3>

              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1.5">
                  <span
                    className="material-icons-outlined text-base text-emerald-400"
                    style={materialIconsOutlined}
                  >
                    category
                  </span>
                  <span>{project.category}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span
                    className="material-icons-outlined text-base text-emerald-400"
                    style={materialIconsOutlined}
                  >
                    calendar_today
                  </span>
                  <span>{project.date}</span>
                </div>
              </div>

              {project.client.feedback ? (
                <div className="bg-emerald-900/40 border border-emerald-400/20 p-4 rounded-lg text-sm text-gray-300 italic relative">
                  <div className="absolute -top-3 left-4 bg-[#141419] px-2 flex items-center gap-2">
                    <span
                      className="material-icons-outlined text-emerald-400 text-lg"
                      style={materialIconsOutlined}
                    >
                      person
                    </span>
                    <span className="text-emerald-400 font-medium">
                      {project.client.name}
                    </span>
                  </div>
                  <p>&quot;{project.client.feedback}&quot;</p>
                </div>
              ) : project.client.description ? (
                <div className="border border-gray-700 p-4 rounded-lg text-sm text-gray-300 flex-grow">
                  <ul className="space-y-2 list-disc list-inside">
                    {project.client.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  <div className="text-center mt-3">
                    <a
                      className="text-emerald-400 font-medium hover:text-emerald-300"
                      href="#"
                    >
                      View More
                    </a>
                  </div>
                </div>
              ) : null}

              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag, tagIndex) => (
                  <motion.span
                    key={tagIndex}
                    whileHover={{ scale: 1.1 }}
                    className="bg-blue-600/50 text-blue-300 text-xs font-medium px-2.5 py-1 rounded"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            </Link>
          ))}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

