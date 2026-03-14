import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function proxy (request: NextRequest) {
  const publicPaths = [
    "/api/users/login",
    "/api/users/register",
    "/api/countries",
    "/api/cities"
  ];

  const path = request.nextUrl.pathname;

  // On laisse passer les routes publiques ou les méthodes GET (sauf pour les users)
  const isPublicPath = publicPaths.some(p => path.startsWith(p));
  const isPublicGet = request.method === "GET" && !path.startsWith("/api/users");

  if (isPublicPath || isPublicGet) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

  if (!token) {
    return NextResponse.json(
      { error: "Authentification requise" },
      { status: 401 }
    );
  }

  const verified = await verifyToken(token);

  if (!verified) {
    return NextResponse.json(
      { error: "Token invalide ou expiré" },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
