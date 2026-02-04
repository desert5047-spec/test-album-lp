'use client';

import { HeroAfterCard } from './HeroAfterCard';

export function HeroVisual() {
  return (
    <>
      {/* スマホ：縦積み */}
      <div className="md:hidden w-full max-w-[600px] mx-auto py-6">
        <HeroAfterCard />
      </div>

      {/* PC：固定フレーム内にabsolute配置 */}
      <div className="hidden md:block relative w-full max-w-[700px] mx-auto min-h-[500px]">
        {/* After: 中央配置 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px]">
          <HeroAfterCard />
        </div>
      </div>
    </>
  );
}
