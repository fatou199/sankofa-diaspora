import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/api-wrapper";

export const GET = withErrorHandling(async (request: Request, { params }: { params: Promise<{id: string}> }) => {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const activite = await prisma.activity.findUnique({
        where: { id },
        include: { city: true }
    });

    if (!activite) {
        return NextResponse.json(
            { error: "Activité non trouvée" },
            { status: 404 }
        );
    }
    return NextResponse.json(activite);
});

export const PUT = withErrorHandling(async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const body = await request.json();
    const activite = await prisma.activity.update({
        where: { id },
        data: body
    });
    return NextResponse.json(activite);
});

export const DELETE = withErrorHandling(async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    await prisma.activity.delete({
        where: { id },
    });
    return NextResponse.json({ message: "Activité supprimée" });
});