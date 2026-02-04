'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function HeroAfterCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative w-full"
    >
      <div className="w-full rounded-2xl overflow-hidden shadow-xl">
        <Image
          src="/hero-after-visual.png"
          alt="写真で撮ってデータへ"
          width={800}
          height={1000}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </motion.div>
  );
}
