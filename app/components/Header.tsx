"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import portfolioData from "../../data/portfolio.json";

export default function Header() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-between items-center py-6"
    >
      <Link href="/">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="text-3xl font-bold text-primary cursor-pointer transition-all duration-300"
        >
          {portfolioData.personal.initials}
        </motion.div>
      </Link>
      <nav className="hidden md:flex items-center space-x-2 bg-gray-100 dark:bg-gray-800/50 p-2 rounded-lg backdrop-blur-sm">
        {portfolioData.navigation.map((item, index) => {
          const isActive =
            (pathname === "/" && item.href === "/") ||
            (pathname !== "/" && item.href === pathname);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <Link
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/50"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105"
                }`}
                href={item.href}
              >
                <motion.span
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="material-icons text-xl"
                >
                  {item.icon}
                </motion.span>
                <span>{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="material-icons">menu</span>
      </motion.button>
    </motion.header>
  );
}

