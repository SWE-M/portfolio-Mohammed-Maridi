import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* إعدادات المشروع الافتراضية هنا */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**', // السماح بجميع مسارات الصور القادمة من سانيتي
      },
    ],
  },
};

export default nextConfig;