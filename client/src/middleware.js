import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token_type")?.value;
  console.log(token);

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/shop"],
};
