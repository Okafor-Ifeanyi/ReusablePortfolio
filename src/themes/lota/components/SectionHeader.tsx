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
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M10 4l6 6-6 6" stroke="#FFFAEF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}
