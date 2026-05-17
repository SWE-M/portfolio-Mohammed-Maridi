import { client } from './client';

export async function getProjects(locale: string) {
  const query = `*[_type == "project"] | order(_createdAt desc) {
    _id,
    "title": select('${locale}' == 'ar' => titleAr, titleEn),
    "description": select('${locale}' == 'ar' => descriptionAr, descriptionEn),
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
    technologies,
    link
  }`;
  
  return client.fetch(query);
}