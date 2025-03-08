// app/layout.tsx
import type { Metadata } from "next";
import { Providers } from "@/components/Provider";
import { AuthProvider } from '@/context/AuthContext'; // Import AuthProvider
import "./globals.css";

export const metadata: Metadata = {
  title: "Sri Sai Enterprises",
  description: "Sri Sai Enterprises offers the best corporate gifting solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <Providers>
            <AuthProvider>{children}</AuthProvider> {/* Wrap with AuthProvider */}
          </Providers>
        </div>
      </body>
    </html>
  );
}