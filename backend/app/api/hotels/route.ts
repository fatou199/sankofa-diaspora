import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const hotels = await prisma.hotel.findMany({
            include: {
                city: true
            }
        });
        return NextResponse.json(hotels);
    } catch (error: any) {
        return NextResponse.json(
            { error: "Erreur lors de la récupération des hôtels", details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const hotel = await prisma.hotel.create({
            data: body
        });
        return NextResponse.json(hotel, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Erreur lors de la création de l'hôtel", details: error.message },
            { status: 400 }
        );
    }
}
