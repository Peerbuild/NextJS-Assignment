import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/dbConnect";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(email => email.trim()) || [];

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,

    secret: process.env.AUTH_SECRET,
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            try {
               
                if (user) {
                    let dbUser = await prisma.user.findUnique({
                        where: { email: user.email ?? undefined }
                    });

                    if (!dbUser) {
                        dbUser = await prisma.user.create({
                            data: {
                                email: user.email,
                                name: user.name,
                                image: user.image,
                            },
                        });
                    }
                    token.id = dbUser.id;
                    token.email = dbUser.email;
                    token.name = dbUser.name;
                    token.isAdmin = adminEmails.includes(dbUser.email!);
                }
               
                return token;
            } catch (error) {
                console.error("Error in JWT callback:", error);
                return token;
            }
        },

        async session({ session, token }) {
            try {
                if (token) {
                    session.user.id = token.id as string;
                    session.user.email = token.email as string;
                    session.user.name = token.name as string;
                    session.user.isAdmin = token.isAdmin as boolean;
                }
                return session;
            } catch (error) {
                console.error("Error in Session callback:", error);
                return session;
            }
        },

        async redirect({ url, baseUrl }) {
            try {
                // We'll handle redirection in middleware
                return url.startsWith(baseUrl) ? url : baseUrl;
            } catch (error) {
                console.error("Error in Redirect callback:", error);
                return baseUrl;
            }
        },
    },
});