import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        const itineraire = await prisma.itineraire.findUnique({
            where: { id },
            include: { user: true, ville: true, details: { include: { activites: { include: { activite: true } }, restaurants: { include: { restaurant: true } } } } }
        });
        if (!itineraire) return NextResponse.json({ error: "Itinéraire non trouvé" }, { status: 404 });
        return NextResponse.json(itineraire);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        const body = await request.json();
        const itineraire = await prisma.itineraire.update({
            where: { id },
            data: body
        });
        return NextResponse.json(itineraire);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        await prisma.itineraire.delete({ where: { id } });
        return NextResponse.json({ message: "Itinéraire supprimé" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
