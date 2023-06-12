"use client";

import { IModalContext, ModalContext } from "@/contexts/modal.service";
import "./globals.css";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modalContext, setModalContext] = useState<IModalContext>(
    {} as IModalContext
  );
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalContext.Provider
          value={{ modalContent: modalContext.modalContent, setModalContext }}
        >
          {children}
        </ModalContext.Provider>
      </body>
    </html>
  );
}
