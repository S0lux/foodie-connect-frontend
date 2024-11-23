import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import http from "@/lib/http";

const privatePaths = ["/settings"];
const authPaths = ["/login", "/register"];
const headPaths = ["/head"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("access_token")?.value;

  // Function to redirect
  const redirect = (path: string) => {
    return NextResponse.redirect(new URL(path, request.url));
  };

  // Handle non-authenticated routes first
  if (!sessionToken) {
    // Redirect to login if trying to access private paths
    if (privatePaths.some((path) => pathname.startsWith(path))) {
      return redirect("/login");
    }
    // Allow access to auth paths and public routes
    return NextResponse.next();
  }

  // For authenticated users
  try {
    // Only verify session for protected routes and auth paths
    if (
      privatePaths.some((path) => pathname.startsWith(path)) ||
      authPaths.some((path) => pathname.startsWith(path)) ||
      headPaths.some((path) => pathname.startsWith(path))
    ) {
      const response = await http.get("v1/session", {
        headers: {
          Cookie: request.cookies.toString(),
        },
        // Add timeout to prevent hanging
        timeout: 5000,
      });

      const user = response.data;

      // Redirect normal users trying to access head paths
      if (
        user.type === "User" &&
        headPaths.some((path) => pathname.startsWith(path))
      ) {
        return redirect("/");
      }

      // Redirect authenticated users trying to access auth paths
      if (authPaths.some((path) => pathname.startsWith(path))) {
        return redirect("/");
      }
    }

    // Allow access to all other routes
    return NextResponse.next();
  } catch (error: any) {
    // Handle 401 Unauthorized
    if (error?.response?.status === 401) {
      // Clear invalid token cookie
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("access_token");
      return response;
    }

    // For other errors, allow request to continue but log error
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/settings", "/login", "/register", "/head/:path*"],
};
