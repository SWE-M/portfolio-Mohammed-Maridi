import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'المشاريع',
  type: 'document',
  fields: [
    defineField({ name: 'titleAr', title: 'اسم المشروع (عربي)', type: 'string', validation: rule => rule.required() }),
    defineField({ name: 'descriptionAr', title: 'وصف المشروع (عربي)', type: 'text', rows: 4 }),
    
    defineField({ name: 'titleEn', title: 'Project Title (English)', type: 'string' }),
    defineField({ name: 'descriptionEn', title: 'Project Description (English)', type: 'text', rows: 4 }),

    defineField({
      name: 'slug',
      title: 'الرابط المختصر',
      type: 'slug',
      options: { source: 'titleAr', maxLength: 96 },
      validation: rule => rule.required()
    }),
    defineField({ name: 'mainImage', title: 'صورة المشروع', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'technologies', title: 'التقنيات المستخدمة', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'link', title: 'رابط المشروع (إن وجد)', type: 'url' }),
  ],
})