import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const favoris = await prisma.favorisHotel.findMany({
            include: { user: true, hotel: true }
        });
        return NextResponse.json(favoris);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const favoris = await prisma.favorisHotel.create({ data: body });
        return NextResponse.json(favoris, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
