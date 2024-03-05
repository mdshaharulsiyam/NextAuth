import "./globals.css";
import { Inter } from "next/font/google";
import Navber from "@/Components/Shared/Navber/Navber";
import NextAuthProvider from "@/Providers/NextAuthProvider/NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "authentication with next auth",
  description: "next auth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider >
          <Navber />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
export const runtime = 'edge'