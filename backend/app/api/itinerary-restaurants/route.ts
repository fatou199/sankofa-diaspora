import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const relations = await prisma.itineraryRestaurant.findMany({
            include: { itineraryDetail: true, restaurant: true }
        });
        return NextResponse.json(relations);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const relation = await prisma.itineraryRestaurant.create({ data: body });
        return NextResponse.json(relation, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
