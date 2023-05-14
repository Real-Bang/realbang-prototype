import { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Providers from "./providers";

const Pretandard = localFont({
  src: "./assets/fonts/Pretandard/woff2/PretendardVariable.woff2",
});

export const metadata: Metadata = {
  title: "릴방",
  description: "릴방",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={Pretandard.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
