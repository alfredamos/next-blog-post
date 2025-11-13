import './globals.css';
import { Inter } from 'next/font/google';
import React from "react";
import {Metadata} from "next";
import NavBar from "@/app/NavBar";
import AuthContext from "@/app/authContext";
import NavigationBar from "@/app/NavigationBar";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Blog',
    description: 'This is an exciting blog app.',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <AuthContext>
            <html lang="en">
            {/*<body className={inter.className}>*/}
                <body className="bg-white min-h-screen text-black dark:text-white">
                    <NavigationBar/>
                    {children}
                </body>
            </html>
        </AuthContext>
    );
}