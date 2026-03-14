import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/api-wrapper";

export const GET = withErrorHandling(async () => {
  const cities = await prisma.city.findMany({
    include: {
      country: true,
      activities: true
    }
  });
  return NextResponse.json(cities);
});

export const POST = withErrorHandling(async (request: Request) => {
  const body = await request.json();
  if (body.countryId) body.countryId = Number(body.countryId);
  
  const newCity = await prisma.city.create({
    data: body,
  });
  return NextResponse.json(newCity, { status: 201 });
});
