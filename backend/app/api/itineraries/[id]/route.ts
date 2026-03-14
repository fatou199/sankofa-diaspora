import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/api-wrapper";

export const GET = withErrorHandling(async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const itineraire = await prisma.itinerary.findUnique({
        where: { id },
        include: { 
            user: true, 
            details: { 
                include: { 
                    activities: { include: { activity: true } }, 
                    restaurants: { include: { restaurant: true } } 
                } 
            } 
        }
    });
    if (!itineraire) return NextResponse.json({ error: "Itinéraire non trouvé" }, { status: 404 });
    return NextResponse.json(itineraire);
});

export const PUT = withErrorHandling(async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const body = await request.json();
    const itineraire = await prisma.itinerary.update({
        where: { id },
        data: body
    });
    return NextResponse.json(itineraire);
});

export const DELETE = withErrorHandling(async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    await prisma.itinerary.delete({ where: { id } });
    return NextResponse.json({ message: "Itinéraire supprimé" });
});
