import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const details = await prisma.itineraryDetail.findMany({
            include: {
                itinerary: true,
                activities: { include: { activity: true } },
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
        const detail = await prisma.itineraryDetail.create({ data: body });
        return NextResponse.json(detail, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
