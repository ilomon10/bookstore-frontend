import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/nprogress/styles.css";
import "./globals.css";

import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { NavigationProgress } from '@mantine/nprogress';

import { QueryProvider } from "@/components/provider/ReactQuery";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <QueryProvider>
          <MantineProvider>
            <NavigationProgress />
            {children}
          </MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
