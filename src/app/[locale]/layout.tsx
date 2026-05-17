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
    url: "https://portfolio-mohammed-maridi.vercel.app",
    siteName: "Mohammed Maridi Portfolio",
    images: [
      {
        url: "https://portfolio-mohammed-maridi.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Eng. Mohammed Maridi Portfolio Logo",
      },
    ],
    locale: "en_US",
    type: "website",
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

  return (
    <html lang={locale} dir={dir}>
      <body className="bg-slate-900 text-white min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}