'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function HeroBeforeCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full"
    >
      <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl shadow-md overflow-hidden p-3 sm:p-4 min-h-[220px] sm:min-h-[280px] flex flex-col opacity-80 saturate-50">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-gray-600 bg-gray-400/30 px-2.5 py-0.5 rounded-full">
            BEFORE
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center relative">
          <div className="relative w-full h-[140px] sm:h-[180px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[90%] h-[90%]">
                <div className="absolute top-0 left-1 w-28 sm:w-36 h-36 sm:h-44 bg-white/90 rounded shadow-md transform -rotate-6 border border-gray-300 overflow-hidden">
                  <Image
                    src="/hero-before-papers.png"
                    alt="テスト用紙の束"
                    width={144}
                    height={176}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 text-center">
          <p className="text-xs text-gray-600">
            テストの束...
          </p>
        </div>
      </div>
    </motion.div>
  );
}
