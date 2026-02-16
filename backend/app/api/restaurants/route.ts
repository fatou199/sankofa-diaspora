import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const restaurants = await prisma.restaurant.findMany({
            include: {
                ville: true
            }
        });
        return NextResponse.json(restaurants);
    } catch (error: any) {
        return NextResponse.json(
            { error: "Erreur lors de la récupération des restaurants", details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const restaurant = await prisma.restaurant.create({
            data: body
        });
        return NextResponse.json(restaurant, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Erreur lors de la création du restaurant", details: error.message },
            { status: 400 }
        );
    }
}
