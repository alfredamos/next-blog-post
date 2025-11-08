import './globals.css';
import { Inter } from 'next/font/google';
import React from "react";
import {Metadata} from "next";
import NavBar from "@/app/NavBar";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'My Next.js App',
    description: 'A basic Next.js application.',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        {/*<body className={inter.className}>*/}
        <body className="bg-white min-h-screen text-black dark:text-white">
        <NavBar/>
        {children}
        </body>
        </html>
    );
}