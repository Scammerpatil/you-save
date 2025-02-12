import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const origin = req.headers.get("origin");
  res.headers.set(
    "ACCESS-CONTROL-ALLOW-ORIGIN",
    origin || "http://localhost:3006"
  );
  res.headers.set("ACCESS-CONTROL-ALLOW-METHODS", "GET, POST, PUT, DELETE");
  res.headers.set("ACCESS-CONTROL-ALLOW-HEADERS", "Content-Type");
  res.headers.set("ACCESS-CONTROL-ALLOW-CREDENTIALS", "true");
  return res;
}

export const config = {
  matcher: ["/api/:path*"],
};
