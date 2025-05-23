import type { Metadata } from "next";
import AppProviderLayout from "@/Components/Layout/AppProviderLayout";

export const metadata: Metadata = {
  title: "المعجم الذكي - المدقق اللغوي الذكي",
  description: "تطبيق عربي ذكي لتحليل وتصحيح النصوص اللغوية بدقة وسرعة.",
  keywords: ["معجم", "مدقق لغوي", "لغة عربية", "تصحيح", "ذكاء اصطناعي"],
  authors: [{ name: "فريق المعجم الذكي", url: "https://yourdomain.com" }],
  creator: "فريق المعجم الذكي",
  applicationName: "المعجم الذكي",
  openGraph: {
    title: "المعجم الذكي - المدقق اللغوي الذكي",
    description: "استخدم المعجم الذكي لتصحيح النصوص وتحسين جودة الكتابة بالعربية.",
    url: "https://yourdomain.com",
    siteName: "المعجم الذكي",
    locale: "ar_JO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "المعجم الذكي",
    description: "تصحيح لغوي دقيق باستخدام الذكاء الاصطناعي.",
    site: "@yourhandle",
  },
  metadataBase: new URL("https://yourdomain.com"),
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <AppProviderLayout>{children}</AppProviderLayout>
    </html>
  );
}
