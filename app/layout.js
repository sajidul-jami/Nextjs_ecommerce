
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import Navber from "@/app/components/Navber.js"
import Footer from "./components/Footer";
import { CartProvider } from "@/app/context/CartContext"; // Ensure correct path to CartContext
import { UserProvider } from './context/UserContext';  // Adjust the path to where your UserContext file is located

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quality and Trused Tech Products in Bangladesh",
  description: "Quality and Trused Tech Products in Banglades",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <UserProvider>
          <CartProvider>
            <Navber />
            {children}
            <Footer />
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
