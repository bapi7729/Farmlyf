import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/header";
import Footer from "@/components/footer";
import AuthProvider from "@/context/AuthProvider";
import { ProductsContextProvider } from "@/context/productContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Farmlyf - Premium Dry Fruits & Nuts",
  description:
    "Pure, Nutritious, and Delicious Dry Fruits sourced from the finest farms",
  icons: {
    icon: "/farmlyf short logo.jpg",
    shortcut: "/farmlyf short logo.jpg",
    apple: "/farmlyf short logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProductsContextProvider>
      <AuthProvider>
        <html lang="en" suppressHydrationWarning>
          <head>
            <link rel="icon" href="/farmlyf short logo.jpg" type="image/jpeg" />
            <link rel="shortcut icon" href="/farmlyf short logo.jpg" type="image/jpeg" />
            <link rel="apple-touch-icon" href="/farmlyf short logo.jpg" />
          </head>
          <body className={`overflow-x-hidden max-w-screen`}>
            <Header />
            <main className="min-h-[calc(100vh-140px)]">{children}</main>
            <Footer />
          </body>
        </html>
      </AuthProvider>
    </ProductsContextProvider>
  );
}
