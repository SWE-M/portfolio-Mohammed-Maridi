import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// تفعيل ملحق اللغات والترجمة
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**', // السماح برفع واستعراض صور سانيتي بأمان وسرعة
      },
    ],
  },
};

// تصدير الإعدادات مدمجة مع نظام اللغات
export default withNextIntl(nextConfig);