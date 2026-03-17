import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { TPropsWithChildren } from "@/constants/types";
import StyledComponentsRegistry from "@/providers/StyledComponentsRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Millionaire",
  description: `Game "How become a millionaire?"`,
  icons: {
    icon: "/icons/favicon.svg",
  },
};

export default async function RootLayout({ children }: TPropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
