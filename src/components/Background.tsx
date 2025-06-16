"use client";

import { motion } from "motion/react";

export default function Background() {
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 -z-50 bg-gradient-to-tr from-[#a9170a] via-[#831010] to-[#2c0000]"
      style={{
        backgroundSize: "400% 400%",
        animation: "gradientMoveX 8s ease-in-out infinite, gradientMoveY 7s ease-in-out infinite",
      }}
    >
      <style>
        {`
          @keyframes gradientMoveX {
            0% { background-position-x: 0%; }
            50% { background-position-x: 100%; }
            100% { background-position-x: 0%; }
          }
          @keyframes gradientMoveY {
            0% { background-position-y: 0%; }
            25% { background-position-y: 50%; }
            50% { background-position-y: 100%; }
            75% { background-position-y: 50%; }
            100% { background-position-y: 0%; }
          }
        `}
      </style>
    </motion.div>
  );
}
