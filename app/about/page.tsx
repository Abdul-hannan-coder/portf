"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import portfolioData from "../../data/portfolio.json";

export default function AboutPage() {
  const { about, personal } = portfolioData;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="w-full min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <main className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:w-3/5 space-y-5 lg:space-y-6 text-center md:text-left"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
            >
              Meet <span className="text-primary">MANSOOR</span>
            </motion.h2>
            {about.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="text-lg leading-relaxed text-gray-800 dark:text-gray-300"
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
            className="md:w-2/5 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-300 via-blue-400 to-purple-500 blur-xl opacity-70"
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
                  alt={`Profile picture of ${personal.name}`}
                  className="relative w-full h-full object-cover rounded-full border-4 border-background-light dark:border-background-dark z-10"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1X04fxetNxUXPyVl5mE10kQ3DOiurhLiKkkP82gBUDT937WRqnfoK4Il0pMZMEp2_YnFRVyMrfoAQNDHmAlGIgfCQbkX3gptS-DHDutX3CB4L3LjyBg6OJHdFowcDv4CmewpEAq5Xw9Qvs01giI0KTI0Tg_PlHDdEnuCqNR39OUcFfPCDZnOU6KdZQRSBDXMmer4EsHiGo-2IypC9cKrIHsb0PeZLWDvq8Ot5lTEtZXFRBKaBs97MMANCR1D8aOPQ9NjwpNXMcSY"
                  width={384}
                  height={384}
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
        </div>
      </main>
      <Footer />
    </div>
  );
}

