import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import AudioPlayer from "@/components/ui/AudioPlayer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "数字资产进化论 2026",
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
