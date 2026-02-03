import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "入力は毎回必要ですか？",
      answer:
        "いいえ、必要ありません。写真を撮るだけでも保存できます。教科や点数は、記録したいときだけ入力すれば大丈夫です。空欄のまま保存しても問題ありません。",
    },
    {
      question: "点数がないテストでも使えますか？",
      answer:
        "もちろん使えます。○×だけのテストや、記述式のテストも写真で保存できます。点数欄は空欄のままで構いません。後から見返すだけでも、十分価値があります。",
    },
    {
      question: "子どもが複数いる場合はどうすればいいですか？",
      answer:
        "現在は1アカウント1お子さまの運用を想定していますが、将来的には複数のお子さまを管理できる機能を追加予定です。今は別々のアカウントでご利用いただけます。",
    },
    {
      question: "保存したデータは消えませんか？",
      answer:
        "基本的には消えませんが、端末の故障や紛失のリスクはあります。将来的には自動バックアップ機能を追加する予定です。大切なデータは定期的にスクリーンショットなどで二重保存することをおすすめします。",
    },
    {
      question: "他の人と点数を比較する機能はありますか？",
      answer:
        "ありません。テストアルバムは、お子さま自身の成長を見守るためのツールです。競争ではなく、過去の自分と比べて「できるようになったこと」を実感できることを大切にしています。",
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-white scroll-mt-20">
      <Container>
        <SectionTitle
          title="よくある質問"
          subtitle="ご不明な点があれば、まずこちらをご確認ください。"
        />

        <div className="mt-12 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gray-50 border border-gray-200 rounded-xl px-6 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
