import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Drun. | Luxury Handcrafted Peshawari Footwear",
  description:
    "Crafted by tradition. Worn with distinction. Discover bespoke Peshawari footwear where timeless Pakistani craftsmanship meets contemporary elegance.",
  keywords: [
    "Peshawari Chappal",
    "Luxury Peshawari Shoes",
    "Drun Footwear",
    "Handmade Leather Chappal",
    "Kaptaan Chappal",
    "Norozi Chappal",
    "Charsadda Chappal",
    "Pakistani Footwear",
  ],
  openGraph: {
    title: "Drun. | Luxury Handcrafted Peshawari Footwear",
    description: "Crafted by tradition. Worn with distinction.",
    url: "https://drun.pk",
    siteName: "Drun.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${plusJakartaSans.variable} ${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#031A16] text-[#F6F5F0]">
        <AuthProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <AuthModal />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
