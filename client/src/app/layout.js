import "./globals.css";
import { Lato, Quicksand } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lato",
});
const quick = Quicksand({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-quick",
});

export const metadata = {
  title: "Nest Mart Clone",
  description:
    "Mobile-first Nest Mart style homepage built with Next.js & Tailwind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} ${quick.variable} font-lato bg-white text-darkText`}
      >
        {children}
      </body>
    </html>
  );
}
