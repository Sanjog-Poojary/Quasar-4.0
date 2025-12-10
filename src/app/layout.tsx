import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "AMEP - Adaptive Mastery & Engagement Platform",
  description: "Next-generation EdTech platform for personalized learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
