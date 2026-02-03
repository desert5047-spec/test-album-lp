import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-orange-50">
            <Icon className="w-6 h-6 text-orange-500" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {title}
        </h3>

        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
