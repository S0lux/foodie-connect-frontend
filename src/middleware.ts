import authAction from "@/apis/auth.api";
import http from "@/lib/http";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/settings"];
const authPaths = ["/login", "/register"];
const headPaths = ["/head"];
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionToken = request.cookies.get("access_token")?.value;

  if (sessionToken) {
    const user = await http
      .get("v1/session", {
        headers: {
          Cookie: request.cookies.toString(),
        },
      })
      .then((res) => res.data);

    if (
      user.type === "User" &&
      headPaths.some((path) => pathname.startsWith(path))
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Chưa đăng nhập thì không cho vào private paths
  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // Đăng nhập rồi thì không cho vào login/register nữa
  if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/settings", "/login", "/register", "/head/:path*"],
};
