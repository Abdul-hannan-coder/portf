"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import portfolioData from "../../data/portfolio.json";

export default function Timeline() {
  const { timeline } = portfolioData;
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
        Work and Education{" "}
        <motion.span
          className="text-primary inline-block"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Timeline
        </motion.span>
      </motion.h2>
      <div className="relative">
        {timeline.map((item, index) => {
          const itemRef = useRef(null);
          const itemInView = useInView(itemRef, {
            once: true,
            margin: "-50px",
          });

          return (
            <motion.div
              key={index}
              ref={itemRef}
              initial={{ opacity: 0, x: -50 }}
              animate={
                itemInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
              }
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative flex items-start pl-12 sm:pl-16 mb-8 sm:mb-12 last:mb-0"
            >
              <div className="flex-shrink-0 w-8 sm:w-9 text-center relative">
                {index < timeline.length - 1 && (
                  <motion.div
                    className="timeline-item-connector"
                    initial={{ scaleY: 0 }}
                    animate={itemInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  />
                )}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={
                    itemInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2 + 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 sm:ring-4 ${
                    item.iconColor === "teal"
                      ? "bg-teal-400/20 dark:bg-teal-400/10 ring-teal-400/30"
                      : "bg-amber-400/20 dark:bg-amber-400/10 ring-amber-400/30"
                  }`}
                >
                  <span
                    className={`material-icons text-sm sm:text-base ${
                      item.iconColor === "teal"
                        ? "text-teal-400"
                        : "text-amber-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  itemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
                className="ml-3 sm:ml-6 w-full bg-gray-50 dark:bg-gray-900/50 p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300"
              >
                <h3
                  className={`text-lg sm:text-xl font-semibold ${
                    item.iconColor === "teal" ? "text-teal-400" : "text-amber-400"
                  }`}
                >
                  {item.title}
                </h3>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 mb-4 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-x-4">
                  <span className="flex items-center">
                    <span className="material-icons text-red-500 text-sm mr-1.5">
                      location_on
                    </span>
                    <span className="break-words">{item.location}</span>
                  </span>
                  <span className="flex items-center">
                    <span className="material-icons text-gray-400 text-sm mr-1.5">
                      calendar_today
                    </span>
                    {item.period}
                  </span>
                </div>
                <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {item.description.map((desc, descIndex) => (
                    <motion.li
                      key={descIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={
                        itemInView
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: -10 }
                      }
                      transition={{
                        duration: 0.3,
                        delay: index * 0.2 + 0.5 + descIndex * 0.05,
                      }}
                      className="leading-relaxed"
                    >
                      {desc}
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-4 sm:mt-6">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    SKILLS:
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {item.skills.map((skill, skillIndex) => (
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
                          delay:
                            index * 0.2 + 0.6 + skillIndex * 0.05,
                          type: "spring",
                          stiffness: 200,
                        }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(20, 184, 166, 0.2)",
                        }}
                        className="bg-teal-500/10 text-teal-400 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-md border border-teal-500/20 cursor-default transition-all duration-300"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

