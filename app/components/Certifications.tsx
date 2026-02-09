"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import portfolioData from "../../data/portfolio.json";

export default function Certifications() {
  const { certifications } = portfolioData;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full py-20 md:py-32">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16"
      >
        Professional{" "}
        <motion.span
          className="text-primary inline-block"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Certifications
        </motion.span>
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {certifications.map((cert, index) => {
          const itemRef = useRef(null);
          const itemInView = useInView(itemRef, {
            once: true,
            margin: "-50px",
          });

          return (
            <motion.div
              key={index}
              ref={itemRef}
              initial={{ opacity: 0, y: 50 }}
              animate={
                itemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300 overflow-hidden"
            >
              {cert.image && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={
                    itemInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: -20 }
                  }
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative w-full h-48 bg-gray-200 dark:bg-gray-800"
                >
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </motion.div>
              )}
              <div className="flex items-start gap-4 p-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={
                    itemInView
                      ? { scale: 1, rotate: 0 }
                      : { scale: 0, rotate: -180 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1 + 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full ring-4 bg-teal-400/20 dark:bg-teal-400/10 ring-teal-400/30"
                >
                  <span className="material-icons text-teal-400">
                    {cert.icon}
                  </span>
                </motion.div>
                <div className="flex-1">
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      itemInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -20 }
                    }
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="text-xl font-semibold text-teal-400"
                  >
                    {cert.title}
                  </motion.h3>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      itemInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -20 }
                    }
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                    className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-x-4"
                  >
                    <span className="flex items-center">
                      <span className="material-icons text-gray-400 text-sm mr-1.5">
                        business
                      </span>
                      {cert.issuer}
                    </span>
                    <span className="flex items-center">
                      <span className="material-icons text-gray-400 text-sm mr-1.5">
                        calendar_today
                      </span>
                      {cert.date}
                    </span>
                  </motion.div>
                  {cert.credentialId && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={itemInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                      className="text-xs text-gray-500 dark:text-gray-500 mt-2"
                    >
                      Credential ID: {cert.credentialId}
                    </motion.p>
                  )}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      itemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                    }
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                    className="text-sm text-gray-600 dark:text-gray-400 mt-4 leading-relaxed"
                  >
                    {cert.description}
                  </motion.p>
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      SKILLS:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={
                            itemInView
                              ? { opacity: 1, scale: 1 }
                              : { opacity: 0, scale: 0 }
                          }
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1 + 0.7 + skillIndex * 0.05,
                            type: "spring",
                            stiffness: 200,
                          }}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "rgba(20, 184, 166, 0.2)",
                          }}
                          className="text-xs px-3 py-1 rounded-md border cursor-default transition-all duration-300 bg-teal-500/10 text-teal-400 border-teal-500/20"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
