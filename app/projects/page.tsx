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
                className="bg-[#141419] p-6 lg:p-8 rounded-2xl border border-gray-800/50 flex flex-col h-full transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer group"
              >
                {/* Header Section */}
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-green-500 text-black text-xs font-bold px-3 py-1.5 rounded-full">
                      {project.platform}
                    </span>
                    {project.featured && (
                      <span className="bg-orange-400 text-black text-xs font-bold px-3 py-1.5 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 bg-gray-800/60 px-2.5 py-1.5 rounded-lg">
                    {renderStars(project.rating)}
                    <span className="text-white font-semibold text-sm ml-1">
                      {project.rating}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                  {project.title}
                </h3>

                {/* Meta Information */}
                <div className="flex flex-col gap-2.5 mb-5 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <span
                      className="material-icons-outlined text-emerald-400 text-base"
                      style={materialIconsOutlined}
                    >
                      category
                    </span>
                    <span className="font-medium">{project.category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className="material-icons-outlined text-emerald-400 text-base"
                      style={materialIconsOutlined}
                    >
                      calendar_today
                    </span>
                    <span className="text-xs">{project.date}</span>
                  </div>
                </div>

                {/* Client Feedback or Description */}
                <div className="mb-5 flex-grow">
                  {project.client?.feedback ? (
                    <div className="bg-emerald-900/20 border border-emerald-400/20 p-4 rounded-lg text-sm text-gray-300 relative">
                      <div className="absolute -top-2.5 left-4 bg-[#141419] px-2 flex items-center gap-1.5 rounded-full border border-emerald-400/20">
                        <span
                          className="material-icons-outlined text-emerald-400 text-sm"
                          style={materialIconsOutlined}
                        >
                          person
                        </span>
                        <span className="text-emerald-400 font-medium text-xs">
                          {project.client.name}
                        </span>
                      </div>
                      <p className="pt-3 italic line-clamp-3 text-xs leading-relaxed">
                        &quot;{project.client.feedback}&quot;
                      </p>
                    </div>
                  ) : project.client?.description ? (
                    <div className="border border-gray-700/30 bg-gray-800/10 p-4 rounded-lg text-sm text-gray-300">
                      <ul className="space-y-1.5 list-disc list-inside">
                        {project.client.description.slice(0, 2).map((item, idx) => (
                          <li key={idx} className="text-xs leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                {/* Tags Section - Better positioned at bottom */}
                <div className="mt-auto pt-5 border-t border-gray-800/30">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 4).map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-blue-600/20 text-blue-300 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-500/20 hover:bg-blue-600/30 hover:border-blue-400/40 transition-all cursor-default"
                      >
                        {tag}
                      </motion.span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="bg-gray-700/30 text-gray-400 text-xs font-medium px-3 py-1.5 rounded-full">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
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

