import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import { Providers } from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: "Zeitblast - Real Estate SMS Marketing Platform",
  description: "Generate more leads and close more deals with automated SMS campaigns built for real estate professionals. High deliverability, compliance built-in, and powerful automation.",
  keywords: ["SMS marketing", "real estate", "lead generation", "text message marketing", "real estate wholesaling", "drip campaigns"],
  authors: [{ name: "Zeitblast" }],
  openGraph: {
    title: "Zeitblast - Real Estate SMS Marketing Platform",
    description: "Generate more leads and close more deals with automated SMS campaigns built for real estate professionals.",
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
