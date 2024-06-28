import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";

export const config = {
  providers: [Github],
  callbacks: {
    async authorized({ auth, request }) {
      const // Check if the user is authenticated
        isUserAuthenticated = !!auth?.user,
        // Initialize protected routes
        isAuthRequired = !request.nextUrl.pathname.startsWith(
          "https://rushil-ecommerce-store.vercel.app/api/auth/signin?callbackUrl=https://rushil-ecommerce-store.vercel.app/api/auth/callback/github"
        );

      // If the route is protected
      return isAuthRequired
        ? // Check if the user is authenticated; return true if the user is authenticated, false otherwise
          isUserAuthenticated
          ? true
          : false
        : // If the route is not protected
        isUserAuthenticated && request.nextUrl.pathname.startsWith("/login")
        ? // and the user is authenticated, redirect to the specified page
          Response.redirect(new URL("/", request.nextUrl).toString())
        : // and the user is not authenticated, return true
          true;
    },
    jwt({ token, user, profile }) {
      if (user && profile) {
        console.log("jwt", user, profile);
        return { ...token, user, profile };
      }
      console.log("jwt after sign in", token);
      return token;
    },
    session({ session, token }) {
      console.log("session", session, token);
      return { ...session, user: { ...session.user, ...token } };
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
