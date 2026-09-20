import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Oussama Yinssi — Software Engineer",
  description: "Portfolio of Oussama Yinssi. Distributed systems, web engineering, and software projects.",
  icons: {
    icon: "/OY.png",
    shortcut: "/OY.png",
    apple: "/OY.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('oy_theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme','dark');}else{document.documentElement.classList.remove('dark');document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased font-serif bg-paper text-ink selection:bg-ink selection:text-paper">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
