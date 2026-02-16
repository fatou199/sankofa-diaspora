import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { ActiviteSchema } from "@/lib/validations";
import { withErrorHandling } from "@/lib/api-wrapper";

export const GET = withErrorHandling(async () => {
    const activites = await prisma.activite.findMany({
        include: { ville: true }
    });
    return NextResponse.json(activites);
});

export const POST = withErrorHandling(async (request: Request) => {
    const body = await request.json();
    
    // Validation Zod
    const validatedData = ActiviteSchema.parse(body);

    const newActivite = await prisma.activite.create({
        data: validatedData,
    });

    return NextResponse.json(newActivite, { status: 201 });
});