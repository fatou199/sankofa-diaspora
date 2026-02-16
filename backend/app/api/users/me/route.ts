import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { withErrorHandling } from "@/lib/api-wrapper";

export const GET = withErrorHandling(async (request: Request) => {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const decoded = await verifyToken(token) as { userId: number };
  
  if (!decoded || !decoded.userId) {
    return NextResponse.json({ error: "Token invalide" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    include: { origin_country: true }
  });

  if (!user) {
    return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
  }

  const { password, ...userWithoutPassword } = user;
  return NextResponse.json(userWithoutPassword);
});
