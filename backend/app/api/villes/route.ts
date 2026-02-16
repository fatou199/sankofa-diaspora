import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/api-wrapper";

export const GET = withErrorHandling(async () => {
  const villes = await prisma.villes.findMany({
    include: {
      pays: true,
      activites: true
    }
  });
  return NextResponse.json(villes);
});

export const POST = withErrorHandling(async (request: Request) => {
  const body = await request.json();
  if (body.pays_id) body.pays_id = Number(body.pays_id);
  
  const newVille = await prisma.villes.create({
    data: body,
  });
  return NextResponse.json(newVille, { status: 201 });
});
