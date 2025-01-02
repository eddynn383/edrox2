import { NextRequest, NextResponse, userAgent } from 'next/server'
import useDeviceType from "@/hooks/useDeviceType"
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes"
import { useContext } from 'react';
import { DeviceContext } from './providers/deviceProvider';

const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
    const { nextUrl } = req;
    const { device } = userAgent(req)
    const isMobile = device.type === 'mobile'
    const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
    if (!nextUrl.searchParams.has('viewport')) {
        nextUrl.searchParams.set('viewport', viewport)
        return NextResponse.redirect(nextUrl)
    }
    console.log("MIDDLEWARE PATH: ", nextUrl.pathname.includes("edit/content"))

    if (nextUrl.pathname.includes("management/courses") && nextUrl.pathname.includes("edit/content")) {
        if (!nextUrl.searchParams.has('playlist')) {
            nextUrl.searchParams.set('playlist', "on")
            return NextResponse.redirect(nextUrl)
        }
    }

    const isLoggedIn = !!req.auth;

    // console.log("IS MOBILE: ", isMobile)
    // console.log("Next URL: ", nextUrl)



    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    // console.log("isApiAuthRoute: ", isApiAuthRoute)
    // console.log("isPublicRoute: ", isPublicRoute)
    // console.log("isAuthRoute: ", isAuthRoute)

    if (isApiAuthRoute) return null

    if (isAuthRoute) {
        // console.log("auth route if is checked")
        if (isLoggedIn) {
            // console.log("logged in if checked")
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
    }

    if (isMobile) {
        return NextResponse.rewrite(nextUrl)
    }


});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
