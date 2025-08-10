import { Lato, Quicksand } from "next/font/google";
import Head from "next/head";
import Header from "./components/global/Header";
import "./globals.css";

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
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/2.5.0/uicons-regular-straight/css/uicons-regular-straight.css"
        />
      </Head>
      <body
        className={`${lato.variable} ${quick.variable} font-lato bg-white text-darkText`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
