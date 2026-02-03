'use client';

import { Camera, Pencil, TrendingUp } from 'lucide-react';
import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';
import { HowItWorksGrid } from '@/components/howitworks/HowItWorksGrid';
import { HowItWorksCarousel } from '@/components/howitworks/HowItWorksCarousel';

const steps = [
  {
    number: 1,
    icon: Camera,
    title: '撮る',
    description: '返却されたテストをスマホで撮影。それだけで保存完了。',
  },
  {
    number: 2,
    icon: Pencil,
    title: 'ちょっと記録',
    description: '教科や点数は入力したいときだけ。空欄でもOK。',
  },
  {
    number: 3,
    icon: TrendingUp,
    title: '月末に振り返る',
    description: 'まとめて見返せば、がんばりや変化が見えてきます。',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white scroll-mt-20">
      <Container>
        <SectionTitle
          title="3ステップで始められます"
          subtitle="難しい操作は一切なし。撮って、必要なら記録して、見返すだけ。"
        />

        <div className="mt-12 hidden md:block">
          <HowItWorksGrid steps={steps} />
        </div>

        <div className="mt-12 block md:hidden">
          <HowItWorksCarousel steps={steps} />
        </div>
      </Container>
    </section>
  );
}
