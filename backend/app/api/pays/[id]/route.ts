import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        const pays = await prisma.pays.findUnique({
            where: { id },
            include: { villes: true }
        });
        if (!pays) return NextResponse.json({ error: "Pays non trouvé" }, { status: 404 });
        return NextResponse.json(pays);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        const body = await request.json();
        const pays = await prisma.pays.update({
            where: { id },
            data: body
        });
        return NextResponse.json(pays);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        await prisma.pays.delete({ where: { id } });
        return NextResponse.json({ message: "Pays supprimé" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
