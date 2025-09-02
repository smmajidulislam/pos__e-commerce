import { NextResponse } from "next/server";

export async function GET(req) {
  const accessToken = req.cookies.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  // decode token, fetch user, etc.
  return NextResponse.json({ user: { id: "123", name: "John" }, accessToken });
}
