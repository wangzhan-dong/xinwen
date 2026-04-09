import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

// Force client-only loading to prevent hydration crashes on mobile browsers
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const AudioPlayer = dynamic(() => import("@/components/ui/AudioPlayer"), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "虚拟资产发展全景观察",
  description: "全景视界 2026 融合新闻实验室深度报道",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} bg-[#05050A] text-white antialiased`}>
        <CustomCursor />
        <AudioPlayer />
        {children}
      </body>
    </html>
  );
}
