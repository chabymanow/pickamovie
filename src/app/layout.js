import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import { Zen_Dots } from "next/font/google";
import "./globals.css";
import Header from "./components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const zenDots  = Zen_Dots({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-zen_dots",
  display: "swap",
});

export const metadata = {
  title: "Pick A Movie",
  description: "Pick a movie for tonight",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${zenDots .variable} antialiased`}>
      <body
        className="antialiased"
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
