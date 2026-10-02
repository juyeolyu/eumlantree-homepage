import type { Metadata } from "next";
import "./globals.css";
import FirebaseAnalytics from "@/components/FirebaseAnalytics";

const siteUrl = "https://eumlantree.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [{ url: "/api/favicon", type: "image/png", sizes: "256x256" }],
    shortcut: ["/api/favicon"],
    apple: [{ url: "/api/favicon", type: "image/png", sizes: "256x256" }],
  },
  title: "이음랜트리 EUMLANTREE | 상업공간 네트워크·사무실 랜공사",
  description: "이음랜트리는 상업공간 네트워크공사와 사무실 랜공사를 전문으로 합니다. 유선·무선 네트워크 구축, 통신실 장비 구성, 케이블 정리 및 PC·OA 통합 유지보수를 지원합니다.",
  keywords: [
    "이음랜트리", "EUMLANTREE", "네트워크공사", "사무실랜공사", "사무실 네트워크 구축",
    "상업공간 네트워크", "랜공사", "유선 네트워크", "무선 네트워크", "통신실 장비 구성",
    "랜케이블 포설", "PC OA 유지보수",
  ],
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
    images: [{ url: "/eumlantree-logo-clean.png", width: 1462, height: 1076, alt: "이음랜트리 EUMLANTREE 로고" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "이음랜트리 EUMLANTREE | 상업공간 네트워크·사무실 랜공사",
    description: "상업공간 네트워크공사, 사무실 랜공사, 무선 네트워크 구축과 PC·OA 통합 유지보수 전문 업체입니다.",
    images: ["/eumlantree-logo-clean.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${siteUrl}/#organization`,
      name: "이음랜트리",
      alternateName: "EUMLANTREE",
      url: `${siteUrl}/`,
      logo: { "@type": "ImageObject", url: `${siteUrl}/eumlantree-logo-clean.png`, width: 1462, height: 1076 },
      image: `${siteUrl}/eumlantree-logo-clean.png`,
      description: "상업공간과 사무실 네트워크 설계·구축, 통신 배선 정리, PC·OA 통합 유지보수를 지원하는 네트워크 설비 업체입니다.",
      telephone: "+82-2-3159-8252",
      email: "eum@eumlantree.com",
      sameAs: ["https://blog.naver.com/eumlantree"],
      areaServed: { "@type": "Country", name: "대한민국" },
      knowsAbout: ["상업공간 네트워크 공사", "사무실 랜공사", "유선·무선 네트워크 구축", "랜케이블 포설", "통신실 장비 구성", "PC·OA 통합 유지보수"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "네트워크 설비 구축 및 유지보수 서비스",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "유선 네트워크 구축", description: "상업공간과 사무실의 랜케이블 포설, 회선 구성 및 통신 테스트" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "무선 네트워크 구축", description: "공간과 사용 환경에 맞춘 무선 AP 설치·이설 및 연결 상태 점검" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "통신 배선 및 통신실 장비 구성", description: "랙 케이블링, 라벨링, 허브 연결과 네트워크 장비 구성" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "PC·OA 통합 유지보수", description: "PC, 프린터·복합기, 공유폴더, NAS와 네트워크 장애 지원" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "이음랜트리 EUMLANTREE",
      inLanguage: "ko-KR",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: `${siteUrl}/`,
      name: "이음랜트리 | 상업공간 네트워크·사무실 랜공사",
      description: "상업공간 네트워크 공사, 사무실 랜공사, 유무선 네트워크 구축과 PC·OA 유지보수 서비스를 안내합니다.",
      inLanguage: "ko-KR",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body>
        <FirebaseAnalytics />
        {children}
      </body>
    </html>
  );
}
