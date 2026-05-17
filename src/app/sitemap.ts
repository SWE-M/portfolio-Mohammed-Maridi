import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://portfolio-mohammed-maridi.vercel.app'

  // يمكنك مستقبلاً إعادة كلمة async ولف النوع بـ Promise عند جلب المشاريع من Sanity ديناميكياً
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/ar`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/en`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ]
}