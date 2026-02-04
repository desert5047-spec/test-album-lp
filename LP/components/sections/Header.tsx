"use client";

import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "使い方", href: "#how-it-works" },
    { name: "料金", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 flex items-center justify-center">
              <Image
                src="/スクリーンショット_2026-01-27_143936 copy.png"
                alt="テストアルバム"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              テストアルバム
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                {item.name}
              </a>
            ))}
            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
              <a href="#cta">無料で始める</a>
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="メニューを開く"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-gray-600 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button asChild className="bg-blue-600 hover:bg-blue-700 w-full">
                <a href="#cta" onClick={() => setMobileMenuOpen(false)}>
                  無料で始める
                </a>
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
