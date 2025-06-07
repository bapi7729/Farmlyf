import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./app/api/auth/[...nextauth]/options";
export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/",
    "/cart",
    "/products",
    "/upload-product",
  ],
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const admin = token?.admin;

  if (
    token &&
    (req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/sign-up")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!admin && req.nextUrl.pathname === "/upload-product") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && req.nextUrl.pathname === "/cart") {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  return NextResponse.next();
}
