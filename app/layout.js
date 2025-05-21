import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import Head from "next/head";

// export const metadata = {
//   title: "SpaceX Encyclopedia",
//   description: "Explore SpaceX launches, rockets, payloads, and more",
//   keywords: ["SpaceX", "rockets", "launches", "space exploration"],
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
