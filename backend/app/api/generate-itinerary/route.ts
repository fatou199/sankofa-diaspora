import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get("authorization");
        const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

        if (!token) {
            return NextResponse.json({ error: "Authentification requise" }, { status: 401 });
        }

        const decoded = await verifyToken(token) as { userId: number };
        if (!decoded || !decoded.userId) {
            return NextResponse.json({ error: "Session invalide ou expirée" }, { status: 401 });
        }

        const body = await request.json();
        const countryId = Number(body.countryId);
        const cityIds = body.cityIds ? body.cityIds.map((id: any) => Number(id)) : [];
        const interests = body.interests || [];

        // Check if it's Ivory Coast (ID 1)
        const isIvoryCoast = countryId === 1;

        // On prépare les données pour Prisma avec les bonnes conversions de types
        const itinerary = await prisma.itinerary.create({
            data: {
                startDate: new Date(body.startDate),
                endDate: new Date(body.endDate),
                adults: Number(body.adults),
                children: Number(body.children),
                budget: Number(body.budget),
                interests: interests,
                userId: decoded.userId,
                countryId: countryId,
                cityIds: cityIds,
                cities: {
                    connect: cityIds.map((id: number) => ({ id }))
                }
            }
        });

        // If Ivory Coast, we generate details automatically
        if (isIvoryCoast && cityIds.length > 0) {
            const start = new Date(body.startDate);
            const end = new Date(body.endDate);
            const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

            // 1. Fetch ALL possible activities and restaurants for the country to have a large fallback pool
            const allActivities = await prisma.activity.findMany({
                where: { city: { countryId: countryId } },
                include: { city: true }
            }) as (any)[];

            const allRestaurants = await prisma.restaurant.findMany({
                where: { city: { countryId: countryId } },
                include: { city: true }
            }) as (any)[];

            // 2. Separate into "Ideal" (selected cities + interests) and "Fallback" (others)
            let idealActivities = allActivities.filter(a => 
                cityIds.includes(a.cityId) && (interests.length === 0 || interests.includes(a.category))
            );
            let fallbackActivities = allActivities.filter(a => !idealActivities.map(ia => ia.id).includes(a.id));

            let idealRestaurants = allRestaurants.filter(r => cityIds.includes(r.cityId));
            let fallbackRestaurants = allRestaurants.filter(r => !idealRestaurants.map(ir => ir.id).includes(r.id));

            // 3. Shuffle both pools
            const shuffle = (array: any[]) => array.sort(() => Math.random() - 0.5);
            idealActivities = shuffle(idealActivities);
            fallbackActivities = shuffle(fallbackActivities);
            idealRestaurants = shuffle(idealRestaurants);
            fallbackRestaurants = shuffle(fallbackRestaurants);

            // 4. Distribution logic
            let actIdx = 0;
            let fallActIdx = 0;
            let restIdx = 0;
            let fallRestIdx = 0;

            for (let day = 1; day <= duration; day++) {
                // Determine city for the day (rotate through selection)
                const cityId = cityIds[(day - 1) % cityIds.length];

                // Pick 2 activities
                const dayActivities = [];
                for (let i = 0; i < 2; i++) {
                    if (actIdx < idealActivities.length) {
                        dayActivities.push(idealActivities[actIdx++]);
                    } else if (fallActIdx < fallbackActivities.length) {
                        dayActivities.push(fallbackActivities[fallActIdx++]);
                    }
                }

                // Pick 1 restaurant
                let dayRestaurant = null;
                if (restIdx < idealRestaurants.length) {
                    dayRestaurant = idealRestaurants[restIdx++];
                } else if (fallRestIdx < fallbackRestaurants.length) {
                    dayRestaurant = fallbackRestaurants[fallRestIdx++];
                }

                // Create the day detail
                const detail = await prisma.itineraryDetail.create({
                    data: {
                        itineraryId: itinerary.id,
                        day: day,
                        cityId: cityId,
                        notes: `Jour ${day} : Exploration de ${allActivities.find(a => a.cityId === cityId)?.city?.name || "la région"}.`
                    }
                });

                // Link items
                if (dayActivities.length > 0) {
                    await prisma.itineraryActivity.createMany({
                        data: dayActivities.map(a => ({
                            itineraryDetailId: detail.id,
                            activityId: a.id
                        }))
                    });
                }
                if (dayRestaurant) {
                    await prisma.itineraryRestaurant.create({
                        data: {
                            itineraryDetailId: detail.id,
                            restaurantId: dayRestaurant.id
                        }
                    });
                }
            }
        }

        return NextResponse.json({ 
            message: isIvoryCoast ? "Itinéraire généré et enregistré avec succès" : "Itinéraire enregistré avec succès", 
            data: itinerary 
        }, { status: 201 });

    } catch (error: any) {
        console.error("Erreur Itinerary Logic:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}