import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

export const metadata = {
  title: "Eng. Mohammed Maridi | Official Portfolio",
  description: "The official portfolio of Eng. Mohammed Maridi, Software Engineer and IT Specialist. Showcasing premium cloud systems, web applications, and corporate digital solutions.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Eng. Mohammed Maridi | Official Portfolio",
    description: "Explore cutting-edge cloud projects and premium web development services tailored for visionary businesses and institutions.",
    url: "https://mohammedmaridi.com",
    siteName: "Mohammed Maridi Portfolio",
    images: [
      {
        url: "https://mohammedmaridi.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Eng. Mohammed Maridi Portfolio Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  verification: {
    google: "RZ7in97l4Dude9irgKcPop_QJB5F8bQKb5mChRuV1tc", // 🚀 رمز التحقق من قوقل
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // التحقق من أن اللغة مدعومة
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // جلب ملفات الترجمة
  const messages = await getMessages();
  
  // تحديد اتجاه الصفحة بناءً على اللغة
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  // كود الـ Schema لتعريف هويتك المهنية وموقعك لمحركات البحث بشكل صريح
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mohammed Maridi",
    "jobTitle": "Software Engineer & IT Specialist",
    "url": "https://portfolio-mohammed-maridi.vercel.app",
    "sameAs": [
      "https://github.com/SWE-M" // رابط حساب الجيت هاب الخاص بك
    ],
    "knowsAbout": [
      "Software Engineering",
      "Web Development",
      "Cloud Architecture",
      "IT Systems"
    ]
  };

  return (
    <html lang={locale} dir={dir}>
      <body className="bg-slate-900 text-white min-h-screen">
        {/* حقن بيانات السيو الهيكلية (Schema Markup) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}