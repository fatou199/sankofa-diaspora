import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        const hotel = await prisma.hotels.findUnique({
            where: { id },
            include: { ville: true, avis_hotels: true }
        });
        if (!hotel) return NextResponse.json({ error: "Hôtel non trouvé" }, { status: 404 });
        return NextResponse.json(hotel);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        const body = await request.json();
        const hotel = await prisma.hotels.update({
            where: { id },
            data: body
        });
        return NextResponse.json(hotel);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        await prisma.hotels.delete({ where: { id } });
        return NextResponse.json({ message: "Hôtel supprimé" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
