import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@/providers/themeProvider";
// import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.scss";
import "@/styles/theme.scss";
import "@/styles/sizes.scss";
import {ToggleProvider} from "@/context/toggleContext"

const roboto = Roboto({ weight: ["300", "400", "700"], subsets: ['latin'] });

export const metadata: Metadata = {
    title: "Edrox",
    description: "The new generation of LMS",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        // <ClerkProvider>
            <html lang="en">
                <body className={roboto.className}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange >
                        <ToggleProvider>
                            {children}
                        </ToggleProvider>
                    </ThemeProvider>
                </body>
            </html>
        // </ClerkProvider>
    );
}