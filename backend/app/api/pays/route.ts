import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/api-wrapper";

export const GET = withErrorHandling(async () => {
  const pays = await prisma.pays.findMany({
    include: { villes: true }
  });
  return NextResponse.json(pays);
});

export const POST = withErrorHandling(async (request: Request) => {
  const body = await request.json();
  const newPays = await prisma.pays.create({
    data: body,
  });
  return NextResponse.json(newPays, { status: 201 });
});
