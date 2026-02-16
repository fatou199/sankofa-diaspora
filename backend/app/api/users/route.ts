import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/api-wrapper";

export const GET = withErrorHandling(async () => {
  const users = await prisma.user.findMany({
    include: { origin_country: true }
  });
  const usersWithoutPassword = users.map(({ password, ...user }: any) => user);
  return NextResponse.json(usersWithoutPassword);
});
