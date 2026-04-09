export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        const country = await prisma.country.findUnique({
            where: { id },
            include: { 
                cities: {
                    include: {
                        activities: {
                            take: 4 // Just a few for the incontournables
                        }
                    }
                }
            }
        });
        if (!country) return NextResponse.json({ error: "Country not found" }, { status: 404 });
        return NextResponse.json(country);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        const body = await request.json();
        const country = await prisma.country.update({
            where: { id },
            data: body
        });
        return NextResponse.json(country);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        await prisma.country.delete({ where: { id } });
        return NextResponse.json({ message: "Country deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
