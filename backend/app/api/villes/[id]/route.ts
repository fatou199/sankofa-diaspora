import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        const ville = await prisma.villes.findUnique({
            where: { id },
            include: { pays: true, hotels: true, restaurants: true, activites: true }
        });
        if (!ville) return NextResponse.json({ error: "Ville non trouvée" }, { status: 404 });
        return NextResponse.json(ville);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        const body = await request.json();
        if (body.pays_id) body.pays_id = parseInt(body.pays_id);
        const ville = await prisma.villes.update({
            where: { id },
            data: body
        });
        return NextResponse.json(ville);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        await prisma.villes.delete({ where: { id } });
        return NextResponse.json({ message: "Ville supprimée" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
