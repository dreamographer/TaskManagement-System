import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const poppins = Poppins({
  weight: ["300", "400", "700", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Management",
  description: "Real time task mangement system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children} <ToastContainer />
      </body>
    </html>
  );
}
