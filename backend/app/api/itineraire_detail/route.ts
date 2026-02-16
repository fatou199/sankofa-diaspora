import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const details = await prisma.itineraireDetail.findMany({
            include: {
                itineraire: true,
                activites: { include: { activite: true } },
                restaurants: { include: { restaurant: true } }
            }
        });
        return NextResponse.json(details);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const detail = await prisma.itineraireDetail.create({ data: body });
        return NextResponse.json(detail, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
