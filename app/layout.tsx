import type { Metadata } from "next";
import "./globals.css";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fetch Take Home",
  description: "Find your new best friend!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-full">
      <body className={`${lato.variable} w-full m-0 p-0 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
