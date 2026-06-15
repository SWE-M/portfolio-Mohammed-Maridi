import React from 'react';

type Props = {
  params: Promise<{ locale: string }>;
};

// 🔒 التصدير الافتراضي الأساسي (Default Export) لحل مشكلة الـ Module
export default async function PrivacyPolicy({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="min-h-screen py-20 px-4 max-w-4xl mx-auto text-white">
      {locale === 'ar' ? (
        <article dir="rtl" className="space-y-6">
          <h1 className="text-3xl font-bold text-teal-400">سياسة الخصوصية</h1>
          <p className="text-gray-300 leading-relaxed">
            يسر موقع المهندس محمد احمد مريدي إبلاغ زواره الكرام بأننا نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربة التصفح وعرض إعلانات مخصصة تدار عبر شبكة Google AdSense.
          </p>
          <p className="text-gray-300 leading-relaxed">
            نحن لا نجمع أو نشارك بياناتكم الشخصية مع أي أطراف خارجية. تهدف هذه السياسة لتلبية معايير وقوانين النشر والإعلان الرقمي العالمية.
          </p>
        </article>
      ) : (
        <article dir="ltr" className="space-y-6">
          <h1 className="text-3xl font-bold text-teal-400">Privacy Policy</h1>
          <p className="text-gray-300 leading-relaxed">
            The official portfolio of Eng. Mohammed Ahmed Maridi informs our valued visitors that we use cookies to enhance the browsing experience and display personalized advertisements managed through Google AdSense.
          </p>
          <p className="text-gray-300 leading-relaxed">
            We do not collect or share your personal data with any third parties. This policy is designed to comply with digital advertising standards.
          </p>
        </article>
      )}
    </div>
  );
}