import { Container } from "@/components/Container";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const links = [
    { name: "利用規約", href: "/terms" },
    { name: "プライバシーポリシー", href: "/privacy" },
    { name: "お問い合わせ", href: "mailto:support@example.com" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <Container>
        <div className="py-12 sm:py-16 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <Link
              href="/"
              className="flex items-center gap-3 group w-fit"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-transparent">
                <Image
                  src="/スクリーンショット_2026-01-27_143936 copy.png"
                  alt="テストアルバム"
                  width={40}
                  height={40}
                  className="object-contain bg-transparent"
                />
              </div>
              <span className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                テストアルバム
              </span>
            </Link>

            <nav className="flex flex-wrap gap-6">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <Separator className="bg-gray-800" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-400">
            <p>
              子どものがんばりを、やさしく見守るアルバム
            </p>
            <p>&copy; 2026 テストアルバム. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
