import { NextRequest, NextResponse } from "next/server";
import { auth } from "./server/auth";

export async function middleware(request: NextRequest) {
  //   const session = await auth();
  const sessionToken = request.cookies.get("authjs.session-token")?.value;

  const path = request.nextUrl.pathname;

  const isAuthPath = path === "/auth/sign-in" || path === "/auth/sign-up";

  const isProtectedPath = path.startsWith("/app") && !isAuthPath;

  if (sessionToken && isAuthPath) {
    return NextResponse.redirect(
      new URL("/app/speech-synthesis/text-to-speech", request.url),
    );
  }

  if (!sessionToken && isProtectedPath) {
    const signInUrl = new URL("/auth/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/app/:path*"],
};
