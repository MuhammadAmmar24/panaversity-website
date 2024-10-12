import type { Metadata } from "next";
import { Inter, Poppins, Rubik } from "next/font/google";
import "./globals.css";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  openGraph:{
    title: 'Panaversity',
    description: 'Learn Generative AI with AI-powered Panaversity.',
    images:[
      {
        url:`${siteUrl}/logoicon.png`
      }
    ]

  },
  title: {
    default: "Panaversity",
    template: "%s | Panaversity",
  },
  description: `Panaversity is revolutionizing AI education with cutting-edge
                programs in Generative AI and cloud computing, preparing you for the
                $100 trillion AI industry. Our hands-on programs combine advanced
                technology with essential skills and personalized coaching.
                Transform your ambition into success and lead in the AI-driven
                future.`,
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} ${rubik.variable} bg-background`}
      >
        {children}
        {modal}
      </body>
    </html>
  );
}
