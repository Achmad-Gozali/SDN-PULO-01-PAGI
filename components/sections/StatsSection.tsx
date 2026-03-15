"use client";

import React from "react";
import { motion } from "motion/react";
import { stats } from "@/lib/home-data";
import { Users, GraduationCap, Trophy, Award } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Users,
  GraduationCap,
  Trophy,
  Award,
};

export default function StatsSection() {
  return (
    <section className="py-20 px-6 bg-white relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.iconName];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-blue-700 hover:border-blue-600 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-700/20"
              >
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-blue-100 text-blue-700 group-hover:bg-white/20 group-hover:text-white transition-colors">
                  {IconComponent && <IconComponent size={32} />}
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-slate-900 group-hover:text-white transition-colors mb-2">
                    {stat.value}
                  </span>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider group-hover:text-blue-100 transition-colors">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}