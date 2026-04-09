export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type') || 'all'; // 'all', 'hotel', 'restaurant', 'activity'
        const countryId = searchParams.get('countryId');
        
        let hotels: any[] = [];
        let restaurants: any[] = [];
        let activities: any[] = [];

        const baseQuery = {
            include: {
                city: {
                    include: {
                        country: true
                    }
                }
            },
            where: countryId ? {
                city: {
                    countryId: parseInt(countryId)
                }
            } : undefined
        };

        if (type === 'all' || type === 'hotel') {
            hotels = await prisma.hotel.findMany(baseQuery);
        }
        if (type === 'all' || type === 'restaurant') {
            restaurants = await prisma.restaurant.findMany(baseQuery);
        }
        if (type === 'all' || type === 'activity') {
            activities = await prisma.activity.findMany(baseQuery);
        }

        // Format and flatten the data
        const formattedHotels = hotels.map(h => ({ ...h, _type: 'hotel' }));
        const formattedRestaurants = restaurants.map(r => ({ ...r, _type: 'restaurant' }));
        const formattedActivities = activities.map(a => ({ ...a, _type: 'activity' }));

        const allItems = [...formattedHotels, ...formattedRestaurants, ...formattedActivities]
            .sort(() => 0.5 - Math.random()); // simple shuffle for discovery

        return NextResponse.json({ items: allItems });

    } catch (error: any) {
        console.error("Erreur Explorer API:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
