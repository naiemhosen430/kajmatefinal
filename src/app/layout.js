"use client";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./_components/shared/Header";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import AuthContexProvider from "@/context/AuthContex";
import MessageContextProvider from "@/context/MessageContext";
import NotificationContextProvider from "@/context/NotificationContext";

// React Toastify Imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  // Importing the Toastify CSS

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
                <div className="min-h-screen bg-[#364050]">

                <Header />
                <div className="px-0">
                  {children}
                </div>
                </div>
              </ThemeProvider>
            </MessageContextProvider>
          </NotificationContextProvider>
        </AuthContexProvider>

        {/* Toast Container for global toasts */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  );
}
