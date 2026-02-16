import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const itineraires = await prisma.itineraire.findMany({
            include: {
                user: true,
                ville: true,
                details: true
            }
        });
        return NextResponse.json(itineraires);
    } catch (error: any) {
        return NextResponse.json(
            { error: "Erreur lors de la récupération des itinéraires", details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const itineraire = await prisma.itineraire.create({
            data: body
        });
        return NextResponse.json(itineraire, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Erreur lors de la création de l'itinéraire", details: error.message },
            { status: 400 }
        );
    }
}
