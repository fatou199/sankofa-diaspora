import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
        const favoris = await prisma.favoriteActivity.findMany()
        return NextResponse.json(favoris)
    } catch (error) {
        return NextResponse.json(
            { error: "Erreur lors de la récupération"},
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("Données reçues pour le favoris:", body);
        const newFavoris = await prisma.favoriteActivity.create({
            data: body,
        })
        return NextResponse.json(newFavoris, {status: 201})
    } catch (error: any) {
        console.error("Erreur Prisma:", error);
        return NextResponse.json(
            { 
                error: "Erreur lors de la création",
                details: error.message || error
            },
            { status: 400 }
        )
    }
}