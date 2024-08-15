import { Inter } from "next/font/google";
import "./globals.css";
import { CryptoProvider } from "@/app/context/CryptoContext";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crypto-project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CryptoProvider>
          <Header />
          <main style={{backgroundColor:`rgba(24, 25, 27, 1)`}}>{children}</main>
        </CryptoProvider>
      </body>
    </html>
  );
}
