import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kaiseki São Paulo — Omakase · Bold & Digital",
  description:
    "A 12-course omakase journey through Edomae tradition in the heart of São Paulo. Reservations by WhatsApp.",
};

// Root layout: html/body shell + fonts.
// Brand is locked to dark warm — theme script forces dark on every page
// so first paint matches design (no light-mode flash).
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      data-theme="dark"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        {/* Force dark theme on every load — brand is dark warm only */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}