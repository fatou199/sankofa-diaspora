import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/api-wrapper";
import { verifyToken } from "@/lib/auth";

export const GET = withErrorHandling(async (request: Request) => {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

    let userId: number | undefined;
    if (token) {
        try {
            const decoded = await verifyToken(token) as { userId: number };
            userId = decoded.userId;
        } catch (e) {
            // Token invalide, on ne filtre pas (ou on renvoie erreur selon besoin)
        }
    }

    const itineraires = await prisma.itinerary.findMany({
        where: userId ? { userId } : undefined,
        include: {
            user: true,
            details: true,
            cities: true,
            country: true
        },
        orderBy: {
            startDate: 'asc'
        }
    });
    return NextResponse.json(itineraires);
});

export const POST = withErrorHandling(async (request: Request) => {
    const body = await request.json();
    const itineraire = await prisma.itinerary.create({
        data: body
    });
    return NextResponse.json(itineraire, { status: 201 });
});
