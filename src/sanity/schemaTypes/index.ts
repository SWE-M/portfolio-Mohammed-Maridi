import { type SchemaTypeDefinition } from 'sanity'
import project from './project' // استدعاء ملف المشاريع اللي سويناه

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project], // إضافة المشاريع للقائمة
}