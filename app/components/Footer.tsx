"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import portfolioData from "../../data/portfolio.json";

const socialIcons: Record<string, React.ReactElement> = {
  github: (
    <svg
      aria-hidden="true"
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"
        fillRule="evenodd"
      ></path>
    </svg>
  ),
  linkedin: (
    <svg
      aria-hidden="true"
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
    </svg>
  ),
  x: (
    <svg
      aria-hidden="true"
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12.502 21.464c-2.61.59-4.823.238-6.191-.94-1.354-1.168-1.543-3.036-.599-5.182.972-2.189 2.56-3.834 4.542-5.07 1.983-1.237 4.29-1.89 6.273-1.638 1.554.2 2.923.832 4.09 1.745.242.18.42.363.538.527.12.164.19.32.19.467 0 .19-.084.375-.253.553-.168.178-.393.267-.674.267-.29 0-.547-.077-.768-.23-.222-.153-.464-.343-.728-.57-.936-.788-2.03-1.25-3.28-1.38-1.78-.18-3.57.29-5.023 1.39-1.573 1.2-2.68 2.87-3.32 4.98-.61 2.05-.46 3.65.45 4.79.91 1.14 2.62 1.57 5.13 1.29 2.51-.28 4.29-1.39 5.34-3.33.16-.31.37-.58.62-.82.25-.24.5-.36.73-.36s.44.12.61.36c.17.24.25.5.25.79 0 .28-.09.56-.27.84-.46.7-1.12 1.3-1.99 1.83-1.78 1.05-3.8 1.5-6.05 1.34z"></path>
    </svg>
  ),
  email: (
    <svg
      aria-hidden="true"
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.999 17.999l-2-1.999 5.999-6-5.999-6 2-2 8 8-8 8z"></path>
    </svg>
  ),
};

export default function Footer() {
  const { footer, social } = portfolioData;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className="text-center py-16 bg-gray-100 dark:bg-gray-900/50 rounded-lg mt-16 backdrop-blur-sm relative overflow-hidden"
    >
      <div className="absolute inset-0 shimmer opacity-30"></div>
      <div className="relative z-10">
        <motion.h3
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          {footer.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-600 dark:text-gray-400 mt-2 mb-6"
          dangerouslySetInnerHTML={{ __html: footer.subtitle }}
        />
        <div className="flex justify-center space-x-4">
          {social.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, rotate: 0 }
                  : { opacity: 0, scale: 0, rotate: -180 }
              }
              transition={{
                duration: 0.5,
                delay: 0.4 + index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{
                scale: 1.2,
                rotate: 360,
                y: -5,
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                className="social-icon w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-primary/50"
                href={item.href}
                aria-label={item.name}
              >
                {socialIcons[item.icon] || socialIcons.email}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}

