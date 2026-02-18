import { Container } from "@/components/Container";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const links = [
    { name: "利用規約", href: "/terms" },
    { name: "プライバシーポリシー", href: "/privacy" },
    { name: "お問い合わせ", href: "https://docs.google.com/forms/d/e/1FAIpQLSeNQjw8CRwEPbCD9JfvAY3dbWTdDNlyXBV8UOk4zdtGQLTOTg/viewform?usp=publish-editor" },
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
              {links.map((link) => {
                const isExternal = link.href.startsWith('http');
                
                if (isExternal) {
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  );
                }
                
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                );
              })}
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
