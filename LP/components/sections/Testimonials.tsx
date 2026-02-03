import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Testimonials() {
  const testimonials = [
    {
      name: "Aさん",
      role: "小学4年生のお母さん",
      content:
        "写真を撮るだけなので、忙しい日でも続けられています。月末に子どもと一緒に見返すのが、ちょっとした楽しみになりました。",
      initial: "A",
    },
    {
      name: "Bさん",
      role: "小学2年生・5年生のお母さん",
      content:
        "点数を入れなくても保存できるのが良いです。プリントをなくすことがなくなって、親子ともに安心感があります。",
      initial: "B",
    },
    {
      name: "Cさん",
      role: "小学3年生のお母さん",
      content:
        "グラフで推移が見えると、子どもも「前より良くなってる」と実感できるみたいです。プレッシャーにならない程度に、モチベーションになっているようです。",
      initial: "C",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <Container>
        <SectionTitle
          title="ご利用の声"
          subtitle="実際に使っている方の、リアルな感想です。"
        />

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 bg-blue-100 text-blue-600">
                    <AvatarFallback className="text-lg font-semibold">
                      {testimonial.initial}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {testimonial.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            ※ 個人の感想です。効果を保証するものではありません
          </p>
        </div>
      </Container>
    </section>
  );
}
