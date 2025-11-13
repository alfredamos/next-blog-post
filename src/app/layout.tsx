import './globals.css';
import { Inter } from 'next/font/google';
import React from "react";
import {Metadata} from "next";
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

        <html lang="en">
            {/*<body className={inter.className}>*/}
            <AuthContext>
                <body className="bg-white min-h-screen text-black dark:text-white">
                    <NavigationBar/>
                    {children}
                </body>
            </AuthContext>
        </html>

    );
}