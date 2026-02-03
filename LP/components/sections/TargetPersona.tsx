import { Container } from "@/components/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Folder, TrendingUp, Users } from "lucide-react";

export function TargetPersona() {
  const personas = [
    {
      icon: Clock,
      title: "毎日忙しくて時間がない",
      description: "仕事や家事で忙しい。テストを整理する時間がなかなか取れない。",
    },
    {
      icon: Folder,
      title: "プリント整理が苦手",
      description: "いつの間にかテストがどこかへ。整理するのが苦手で続かない。",
    },
    {
      icon: TrendingUp,
      title: "成長を記録したい",
      description: "子どもの頑張りを記録して、あとで一緒に振り返りたい。",
    },
    {
      icon: Users,
      title: "兄弟のテストを管理",
      description: "複数の子どものテストを、まとめて管理したい。",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-gray-100">
      <Container>
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            こんな方におすすめです
          </h2>
          <p className="text-gray-600">
            小学生のお子さまを持つ、忙しい保護者の方へ
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((persona, index) => (
            <Card
              key={index}
              className="bg-blue-50/50 border-blue-100 hover:border-blue-200 hover:shadow-md transition-all duration-300"
            >
              <CardContent className="p-6 space-y-3 text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                  <persona.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {persona.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {persona.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            ひとつでも当てはまる方に、使っていただきたいサービスです
          </p>
        </div>
      </Container>
    </section>
  );
}
