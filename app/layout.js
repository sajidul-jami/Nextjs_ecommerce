import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import Navber from "@/app/components/Navber.js"
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quality and Trused Tech Products in Bangladesh",
  description: "Quality and Trused Tech Products in Banglades",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <Navber />
        {children}
        <Footer />
      </body>
    </html>
  );
}
