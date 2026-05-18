"use client";

import SceneWrapper from '@/components/SceneWrapper';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image'; // 🚀 استيراد مكون الصور الذكي من Next.js

// إعدادات الحركة لظهور العناصر بنعومة
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
} as const;

export default function ClientHome({ projects, texts }: { projects: any[], texts: any }) {
  // حالات التحكم في الفورم
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // دالة الإرسال في الخلفية بدون الخروج من الموقع
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // نمنع المتصفح من الانتقال لصفحة أخرى
    setIsSubmitting(true);

    // 🚀 الحل هنا: حفظ نسخة من الفورم قبل أن ننتظر السيرفر
    const formTarget = e.currentTarget;
    const formData = new FormData(formTarget);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsSuccess(true);
        formTarget.reset(); // استخدام النسخة المحفوظة لتفريغ الحقول
        // إخفاء رسالة النجاح بعد 5 ثواني
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error("حدث خطأ أثناء الإرسال", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen text-white overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* الخلفية 3D */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-none">
        <SceneWrapper />
      </div>

      {/* قسم الترحيب مع أنيميشن الدخول السلس */}
      <section className="relative h-screen flex flex-col items-center justify-center p-4 text-center z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="px-6 py-12 md:px-16 md:py-24 rounded-[2.5rem] backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl max-w-4xl w-full"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-100"
          >
            {texts.heroTitle}
          </motion.h1>
          
          <motion.h2 
            variants={fadeInUp}
            className="text-base sm:text-2xl md:text-3xl text-gray-200 mb-6 font-medium"
          >
            {texts.heroSubtitle}
          </motion.h2>

          <motion.p 
            variants={fadeInUp}
            className="text-sm md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10 whitespace-pre-line"
          >
            {texts.heroDesc}
          </motion.p>

          <motion.div 
            variants={fadeInUp}
            className="flex flex-row gap-2 sm:gap-4 justify-center"
          >
            <a href="#projects" className="px-4 py-2 sm:px-8 sm:py-4 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs sm:text-base font-semibold hover:bg-emerald-500 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300">
              {texts.projectsTitle}
            </a>
            <a href="#contact" className="px-4 py-2 sm:px-8 sm:py-4 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs sm:text-base font-semibold hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300">
              {texts.contactBtn}
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* قسم المشاريع */}
      <section id="projects" className="relative z-10 py-32 px-4 md:px-6 max-w-7xl mx-auto">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-20 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
        >
          {texts.projectsTitle}
        </motion.h2>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 gap-3 md:gap-10"
        >
          {projects.map((project: any, index: number) => (
            <motion.div 
              key={project._id} 
              variants={fadeInUp}
              className="p-3 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:shadow-emerald-500/10 transition-all group overflow-hidden shadow-xl flex flex-col h-full"
            >
              {project.imageUrl && (
                /* 🚀 تم تحويل الحاوية لتدعم خاصية الـ fill مع الحفاظ على الأبعاد المستجيبة */
                <div className="overflow-hidden rounded-xl md:rounded-2xl mb-3 md:mb-6 flex items-center justify-center p-2 md:p-4 bg-black/10 shrink-0 relative w-full h-20 sm:h-32 md:h-48">
                  <Image 
                    src={project.imageUrl} 
                    alt={project.title} 
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-contain group-hover:scale-110 transition-transform duration-700" 
                    priority={index < 2} // تسريع تحميل أول مشروعين لتجاوز ترحيل تخطيط الصفحة (LCP)
                  />
                </div>
              )}
              
              <h3 className="text-sm sm:text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 leading-tight group-hover:text-emerald-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-[10px] sm:text-sm text-gray-400 mb-3 md:mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="mt-auto flex flex-col items-start w-full">
                <div className="flex flex-wrap gap-1 md:gap-2 w-full">
                  {project.technologies?.map((tech: string) => (
                    <span key={tech} className="text-[8px] md:text-xs font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-1 md:px-3 md:py-1.5 rounded-full mt-1">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-4 md:mt-6 inline-block text-[10px] md:text-sm text-emerald-400 hover:text-emerald-300 underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity">
                    زيارة المشروع ↗
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* قسم التواصل */}
      <section id="contact" className="relative z-10 py-32 px-4 md:px-6 max-w-5xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="rounded-[2rem] md:rounded-[3rem] backdrop-blur-2xl bg-white/5 border border-white/10 p-6 md:p-20 text-center shadow-2xl overflow-hidden relative"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            {texts.contactTitle}
          </h2>
          <p className="text-xs md:text-lg text-gray-400 mb-8 md:mb-12 max-w-md mx-auto">
            {texts.contactCta}
          </p>

          {/* كروت الواتساب */}
          <div className="grid grid-cols-2 gap-3 md:gap-8 mb-12 md:mb-16">
            <div className="p-4 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all flex flex-col items-center justify-between group hover:-translate-y-2 duration-300">
              <div className="mb-4 md:mb-8 text-center">
                <span className="text-[10px] md:text-sm text-emerald-400 block mb-1 md:mb-3 font-mono uppercase tracking-widest">{texts.saudi}</span>
                <a href="tel:+966504104065" className="text-[10px] sm:text-base md:text-3xl font-bold text-white block" dir="ltr">
                  +966 504 104065
                </a>
              </div>
              <a 
                href="https://wa.me/966504104065" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 md:gap-3 px-3 py-2 md:px-8 md:py-3.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all w-full justify-center mt-auto text-[10px] md:text-base group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <svg className="w-3 h-3 md:w-5 md:h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                {texts.whatsapp}
              </a>
            </div>

            <div className="p-4 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all flex flex-col items-center justify-between group hover:-translate-y-2 duration-300">
              <div className="mb-4 md:mb-8 text-center">
                <span className="text-[10px] md:text-sm text-[#8A1538]block mb-1 md:mb-3 font-mono uppercase tracking-widest">{texts.qatari}</span>
                <a href="tel:+97470197304" className="text-[10px] sm:text-base md:text-3xl font-bold text-white block" dir="ltr">
                  +974 7019 7304
                </a>
              </div>
              <a 
                href="https://wa.me/97470197304" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 md:gap-3 px-3 py-2 md:px-8 md:py-3.5 rounded-full bg-[#8A1538]/10 border border-[#8A1538]/30 text-[#8A1538] font-bold hover:bg-[#8A1538] hover:text-white hover:border-[#8A1538] transition-all w-full justify-center mt-auto text-[10px] md:text-base group-hover:shadow-[0_0_20px_rgba(138,21,56,0.4)]"
              >
                <svg className="w-3 h-3 md:w-5 md:h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                {texts.whatsapp}
              </a>
            </div>
          </div>

          {/* نموذج الطلب المباشر الديناميكي المربوط بـ React State */}
          <div className="w-full pt-8 md:pt-12 border-t border-white/10 mt-8">
            <h3 className="text-xl md:text-3xl font-bold mb-8 text-center text-white">
              {texts.formTitle}
            </h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl mx-auto relative">
              
              <input type="hidden" name="access_key" value="8254334f-0076-48b6-8df5-65f5ca866a28" />
              <input type="hidden" name="subject" value="🔥 طلب مشروع جديد من البورتفوليو!" />
              <input type="hidden" name="from_name" value="Portfolio System" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  name="Client_Name"
                  placeholder={texts.formName} 
                  className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:bg-white/5 transition-all duration-300" 
                  required
                />
                <input 
                  type="text" 
                  name="Contact_Info"
                  placeholder={texts.formContact} 
                  className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:bg-white/5 transition-all duration-300" 
                  required
                />
              </div>
              <textarea 
                name="Project_Details"
                placeholder={texts.formMessage} 
                rows={4} 
                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:bg-white/5 transition-all duration-300 resize-none"
                required
              ></textarea>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-white/10 border border-white/20 hover:bg-emerald-500 hover:border-emerald-500 text-white font-bold py-4 rounded-xl transition-all duration-500 mt-2 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] group flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">⏳ {texts.formSubmit} ...</span>
                ) : (
                  <>
                    {texts.formSubmit} <span className="inline-block transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 group-hover:-translate-y-1">🚀</span>
                  </>
                )}
              </button>

              {/* رسالة النجاح تظهر هنا بدون تحديث الصفحة */}
              {isSuccess && (
                <div className="absolute -bottom-16 left-0 right-0 text-center text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 py-2 rounded-lg">
                  ✅ تم الإرسال بنجاح! / Sent successfully!
                </div>
              )}
            </form>
          </div>

        </motion.div>
      </section>
      
      <footer className="relative z-10 py-10 text-center text-gray-500 text-[10px] md:text-sm">
        © {new Date().getFullYear()} {texts.copyright}
      </footer>
    </main>
  );
}