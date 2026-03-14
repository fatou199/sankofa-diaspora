import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        const city = await prisma.city.findUnique({
            where: { id },
            include: { country: true, hotels: true, restaurants: true, activities: true }
        });
        if (!city) return NextResponse.json({ error: "City not found" }, { status: 404 });
        return NextResponse.json(city);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        const body = await request.json();
        if (body.countryId) body.countryId = parseInt(body.countryId);
        const city = await prisma.city.update({
            where: { id },
            data: body
        });
        return NextResponse.json(city);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        await prisma.city.delete({ where: { id } });
        return NextResponse.json({ message: "City deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
