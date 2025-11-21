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


  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-background-light dark:bg-background-dark min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 text-glow">
            {projects.title}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            {projects.subtitle}
          </p>
        </motion.div>

        <div className="flex justify-center border-b border-gray-800 mb-12 max-w-7xl mx-auto">
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

        <div className="space-y-6 mb-12 max-w-7xl mx-auto">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto"
        >
          {filteredProjects.map((project, index) => (
            <Link
              key={index}
              href={`/projects/${project.slug || project.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="block h-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                }}
                className="bg-[#191920] p-6 rounded-2xl border border-gray-800 flex flex-col space-y-5 h-full transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer group"
              >
                {/* Header Section */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/30">
                      {project.platform}
                    </span>
                    {project.featured && (
                      <span className="bg-yellow-500/10 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/30">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 shrink-0">
                    <span className="material-symbols-outlined text-yellow-400 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="text-white font-semibold text-sm">
                      {project.rating}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white leading-tight group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                {/* Description and Meta Information */}
                <div className="space-y-3 text-sm text-gray-400 flex-grow">
                  {project.description ? (
                    <p>{project.description}</p>
                  ) : project.client?.feedback ? (
                    <p className="italic line-clamp-2">&quot;{project.client.feedback}&quot;</p>
                  ) : (
                    <p className="text-gray-500">No description available.</p>
                  )}
                  
                  <div className="border-t border-gray-800 pt-3 flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="material-icons-outlined text-base text-gray-500">
                        calendar_today
                      </span>
                      <span>{project.date}</span>
                    </div>
                    {project.client?.name && (
                      <div className="flex items-center space-x-2">
                        <span className="material-icons-outlined text-base text-gray-500">
                          person
                        </span>
                        <span>{project.client.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags Section */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-primary/10 text-primary/80 text-xs font-medium px-3 py-1.5 rounded-full border border-primary/20 hover:bg-primary/20 transition-all cursor-default"
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

