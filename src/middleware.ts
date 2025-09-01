// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Block these routes (redirect to home)
    const blockedRoutes = new Set(["/about", "/services", "/gallery", "/contact", "/booking", "/User_booking"]);
    if (blockedRoutes.has(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // Protect /admin (only allow role=admin)
    if (pathname.startsWith("/admin")) {
        const cookie = req.cookies.get("profile");
        if (!cookie) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        try {
            const profile = JSON.parse(cookie.value);
            if (profile?.role !== "admin") {
                return NextResponse.redirect(new URL("/", req.url));
            }
        } catch {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return NextResponse.next();
}

// Run middleware only on these routes
export const config = {
    matcher: ["/about", "/services", "/gallery", "/contact", "/booking", "/User_booking", "/admin/:path*"],
};
