import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import { Providers } from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: "Intello Blast - Intelligent SMS Marketing for Growth",
  description: "Scale your business with intelligent SMS campaigns. AI-powered targeting, automated workflows, and real-time analytics. Built for businesses that want to grow smarter.",
  keywords: ["SMS marketing", "intelligent marketing", "automated SMS", "business growth", "lead generation", "text message marketing", "marketing automation", "customer engagement"],
  authors: [{ name: "Intello Blast" }],
  openGraph: {
    title: "Intello Blast - Intelligent SMS Marketing for Growth",
    description: "Scale your business with intelligent SMS campaigns. AI-powered targeting, automated workflows, and real-time analytics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
