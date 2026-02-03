'use client';

import { motion } from 'framer-motion';

interface AfterThumbnailItemProps {
  subject: string;
  subjectColor: string;
  date: string;
  score?: number;
  thumbnailBg: string;
  index: number;
}

export function AfterThumbnailItem({
  subject,
  subjectColor,
  date,
  score,
  thumbnailBg,
  index,
}: AfterThumbnailItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
      className="flex items-center gap-3 p-2.5 bg-white/80 rounded-lg hover:bg-white transition-colors"
    >
      <div
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-md ${thumbnailBg} flex-shrink-0 shadow-sm border border-gray-200/50 overflow-hidden`}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="space-y-1 w-full px-2">
            <div className="h-1 bg-white/40 rounded w-3/4"></div>
            <div className="h-1 bg-white/40 rounded w-1/2"></div>
            <div className="h-0.5 bg-white/30 rounded mt-2"></div>
            <div className="h-0.5 bg-white/30 rounded w-4/5"></div>
            <div className="h-0.5 bg-white/30 rounded w-3/4"></div>
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded ${subjectColor}`}
          >
            {subject}
          </span>
        </div>
        <div className="text-xs text-gray-500">{date}</div>
      </div>

      {score !== undefined && (
        <div className="text-sm font-semibold text-blue-600 flex-shrink-0">
          {score}点
        </div>
      )}
    </motion.div>
  );
}
