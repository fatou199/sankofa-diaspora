import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const relations = await prisma.itineraireActivite.findMany({
            include: { itineraire_detail: true, activite: true }
        });
        return NextResponse.json(relations);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const relation = await prisma.itineraireActivite.create({ data: body });
        return NextResponse.json(relation, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
