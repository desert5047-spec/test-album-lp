'use client';

import { motion } from 'framer-motion';
import { AfterThumbnailList } from './AfterThumbnailList';

export function HeroAfterCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative w-full"
    >
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-xl overflow-hidden p-4 sm:p-5 min-h-[340px] sm:min-h-[420px] flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-blue-700 bg-blue-200/50 px-3 py-1 rounded-full">
            AFTER
          </span>
        </div>

        <div className="flex-1 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm">
          <div className="mb-3">
            <span className="text-sm font-semibold text-blue-900">2026年 1月</span>
          </div>

          <AfterThumbnailList />
        </div>

        <div className="mt-4 text-center px-2">
          <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
            写真で残すだけ。
            <br className="sm:hidden" />
            あとから、ちゃんと見返せます。
          </p>
        </div>
      </div>
    </motion.div>
  );
}
