import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const sejours = await prisma.stay.findMany({
            include: {
                user: true,
                itinerary: true
            }
        });
        return NextResponse.json(sejours);
    } catch (error: any) {
        return NextResponse.json(
            { error: "Erreur lors de la récupération des séjours", details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const sejour = await prisma.stay.create({
            data: body
        });
        return NextResponse.json(sejour, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Erreur lors de la création du séjour", details: error.message },
            { status: 400 }
        );
    }
}
