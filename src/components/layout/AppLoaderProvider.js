"use client";

import { useState, useEffect } from "react";
import BrandLoader from "@/components/brand/BrandLoader";
import { motion, AnimatePresence } from "framer-motion";

export default function AppLoaderProvider({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show splash loader briefly on initial entry for smooth branding immersion
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="splash-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F5F8FC]/95 backdrop-blur-md"
          >
            <BrandLoader />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
