"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import portfolioData from "../../../data/portfolio.json";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { projects } = portfolioData;
  const project = projects.items.find((p) => p.slug === slug);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-background-light dark:bg-background-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Project Not Found
          </h1>
          <Link
            href="/projects"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const images = Array.isArray(project.image)
    ? project.image
    : (project.image ? [project.image] : []);

  const nextImage = () => {
    if (images.length > 0) {
      setSelectedImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className="material-icons text-yellow-400 text-base">
        star
      </span>
    ));
  };

  return (
    <div className="w-full min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center text-primary hover:text-purple-400 transition-colors"
          >
            <motion.span
              whileHover={{ x: -5 }}
              className="material-icons mr-2"
            >
              arrow_back
            </motion.span>
            Back to Projects
          </Link>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-100/5 dark:bg-gray-800/20 p-8 md:p-12 rounded-lg border border-gray-700/50 w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-4 flex items-center space-x-4"
              >
                <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {project.platform}
                </span>
                {project.featured && (
                  <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Featured
                  </span>
                )}
                <div className="flex items-center space-x-1">
                  {renderStars(project.rating)}
                  <span className="text-white font-semibold text-sm">
                    {/* {project.rating} */}
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-4xl font-bold text-white dark:text-white mb-4"
              >
                {project.title}
              </motion.h1>

              {project.description && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-lg text-gray-400 dark:text-gray-400 mb-8"
                >
                  {project.description}
                </motion.p>
              )}

              {images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mb-10"
                >
                  <h2 className="text-2xl font-bold text-white dark:text-white mb-6 flex items-center gap-2">
                    <span className="material-icons text-primary">photo_library</span>
                    Project Gallery
                  </h2>

                  {/* Main Image Display */}
                  <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden mb-6 relative group border border-gray-800 shadow-2xl">
                    <Image
                      alt={`Screenshot ${selectedImageIndex + 1} of ${project.title}`}
                      className="w-full h-full object-contain"
                      src={images[selectedImageIndex]}
                      width={1200}
                      height={675}
                      unoptimized
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Slider Navigation Buttons */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-primary/80 backdrop-blur-md text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-90 border border-white/10"
                          aria-label="Previous image"
                        >
                          <span className="material-icons text-white block">chevron_left</span>
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-primary/80 backdrop-blur-md text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-90 border border-white/10"
                          aria-label="Next image"
                        >
                          <span className="material-icons text-white block">chevron_right</span>
                        </button>
                      </>
                    )}

                    {/* Image Counter Badge */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                      {selectedImageIndex + 1} / {images.length}
                    </div>
                  </div>

                  {/* Image Gallery Thumbnails */}
                  {images.length > 1 && (
                    <div className="relative">
                      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                        {images.map((img, index) => (
                          <motion.button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 snap-center ${selectedImageIndex === index
                              ? "border-primary shadow-lg shadow-primary/20 ring-2 ring-primary/20"
                              : "border-gray-700 opacity-60 hover:opacity-100 hover:border-gray-500"
                              }`}
                          >
                            <Image
                              src={img}
                              alt={`Thumbnail ${index + 1}`}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                            {selectedImageIndex === index && (
                              <div className="absolute inset-0 bg-primary/10" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Video Section */}
              {project.video && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mb-10"
                >
                  <h2 className="text-2xl font-bold text-white dark:text-white mb-4">
                    Project Demo
                  </h2>
                  <div className="aspect-video bg-gray-700/50 rounded-lg overflow-hidden border border-gray-700/50">
                    <iframe
                      width="100%"
                      height="100%"
                      src={project.video}
                      title="Project Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                </motion.div>
              )}

              <div className="space-y-8">
                {project.objectives && project.objectives.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <h3 className="text-xl font-semibold text-white dark:text-white mb-3">
                      Project Objectives
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 dark:text-gray-300">
                      {project.objectives.map((objective, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                        >
                          {objective}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {project.detailedDescription && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <h3 className="text-xl font-semibold text-white dark:text-white mb-3">
                      Detailed Description
                    </h3>
                    <p className="text-gray-300 dark:text-gray-300 leading-relaxed">
                      {project.detailedDescription}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Project Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gray-700/20 dark:bg-gray-900/40 p-6 rounded-lg border border-gray-700/50"
              >
                <h3 className="text-lg font-semibold text-white dark:text-white mb-4 border-b border-gray-700/50 pb-3">
                  Project Info
                </h3>
                <div className="space-y-4 text-sm">
                  {project.client?.name && (
                    <div className="flex items-center">
                      <span className="material-icons text-gray-400 dark:text-gray-400 mr-3">
                        person
                      </span>
                      <div>
                        <p className="text-gray-400 dark:text-gray-400">Client</p>
                        <p className="font-medium text-white dark:text-white">
                          {project.client.name}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className="material-icons text-gray-400 dark:text-gray-400 mr-3">
                      domain
                    </span>
                    <div>
                      <p className="text-gray-400 dark:text-gray-400">Domain</p>
                      <p className="font-medium text-white dark:text-white">
                        {project.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="material-icons text-gray-400 dark:text-gray-400 mr-3">
                      date_range
                    </span>
                    <div>
                      <p className="text-gray-400 dark:text-gray-400">Duration</p>
                      <p className="font-medium text-white dark:text-white">
                        {project.date}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Technologies Used */}
              {project.technologies && project.technologies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-gray-700/20 dark:bg-gray-900/40 p-6 rounded-lg border border-gray-700/50"
                >
                  <h3 className="text-lg font-semibold text-white dark:text-white mb-4 border-b border-gray-700/50 pb-3">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.6 + index * 0.05,
                          type: "spring",
                          stiffness: 200,
                        }}
                        whileHover={{ scale: 1.1 }}
                        className="bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Client Feedback */}
              {project.client?.feedback && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-emerald-900/40 border border-emerald-400/20 p-6 rounded-lg"
                >
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">
                    Client Feedback
                  </h3>
                  <p className="text-gray-300 dark:text-gray-300 italic text-sm">
                    &quot;{project.client.feedback}&quot;
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

