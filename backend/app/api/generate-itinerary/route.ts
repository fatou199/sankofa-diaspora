import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get("authorization");
        const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

        if (!token) {
            return NextResponse.json({ error: "Authentification requise" }, { status: 401 });
        }

        const decoded = await verifyToken(token) as { userId: number };
        if (!decoded || !decoded.userId) {
            return NextResponse.json({ error: "Session invalide ou expirée" }, { status: 401 });
        }

        const body = await request.json();
        
        // On prépare les données pour Prisma avec les bonnes conversions de types
        const response = await prisma.itinerary.create({
            data: {
                startDate: new Date(body.startDate),
                endDate: new Date(body.endDate),
                adults: Number(body.adults),
                children: Number(body.children),
                budget: Number(body.budget),
                interests: body.interests, // On assume que les IDs envoyés correspondent aux enums
                userId: decoded.userId,
                countryId: body.countryId ? Number(body.countryId) : null,
                cityIds: body.cityIds ? body.cityIds.map((id: any) => Number(id)) : [],
                cities: {
                    connect: body.cityIds ? body.cityIds.map((id: any) => ({ id: Number(id) })) : []
                }
            }
        });

        return NextResponse.json({ 
            message: "Itinéraire enregistré avec succès", 
            data: response 
        }, { status: 201 });

    } catch (error: any) {
        console.error("Erreur Prisma:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}