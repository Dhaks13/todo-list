import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./page"
import { Main } from "./page";
import { Footer } from "./page";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToDo-List App",
  description: "Manage your tasks with this simple to-do list app.",
  icons: ["favicon.ico","totdo_logo.png"]
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Header />
      <Main />
      <Footer />
      </body>
    </html>
  );
}
