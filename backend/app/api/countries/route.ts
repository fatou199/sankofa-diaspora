import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/api-wrapper";

export const dynamic = 'force-dynamic';

export const GET = withErrorHandling(async () => {
  const countries = await prisma.country.findMany({
    include: { cities: true }
  });
  return NextResponse.json(countries);
});

export const POST = withErrorHandling(async (request: Request) => {
  const body = await request.json();
  const newCountry = await prisma.country.create({
    data: body,
  });
  return NextResponse.json(newCountry, { status: 201 });
});
