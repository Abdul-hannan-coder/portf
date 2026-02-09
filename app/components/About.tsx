"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import portfolioData from "../../data/portfolio.json";

export default function About() {
  const { about, personal } = portfolioData;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full py-20 md:py-32 overflow-x-hidden">
      <div className="grid md:grid-cols-3 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="md:col-span-2 space-y-6"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white"
          >
            {about.title}{" "}
            <motion.span
              className="text-primary inline-block"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {about.highlightedTitle}
            </motion.span>
          </motion.h2>
          {about.paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="text-gray-600 dark:text-gray-400"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1, rotate: 0 }
              : { opacity: 0, scale: 0.5, rotate: -180 }
          }
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-400 to-primary rounded-full blur-xl opacity-70 animated-gradient"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                alt={`Portrait of ${personal.name}`}
                className="relative w-full h-full object-cover rounded-full border-4 border-background-dark z-10"
                src={personal.profileImage}
                width={320}
                height={320}
                unoptimized
              />
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-primary/30"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

