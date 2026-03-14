import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const avis = await prisma.reviewActivity.findMany({
            include: { user: true, activity: true }
        });
        return NextResponse.json(avis);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const avis = await prisma.reviewActivity.create({ data: body });
        return NextResponse.json(avis, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
