"use client";

import { motion } from "framer-motion";

export default function LoadingGlow() {
  return (
    <div className="flex items-center justify-center w-full py-20">
      <motion.div
        className="w-6 h-6 bg-sky-500 rounded-full shadow-lg"
        animate={{
          scale: [1, 1.6, 1],
          opacity: [1, 0.7, 1],
          boxShadow: [
            "0 0 0px rgba(29, 135, 173, 0.4)",
            "0 0 20px rgba(18, 98, 173, 0.6)",
            "0 0 0px rgba(40, 138, 235, 0.536)",
          ],
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
