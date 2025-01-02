import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@/providers/themeProvider";

import "@/styles/globals.scss";
import "@/styles/theme.scss";
import "@/styles/sizes.scss";
import { ToggleProvider } from "@/context/toggleContext"
import { ConfettiProvider } from "@/providers/confettiProvider";
import { ToastProvider } from "@/providers/toasterProvider";
import { DeviceProvider } from "@/providers/deviceProvider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "@/components";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import ProgressProvider from "@/providers/progressProvider";


type Params = Promise<{
    viewport: string
}>
interface RootLayoutProps {
    children: React.ReactNode;
    params: Params;
}

const roboto = Roboto({ weight: ["300", "400", "500", "700"], subsets: ['latin'] });

export const metadata: Metadata = {
    title: "Edrox",
    description: "The new generation of LMS",
};

export default async function RootLayout(props: RootLayoutProps) {
    const children = props.children
    const params = await props.params
    // console.log("My params: ", params)
    return (
        <html lang="en">
            <body className={roboto.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange >
                    {/* <DeviceProvider> */}
                    <ProgressProvider>
                        <ToggleProvider>
                            <ConfettiProvider />
                            <ToastProvider />
                            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
                            {children}
                            <Toaster />
                        </ToggleProvider>
                    </ProgressProvider>
                    {/* </DeviceProvider> */}
                </ThemeProvider>
            </body>
        </html>
    );
}