"use client";
import { motion } from 'framer-motion';

interface ProjectProps {
  name: string;
  desc: string;
  tech: string;
}

export default function ProjectCard({ name, desc, tech }: ProjectProps) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="p-6 rounded-3xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 group"
    >
      <h3 className="text-2xl font-bold text-emerald-400 mb-3">{name}</h3>
      <p className="text-gray-300 mb-4 leading-relaxed">{desc}</p>
      <div className="flex flex-wrap gap-2">
        {tech.split(',').map((item, index) => (
          <span key={index} className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-gray-400 group-hover:text-emerald-300 transition-colors">
            {item.trim()}
          </span>
        ))}
      </div>
    </motion.div>
  );
}