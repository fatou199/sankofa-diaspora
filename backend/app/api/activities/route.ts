import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { ActivitySchema } from "@/lib/validations";
import { withErrorHandling } from "@/lib/api-wrapper";

export const GET = withErrorHandling(async () => {
    const activites = await prisma.activity.findMany({
        include: { city: true }
    });
    return NextResponse.json(activites);
});

export const POST = withErrorHandling(async (request: Request) => {
    const body = await request.json();
    
    // Validation Zod
    const validatedData = ActivitySchema.parse(body);

    const newActivite = await prisma.activity.create({
        data: validatedData,
    });

    return NextResponse.json(newActivite, { status: 201 });
});