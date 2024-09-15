import NextAuth from "next-auth";

declare global {
    var isAdmin: boolean;
}
import { authConfig } from "@/lib/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/dbConnect";
import { PrismaClient } from "@prisma/client"; // Assuming PrismaClient is already setup

const prisma = new PrismaClient();

const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(email => email.trim()) || [];


export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            console.log("user", user);
            console.log("adminEmails", adminEmails);
            (globalThis as any).isAdmin = adminEmails.includes(user?.email!);
            console.log("this is global1", globalThis.isAdmin);
            console.log("this is global2", adminEmails.includes(user?.email!));
            if (user) {
                // Fetch user by email
                let dbUser = await prisma.user.findUnique({
                    where: { email: user?.email ?? undefined }
                });


                // If no user is found, create a new user in the database
                if (!dbUser) {
                    dbUser = await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name,
                            image: user.image,
                        },
                    });
                }

                // Set user data to the token
                token.id = dbUser.id;
                token.email = dbUser.email;
                token.name = dbUser.name;
                token.isAdmin = adminEmails.includes(dbUser.email!);
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                // Set token data in session object
                session.user.id = token.id?.toString() ?? "";
                session.user.email = token.email ?? "";
                session.user.name = token.name;
                session.user.isAdmin = token.isAdmin as boolean;
            }

            return session;
        },

        // Redirect after authentication
        async redirect({ url, baseUrl }) {
            console.log("this is global",globalThis.isAdmin); 
            if (globalThis.isAdmin === true) {
                
                return "/admin/header";
            }

            return baseUrl;
        },
    },
});
