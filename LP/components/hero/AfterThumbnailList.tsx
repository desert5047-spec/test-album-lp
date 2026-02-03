'use client';

import { AfterThumbnailItem } from './AfterThumbnailItem';

const thumbnailData = [
  {
    subject: '算数',
    subjectColor: 'bg-orange-100 text-orange-700',
    date: '1月20日',
    score: 85,
    thumbnailBg: 'bg-gradient-to-br from-orange-100 to-orange-200',
  },
  {
    subject: '国語',
    subjectColor: 'bg-green-100 text-green-700',
    date: '1月18日',
    thumbnailBg: 'bg-gradient-to-br from-green-100 to-green-200',
  },
  {
    subject: '理科',
    subjectColor: 'bg-blue-100 text-blue-700',
    date: '1月15日',
    score: 78,
    thumbnailBg: 'bg-gradient-to-br from-blue-100 to-blue-200',
  },
  {
    subject: '社会',
    subjectColor: 'bg-amber-100 text-amber-700',
    date: '1月12日',
    thumbnailBg: 'bg-gradient-to-br from-amber-100 to-amber-200',
  },
];

export function AfterThumbnailList() {
  return (
    <div className="space-y-2">
      {thumbnailData.map((item, index) => (
        <AfterThumbnailItem
          key={index}
          subject={item.subject}
          subjectColor={item.subjectColor}
          date={item.date}
          score={item.score}
          thumbnailBg={item.thumbnailBg}
          index={index}
        />
      ))}
    </div>
  );
}
