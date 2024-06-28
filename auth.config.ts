import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  // Auth Secret
  secret: process.env.AUTH_SECRET,

  // satisfies NextAuthConfig, info supplied in auth.ts
  // Login Providers
  providers: [],

  callbacks: {
    /**
     * Checks if the user is authorized to access the requested page.
     * Used by MiddleWare
     */
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
  },
} satisfies NextAuthConfig;
export default authConfig;
