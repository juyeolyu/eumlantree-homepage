import type { Metadata } from "next";
import "./globals.css";
import FirebaseAnalytics from "@/components/FirebaseAnalytics";

const siteUrl = "https://eumlantree.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "이음랜트리 EUMLANTREE | 상업공간 네트워크·사무실 랜공사",
  description: "이음랜트리는 상업공간 네트워크공사와 사무실 랜공사를 전문으로 합니다. 유선·무선 네트워크 구축, 통신실 장비 구성, 케이블 정리 및 PC·OA 통합 유지보수를 지원합니다.",
  alternates: { canonical: "/" },
  verification: {
    other: { "naver-site-verification": ["61e82e304ffadac200caa9dd1609d0ed2cfcec91", "3fb0d2420dd9478642190cd8f3ba4f6f574a0b1e"] },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl + "/",
    siteName: "이음랜트리 EUMLANTREE",
    title: "이음랜트리 EUMLANTREE | 상업공간 네트워크·사무실 랜공사",
    description: "상업공간 네트워크공사, 사무실 랜공사, 무선 네트워크 구축과 PC·OA 통합 유지보수 전문 업체입니다.",
  },
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "이음랜트리",
  alternateName: "EUMLANTREE",
  url: siteUrl + "/",
  image: siteUrl + "/eumlantree-logo-clean.png",
  description: "상업공간 네트워크공사, 사무실 랜공사, 무선 네트워크 구축과 PC 및 OA 통합 유지보수 전문 업체",
  telephone: "+82-2-3159-8252",
  email: "eum@eumlantree.com",
  sameAs: ["https://blog.naver.com/eumlantree"],
  areaServed: { "@type": "Country", name: "대한민국" },
  knowsAbout: ["상업공간 네트워크공사", "사무실 랜공사", "유선·무선 네트워크 구축", "통신실 장비 구성", "PC 및 OA 유지보수"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} />
      </head>
      <body>
        <FirebaseAnalytics />
        {children}
      </body>
    </html>
  );
}
