"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Left sidebar/navbar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="fixed left-0 top-0 h-screen w-16 border-r border-black flex flex-col"
      >
        {/* Hamburger menu icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="p-4 border-b border-black"
        >
          <button className="flex flex-col gap-1.5 items-start">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 24 }}
              transition={{ duration: 0.3, delay: 1 }}
              className="h-px bg-black"
            ></motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 20 }}
              transition={{ duration: 0.3, delay: 1.1 }}
              className="h-px bg-black"
            ></motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 16 }}
              transition={{ duration: 0.3, delay: 1.2 }}
              className="h-px bg-black"
            ></motion.div>
          </button>
        </motion.div>
        
        {/* Bottom horizontal line */}
        <div className="mt-auto border-t border-black h-16"></div>
      </motion.div>

      {/* Vertical black lines */}
      <div className="absolute inset-0 flex justify-evenly pointer-events-none">
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="w-px bg-black h-full origin-top"
        ></motion.div>
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="w-px bg-black h-full origin-top"
        ></motion.div>
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="w-px bg-black h-full origin-top"
        ></motion.div>
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="w-px bg-black h-full origin-top"
        ></motion.div>
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="w-px bg-black h-full origin-top"
        ></motion.div>
      </div>

      {/* Right sidebar line */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
        className="fixed right-0 top-0 h-screen w-16 border-l border-black flex flex-col"
      >
        {/* Top horizontal line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
          className="border-b border-black h-16 origin-right"
        ></motion.div>
        
        {/* Bottom horizontal line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          className="mt-auto border-t border-black h-16 origin-right"
        ></motion.div>
      </motion.div>

      {/* Main content area */}
      <div className="ml-16 mr-16">
        {/* Your content goes here */}
      </div>
    </div>
  );
}
