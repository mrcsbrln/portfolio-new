import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontend Developer | Marcus Hartmann",
  description: "Frontend Developer from Berlin",
  openGraph: {
    title: "Marcus Hartmann — Frontend Developer",
    description: "Frontend Developer from Berlin",
    url: "https://marcus-hartmann.net",
    siteName: "Marcus Hartmann",
    images: [
      {
        url: "https://marcus-hartmann.net/og-image.png",
        width: 1200,
        height: 630,
        alt: "Marcus Hartmann — Frontend Developer",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcus Hartmann — Frontend Developer",
    description: "Frontend Developer from Berlin",
    images: ["https://marcus-hartmann.net/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
