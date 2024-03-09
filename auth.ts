

import NextAuth, { DefaultSession, Session, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { JWT } from "next-auth/jwt";
import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/twoFactorConfirmation";
import { getAccountByUserId } from "./data/account";

export type ExtendedUser = DefaultSession["user"] & {
    role: "ADMIN" | "USER";
    isOAuth?: boolean;
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
        isOAuth: boolean;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: "ADMIN" | "USER";    
        isOAuth: boolean;
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
            // console.log("SIGNIN CB: ", {user})
            if (account?.provider !== "credentials") return true;
            
            if (!user.id) return false;
            const existingUser = await getUserById(user.id);

            if (!existingUser || !existingUser.emailVerified) {
                return false
            }

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

                // console.log("TFC SIGNIN CB: ",twoFactorConfirmation)

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
            // console.log("SESSION: ", { 
            //     sessionToken: token,
            //     session
            // })

            if (session.user && token?.sub) {
                session.user.id = token?.sub
            }

            if (token?.role && session.user) {
                session.user.role = token.role;
            }

            if (session.user) {
                session.user.name = token?.name;
                session.user.email = token?.email;
                session.user.isOAuth = token?.isOAuth;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub)
            console.log("JWT: ", existingUser)
            if(!existingUser) return token;

            const existingAccount = await getAccountByUserId(existingUser.id);
            
            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt"
    },
    ...authConfig,
});
