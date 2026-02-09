"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import portfolioData from "../../data/portfolio.json";

// Material Icons Outlined styles
const materialIconsOutlined = {
  fontFamily: "Material Icons Outlined",
  fontFeatureSettings: "'liga'",
};

export default function ProjectsPage() {
  const { projects } = portfolioData;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const categories = projects.filters.categories.filter(cat => cat !== "All Categories");

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredProjects = projects.items.filter((project) => {
    const searchMatch = searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const categoryMatch = selectedCategories.length === 0 ||
      selectedCategories.includes(project.category);
    
    return searchMatch && categoryMatch;
  });


  return (
    <div className="w-full bg-background-light dark:bg-background-dark min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
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

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 w-full"
        >
          <div className="relative">
            <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search projects by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <span className="material-icons">close</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Checkboxes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 w-full"
        >
          <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="material-icons text-primary text-lg">filter_list</span>
              Filter by Category
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {categories.map((category) => (
                <motion.label
                  key={category}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                    selectedCategories.includes(category)
                      ? "bg-primary/20 border-primary/50 text-white"
                      : "bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="hidden"
                  />
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                    selectedCategories.includes(category)
                      ? "bg-primary border-primary"
                      : "border-gray-600"
                  }`}>
                    {selectedCategories.includes(category) && (
                      <span className="material-icons text-white text-xs">check</span>
                    )}
                  </div>
                  <span className="text-sm font-medium">{category}</span>
                </motion.label>
              ))}
            </div>
            {selectedCategories.length > 0 && (
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedCategories([])}
                className="mt-4 text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                <span className="material-icons text-sm">close</span>
                Clear all filters
              </motion.button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full"
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
                className="bg-[#191920] rounded-2xl border border-gray-800 flex flex-col h-full transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer group overflow-hidden"
              >
                {/* Image Thumbnail */}
                {project.image ? (
                  <div className="relative w-full h-48 bg-gray-800 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                        {project.platform}
                      </span>
                      {project.featured && (
                        <span className="bg-yellow-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                      <span className="material-symbols-outlined text-yellow-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span className="text-white font-semibold text-xs">
                        {project.rating}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <span className="material-icons text-gray-600 text-6xl">code</span>
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                        {project.platform}
                      </span>
                      {project.featured && (
                        <span className="bg-yellow-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                      <span className="material-symbols-outlined text-yellow-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span className="text-white font-semibold text-xs">
                        {project.rating}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow space-y-4">
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  {/* Category Badge */}
                  <div className="flex items-center gap-2">
                    <span className="bg-teal-500/10 text-teal-400 text-xs font-medium px-3 py-1 rounded-full border border-teal-500/20">
                      {project.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-400 line-clamp-2 flex-grow">
                    {project.description || project.client?.feedback || "No description available."}
                  </p>

                  {/* Tags Section - Only show first 3 */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-primary/10 text-primary/80 text-xs font-medium px-2.5 py-1 rounded-md border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="bg-gray-800 text-gray-400 text-xs font-medium px-2.5 py-1 rounded-md">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

