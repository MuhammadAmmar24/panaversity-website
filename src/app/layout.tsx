import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google"; 
import "./globals.css";
import Footer from "@/src/components/Footer"
import Navbar from "@/src/components/Navbar"


const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});


export const metadata: Metadata = {
  title: {
    default: 'Panaversity',
    template: '%s | Panaversity'
  },
  description: `Panaversity is revolutionizing AI education with cutting-edge
                programs in Generative AI and cloud computing, preparing you for the
                $100 trillion AI industry. Our hands-on programs combine advanced
                technology with essential skills and personalized coaching.
                Transform your ambition into success and lead in the AI-driven
                future.`
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}  bg-background`}>

        <Navbar />    
        {children}
        <Footer />

      </body>

    </html>
  );
}
