import type { Metadata } from "next";
import "./bio.css";
import { ThemeProvider } from "./components/theme.provider";

export const metadata: Metadata = {
  title: "Ifeanyi Okafor — Fullstack Developer",
  description:
    "Full-Stack Software Engineer building practical, scalable products across e-commerce, fintech, and e-learning.",
  keywords: ["fullstack", "developer", "NestJS", "React", "TypeScript", "Node.js"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-theme="bio" id="bio-root">
        <ThemeProvider>{children}</ThemeProvider>
    </div>
  );
}