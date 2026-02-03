'use client';

import { HeroBeforeCard } from './HeroBeforeCard';
import { HeroAfterCard } from './HeroAfterCard';
import { HeroArrow } from './HeroArrow';

export function HeroVisual() {
  return (
    <>
      {/* スマホ：縦積み */}
      <div className="md:hidden space-y-3 w-full max-w-[520px] mx-auto py-6">
        <HeroBeforeCard />
        <HeroArrow orientation="vertical" />
        <HeroAfterCard />
      </div>

      {/* PC：固定フレーム内にabsolute配置 */}
      <div className="hidden md:block relative w-full max-w-[560px] mx-auto aspect-[11/8] min-h-[400px]">
        {/* Before: 左下 32% */}
        <div className="absolute left-0 bottom-6 w-[32%]">
          <HeroBeforeCard />
        </div>

        {/* Arrow: 中央 16% */}
        <div className="absolute left-[38%] top-1/2 -translate-y-1/2 w-[16%] flex justify-center">
          <HeroArrow orientation="horizontal" />
        </div>

        {/* After: 右上 62% */}
        <div className="absolute right-0 top-0 w-[62%]">
          <HeroAfterCard />
        </div>
      </div>
    </>
  );
}
