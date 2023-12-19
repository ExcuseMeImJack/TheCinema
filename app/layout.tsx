// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Providers } from "./providers";
import App from "./App";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "WATCHBOXD";
const description =
  "This is a Next.js starter kit that uses Next-Auth for simple email + password login and a Postgres database to persist the data.";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  // console.log(session)
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Providers>
          <Toaster />
            <App>
              {children}
            </App>
        </Providers>
      </body>
    </html>
  );
}
