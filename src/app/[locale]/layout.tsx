import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';
import { getTranslations } from 'next-intl/server';
import { SpeedInsights } from '@vercel/speed-insights/next';

// 🚀 تحويل الـ Metadata لتصبح ديناميكية لتدعم السيو ثنائي اللغة (عربي / إنجليزي) بشكل احترافي
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: "/icon.png",
      shortcut: "/icon.png",
      apple: "/icon.png",
    },
    // تهيئة الروابط البديلة (Hreflang) لمنع قوقل من اعتبار المحتوى مكرراً وتوجيه العناكب بدقة
    alternates: {
      canonical: `https://mohammedmaridi.com/${locale}`,
      languages: {
        ar: 'https://mohammedmaridi.com/ar',
        en: 'https://mohammedmaridi.com/en',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://mohammedmaridi.com/${locale}`,
      siteName: "Mohammed Maridi Portfolio",
      images: [
        {
          url: "https://mohammedmaridi.com/og-image.png",
          width: 1200,
          height: 630,
          alt: locale === 'ar' ? "شعار محفظة أعمال المهندس محمد مريدي" : "Eng. Mohammed Maridi Portfolio Logo",
        },
      ],
      locale: locale === 'ar' ? "ar_AR" : "en_US",
      type: "website",
    },
    verification: {
      google: "RZ7in97l4Dude9irgKcPop_QJB5F8bQKb5mChRuV1tc", // 🔒 الحفاظ على رمز التحقق الأخضر الخاص بك في قوقل
    },
  };
}

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
    "url": "https://mohammedmaridi.com", // 🌐 تم تحديث الرابط هنا ليصبح دومينك الرسمي الجديد ليتطابق مع الفهرسة
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

        {/* 🚀 إضافة ميزة تتبع السرعة والأداء هنا بشكل سليم */}
        <SpeedInsights /> 
      </body>
    </html>
  );
}