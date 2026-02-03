'use client';

import { motion } from 'framer-motion';
import { HowItWorksCard } from './HowItWorksCard';
import { LucideIcon } from 'lucide-react';

interface Step {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

interface HowItWorksGridProps {
  steps: Step[];
}

export function HowItWorksGrid({ steps }: HowItWorksGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {steps.map((step, index) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.4,
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
      ))}
    </div>
  );
}
