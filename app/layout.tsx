import "./globals.css";
import Header from "@/components/Header";
import ContextAPI from "@/context/context";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogger | Discover and Share Blogs",
  description: "Explore a wide range of blogs on Blogger, the platform where users can create, share, and engage with diverse content from all over the world.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <ContextAPI>
        <body>
          <Header/>
          <main>
          {children}
          </main>
          <div className="h-2 bg-gradient-to-r from-[#F7E16A] to-[#AE6CE3]"></div>
          <Footer/>
        </body>
      </ContextAPI>
    </html>
  );
}
