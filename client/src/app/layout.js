import { Lato, Quicksand } from "next/font/google";
import "./globals.css";
import { RoutesProvider } from "./contexts/RoutesContex/RoutesContex";
import { ThemProvider } from "./contexts/theme/them";

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
      <body className={`${lato.variable} ${quick.variable} bg-white text-dark`}>
        <RoutesProvider>
          <ThemProvider>{children}</ThemProvider>
        </RoutesProvider>
      </body>
    </html>
  );
}
