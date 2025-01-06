"use client";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./_components/shared/Header";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import AuthContexProvider from "@/context/AuthContex";
import MessageContextProvider from "@/context/MessageContext";
import NotificationContextProvider from "@/context/NotificationContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata = {
//   title: "Amr Food",
//   description:
//     "Amr Food is a platform where you can buy and sell food around your area. We will d everything for you to make easy  your food business.",
// };

export default function RootLayout({ children }) {
  const theme = createTheme();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthContexProvider>
        <NotificationContextProvider>
        <MessageContextProvider>

          <ThemeProvider theme={theme}>
              <Header />
            <div className="px-0">
              {children}
            </div>
          </ThemeProvider>
        </MessageContextProvider>
        </NotificationContextProvider>
        </AuthContexProvider>
      </body>
    </html>
  );
}
