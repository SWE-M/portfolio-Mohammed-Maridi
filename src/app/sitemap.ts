import { MetadataRoute } from 'next'

export default async function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://portfolio-mohammed-maridi.vercel.app'

  // يمكنك مستقبلاً جلب روابط المشاريع من Sanity ديناميكياً هنا إذا رغبت
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/ar`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/en`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ]
}