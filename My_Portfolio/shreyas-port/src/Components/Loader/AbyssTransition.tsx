import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AbyssTransition({ children, locationKey }: { children: React.ReactNode, locationKey: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={locationKey} className="relative w-full h-full">
        
        {/* The Transition Wipe Effect */}
        <motion.div
          initial={{ top: "100%", height: "0%" }}
          animate={{ top: "0%", height: "0%" }}
          exit={{ top: "0%", height: "100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-[#020813] border-b-2 border-cyan-500 flex items-center justify-center overflow-hidden pointer-events-none shadow-[0_0_50px_rgba(34,211,238,0.2)]"
        >
          {/* Subtle noise/data lines inside the wipe */}
          <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#22d3ee_2px,#22d3ee_4px)]" />
        </motion.div>

        {/* The Page Content Fading In */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {children}
        </motion.div>

      </motion.div>
    </AnimatePresence>
  );
}