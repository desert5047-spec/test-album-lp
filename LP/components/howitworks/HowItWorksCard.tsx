import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface HowItWorksCardProps {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export function HowItWorksCard({
  number,
  icon: Icon,
  title,
  description,
}: HowItWorksCardProps) {
  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full">
      <CardContent className="p-6 flex flex-col items-start h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold text-lg">
            {number}
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            {title}
          </h3>
        </div>

        <p className="text-gray-600 leading-relaxed mb-4">
          {description}
        </p>

        {number === 1 && (
          <div className="w-full h-[250px] md:h-[320px] rounded-lg overflow-hidden bg-gray-50 flex items-end justify-center">
            <Image
              src="/how-it-works-step1.png"
              alt="テストをスマホで撮影している様子"
              width={400}
              height={300}
              className="w-full h-auto max-h-full object-contain"
            />
          </div>
        )}

        {number === 2 && (
          <div className="w-full h-[250px] md:h-[320px] rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
            <Image
              src="/how-it-works-step2.png"
              alt="記録画面の様子"
              width={400}
              height={300}
              className="w-full h-auto max-h-full object-contain"
            />
          </div>
        )}

        {number === 3 && (
          <div className="w-full h-[250px] md:h-[320px] rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
            <Image
              src="/how-it-works-step3.png"
              alt="月末に振り返る画面の様子"
              width={400}
              height={300}
              className="w-full h-auto max-h-full object-contain"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
