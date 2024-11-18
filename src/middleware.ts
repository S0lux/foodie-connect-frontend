import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("access_token");
  console.log(cookie);

  return NextResponse.next();
}
