import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { ThemeProvider } from "@/context/ThemeContext";

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
        <ThemeProvider>
          <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <main style={{ 
              flex: 1, 
              marginLeft: '280px', 
              display: 'flex', 
              flexDirection: 'column',
              position: 'relative'
            }}>
              <Header title="Dashboard" />
              <div style={{ padding: '0 40px 40px 40px' }}>
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
