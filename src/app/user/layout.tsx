"use client";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "@/context/AuthProvider";
import { useEffect } from "react";
import axios from "axios";
import SideNav from "./SideNav";

const Component = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { setUser } = useAuth();
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    const res = await axios.get("/api/auth/verifytoken");
    if (res.data) {
      setUser(res.data.user);
    }
  };
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
        <SideNav>{children}</SideNav>
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
