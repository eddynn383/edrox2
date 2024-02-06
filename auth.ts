

import NextAuth, { DefaultSession, Session, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { JWT } from "next-auth/jwt";
import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/twoFactorConfirmation";

export type ExtendedUser = DefaultSession["user"] & {
    role: "ADMIN" | "USER"
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: "ADMIN" | "USER"
    }
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    emailVerified: new Date()
                }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            console.log({user})
            if (account?.provider !== "credentials") return true;
            
            if (!user.id) return false;
            const existingUser = await getUserById(user.id);

            if (!existingUser || !existingUser.emailVerified) {
                return false
            }

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

                console.log(twoFactorConfirmation)

                if (!twoFactorConfirmation) return false

                await db.twoFactorConfirmation.delete({
                    where: {
                        id: twoFactorConfirmation.id
                    }
                })
            }

            return true
        },
        async session({ session, token }: { session: Session, token?: JWT }) {
            console.log({ 
                sessionToken: token,
                session
            })

            if (session.user && token?.sub) {
                session.user.id = token?.sub
            }

            if (token?.role && session.user) {
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub)
            if(!existingUser) return token;
            
            token.role = existingUser.role

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt"
    },
    ...authConfig,
});
