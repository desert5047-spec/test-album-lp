'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Camera } from 'lucide-react';

interface HeroArrowProps {
  orientation?: 'horizontal' | 'vertical';
}

export function HeroArrow({ orientation = 'horizontal' }: HeroArrowProps) {
  return (
    <div className="flex items-center justify-center">
      {orientation === 'horizontal' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:flex flex-col items-center gap-3 px-4"
        >
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
            <Camera className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">撮るだけ</span>
          </div>
          <div className="relative">
            <ArrowRight className="w-10 h-10 text-blue-600" strokeWidth={2.5} />
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <ArrowRight className="w-10 h-10 text-blue-400" strokeWidth={2} />
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex lg:hidden flex-col items-center gap-3 py-4"
        >
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
            <Camera className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">撮るだけ</span>
          </div>
          <div className="relative">
            <ArrowDown className="w-10 h-10 text-blue-600" strokeWidth={2.5} />
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <ArrowDown className="w-10 h-10 text-blue-400" strokeWidth={2} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
