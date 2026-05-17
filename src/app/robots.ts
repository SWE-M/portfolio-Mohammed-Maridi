import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio/', // منع أرشفة لوحة تحكم سانيتي لحماية الخصوصية
    },
    sitemap: 'https://portfolio-mohammed-maridi.vercel.app/sitemap.xml',
  }
}