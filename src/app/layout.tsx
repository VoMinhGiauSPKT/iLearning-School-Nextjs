import type { Metadata } from "next";
import "./globals.scss";
import Header from "@/components/layout/header";
import { getLandingPageData } from "@/services/landing.service";
import { getIsMobile } from "@/lib/device";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ilearning School - Đào Tạo Lập Trình",
  description: "Chương trình học mang lại kiến thức thực chiến để đi làm",
  other: {
    google: "notranslate",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [data, isMobile] = await Promise.all([
    getLandingPageData(),
    getIsMobile(),
  ]);

  return (
    <html lang="vi" translate="no" className="notranslate">
      <body suppressHydrationWarning className="notranslate">
        <Header header={data.header} isMobile={isMobile} />
        {children}
      </body>
    </html>
  );
}
