import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@/providers/themeProvider";

import "@/styles/globals.scss";
import "@/styles/theme.scss";
import "@/styles/sizes.scss";
import {ToggleProvider} from "@/context/toggleContext"
import { ConfettiProvider } from "@/providers/confettiProvider";
import { ToastProvider } from "@/providers/toasterProvider";
import { DeviceProvider } from "@/providers/deviceProvider";

const roboto = Roboto({ weight: ["300", "400", "700"], subsets: ['latin'] });

export const metadata: Metadata = {
    title: "Edrox",
    description: "The new generation of LMS",
};

export default function RootLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: {
        viewport: string
    }
}>) {
    console.log("My params: ", params)
    return (
        <html lang="en">
            <body className={roboto.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange >
                    {/* <DeviceProvider> */}
                        <ToggleProvider>
                            <ConfettiProvider />
                            <ToastProvider />
                            {children}
                        </ToggleProvider>
                    {/* </DeviceProvider> */}
                </ThemeProvider>
            </body>
        </html>
    );
}