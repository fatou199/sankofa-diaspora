import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        const restaurant = await prisma.restaurant.findUnique({
            where: { id },
            include: { ville: true, avis_restaurants: true }
        });
        if (!restaurant) return NextResponse.json({ error: "Restaurant non trouvé" }, { status: 404 });
        return NextResponse.json(restaurant);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        const body = await request.json();
        const restaurant = await prisma.restaurant.update({
            where: { id },
            data: body
        });
        return NextResponse.json(restaurant);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        await prisma.restaurant.delete({ where: { id } });
        return NextResponse.json({ message: "Restaurant supprimé" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
