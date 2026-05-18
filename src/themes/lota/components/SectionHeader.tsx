"use client";

import { Icon } from "@iconify/react";

interface SectionHeaderProps {
  title: string;
  viewAllHref?: string;
}

export default function SectionHeader({ title, viewAllHref = "#" }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between w-full mb-4">
      <h2 className="text-white font-medium text-[40px] leading-[150%]">{title}</h2>
      <a href={viewAllHref} className="flex items-center gap-2 text-cream text-[20px] hover:opacity-70 transition-opacity">
        View All
        <Icon icon="iconoir:page-right" width="24" height="48" style={{ color: "#fbfbfb" }} />
      </a>
    </div>
  );
}
