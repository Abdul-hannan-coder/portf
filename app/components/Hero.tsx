"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import portfolioData from "../../data/portfolio.json";

export default function Hero() {
  const { personal } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  return (
    <section className="w-full py-20 md:py-32 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-semibold text-gray-800 dark:text-white"
          >
            Welcome! 👋
          </motion.h2>
          <motion.h1
            variants={itemVariants}
            className="text-5xl font-bold text-gray-900 dark:text-white"
          >
            I&apos;m{" "}
            <motion.span
              className="text-primary inline-block"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: "linear-gradient(90deg, #C880FF, #9D4EDD, #C880FF)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {personal.name}
            </motion.span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-2xl font-medium text-gray-700 dark:text-gray-300"
          >
            {personal.tagline}
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            {personal.subtitle}
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="floating"
          >
            <Image
              alt="Illustration of a developer working on a laptop with code on the screen."
              src={personal.heroImage}
              width={600}
              height={600}
              className="w-full h-auto relative z-10"
              unoptimized
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/20 to-green-400/20 rounded-full blur-3xl -z-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

