// next-auth.d.ts
import NextAuth from "next-auth";
import { User as DefaultUser, Session as DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        isAdmin?: boolean;
    }

    interface Session {
        user: User;
    }
}
