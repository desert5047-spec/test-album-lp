'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HowItWorksCard } from './HowItWorksCard';
import { LucideIcon } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from '@/components/ui/carousel';

interface Step {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

interface HowItWorksCarouselProps {
  steps: Step[];
}

export function HowItWorksCarousel({ steps }: HowItWorksCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleDotClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: 'center',
          loop: false,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {steps.map((step, index) => (
            <CarouselItem key={step.number} className="pl-2 md:pl-4 basis-[85%]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
              >
                <HowItWorksCard
                  number={step.number}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center gap-2 mt-6">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 rounded-full transition-all ${
              current === index
                ? 'w-8 bg-orange-500'
                : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
