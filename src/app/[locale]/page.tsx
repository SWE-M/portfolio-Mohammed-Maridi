import { getTranslations } from 'next-intl/server';
import { getProjects } from '@/sanity/lib/queries';
import ClientHome from './ClientHome';

// 🚀 تحسين السيو وسرعة الاستجابة (ISR): كاش ذكي يعيد بناء الصفحة في الخلفية كل ساعة (3600 ثانية)
// هذا السطر سيقضي على تأخير الـ TTFB ويجعل الموقع يفتح فوراً في أجزاء من الملي ثانية ويرفع السكور لـ +90
export const revalidate = 3600;

export default async function HomePage({ params }: any) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  // جلب البيانات من السيرفر بسلاسة
  const t = await getTranslations({ locale });
  const projects = await getProjects(locale);

  // تجميع النصوص لتمريرها بدون أخطاء للملف التفاعلي
  const texts = {
    heroTitle: t('HomePage.title'),
    heroSubtitle: t('HomePage.subtitle'),
    heroDesc: t('HomePage.description'),
    contactBtn: t('HomePage.contactButton'),
    projectsTitle: t('Projects.title'),
    contactTitle: t('Contact.title'),
    contactCta: t('Contact.cta'),
    saudi: t('Contact.saudi'),
    qatari: t('Contact.qatari'),
    whatsapp: t('Contact.whatsapp'),
    copyright: t('Footer.copyright'),
    
    // النصوص الجديدة الخاصة بنموذج الطلب المباشر
    formTitle: t('Contact.formTitle'),
    formName: t('Contact.formName'),
    formContact: t('Contact.formContact'),
    formMessage: t('Contact.formMessage'),
    formSubmit: t('Contact.formSubmit')
  };

  return <ClientHome projects={projects} texts={texts} />;
}