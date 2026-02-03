import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Card, CardContent } from "@/components/ui/card";
import { FileQuestion, Brain, Calendar } from "lucide-react";

export function Problems() {
  const problems = [
    {
      icon: FileQuestion,
      title: "プリントが行方不明",
      description:
        "テストの束がどこかへ…。あのときの点数、何点だったかな？",
    },
    {
      icon: Brain,
      title: "苦手が思い出せない",
      description:
        "前はできてたのに。どこでつまずいたか、振り返れない。",
    },
    {
      icon: Calendar,
      title: "続かない",
      description:
        "記録しようと思っても、毎回きちんと書くのは大変で…。",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <Container>
        <SectionTitle
          title="こんなこと、ありませんか？"
          subtitle="テストを保存したいけど、続けるのが難しい。そんな声をよく聞きます。"
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <Card
              key={index}
              className="bg-white border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6 sm:p-8 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <problem.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {problem.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
