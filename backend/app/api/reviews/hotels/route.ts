import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const avis = await prisma.reviewHotel.findMany({
            include: { user: true, hotel: true }
        });
        return NextResponse.json(avis);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const avis = await prisma.reviewHotel.create({ data: body });
        return NextResponse.json(avis, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
