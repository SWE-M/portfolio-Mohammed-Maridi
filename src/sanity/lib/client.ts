import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // 🚀 تفعيل الكاش لشبكة Sanity للحصول على البيانات في أجزاء من الثانية
  useCdn: true, 
})