"use client";
import "../globals.css";
import Navbar from "@/Components/Navbar";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthProvider";

const Component = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" data-theme="forest">
      <head>
        <title>IntelliMark | Why remember when you can save?</title>
        <meta
          name="description"
          content="IntelliMark is a powerful Chrome extension and web app that automatically saves YouTube links when you save them on YouTube. With a secure login system, users can access all their saved videos anytime from our website. Perfect for organizing favorite content, study materials, and entertainment playlists in one place!"
        />
      </head>
      <body className={`antialiased`}>
        <Toaster />
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Component>{children}</Component>
    </AuthProvider>
  );
}
