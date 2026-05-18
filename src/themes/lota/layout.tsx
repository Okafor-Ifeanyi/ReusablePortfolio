import type { Metadata } from "next";
// import "./lota.css";

export const metadata: Metadata = {
  title: "Lotachukwu Oranu — Designer",
  description: "Product & Visual Designer solving problems with clean, beautiful design.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme='lota' id='lota-root'>
      <body className="bg-dark-bg">{children}</body>
    </div>
  );
}
