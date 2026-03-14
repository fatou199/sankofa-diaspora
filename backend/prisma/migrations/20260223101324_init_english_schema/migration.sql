/*
  Warnings:

  - You are about to drop the `Activite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AvisActivite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AvisHotel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AvisRestaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavorisActivite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavorisHotel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavorisRestaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hotels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Itineraire` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItineraireActivite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItineraireDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItineraireRestaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pays` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Restaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sejours` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Villes` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ComfortLevel" AS ENUM ('BASIC', 'COMFORTABLE', 'LUXURY');

-- CreateEnum
CREATE TYPE "CuisineType" AS ENUM ('FRENCH', 'ITALIAN', 'ASIAN', 'AFRICAN', 'INDIAN', 'VEGETARIAN', 'OTHER');

-- CreateEnum
CREATE TYPE "ActivityCategory" AS ENUM ('SPORT', 'CULTURE', 'GASTRONOMY', 'NATURE', 'LEISURE', 'HISTORY', 'ART', 'ADVENTURE', 'RELAXATION', 'OTHER');

-- DropForeignKey
ALTER TABLE "Activite" DROP CONSTRAINT "Activite_ville_id_fkey";

-- DropForeignKey
ALTER TABLE "AvisActivite" DROP CONSTRAINT "AvisActivite_activite_id_fkey";

-- DropForeignKey
ALTER TABLE "AvisActivite" DROP CONSTRAINT "AvisActivite_user_id_fkey";

-- DropForeignKey
ALTER TABLE "AvisHotel" DROP CONSTRAINT "AvisHotel_hotel_id_fkey";

-- DropForeignKey
ALTER TABLE "AvisHotel" DROP CONSTRAINT "AvisHotel_user_id_fkey";

-- DropForeignKey
ALTER TABLE "AvisRestaurant" DROP CONSTRAINT "AvisRestaurant_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "AvisRestaurant" DROP CONSTRAINT "AvisRestaurant_user_id_fkey";

-- DropForeignKey
ALTER TABLE "FavorisActivite" DROP CONSTRAINT "FavorisActivite_activite_id_fkey";

-- DropForeignKey
ALTER TABLE "FavorisActivite" DROP CONSTRAINT "FavorisActivite_user_id_fkey";

-- DropForeignKey
ALTER TABLE "FavorisHotel" DROP CONSTRAINT "FavorisHotel_hotel_id_fkey";

-- DropForeignKey
ALTER TABLE "FavorisHotel" DROP CONSTRAINT "FavorisHotel_user_id_fkey";

-- DropForeignKey
ALTER TABLE "FavorisRestaurant" DROP CONSTRAINT "FavorisRestaurant_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "FavorisRestaurant" DROP CONSTRAINT "FavorisRestaurant_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Hotels" DROP CONSTRAINT "Hotels_ville_id_fkey";

-- DropForeignKey
ALTER TABLE "Itineraire" DROP CONSTRAINT "Itineraire_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ItineraireActivite" DROP CONSTRAINT "ItineraireActivite_activite_id_fkey";

-- DropForeignKey
ALTER TABLE "ItineraireActivite" DROP CONSTRAINT "ItineraireActivite_itineraire_detail_id_fkey";

-- DropForeignKey
ALTER TABLE "ItineraireDetail" DROP CONSTRAINT "ItineraireDetail_itineraire_id_fkey";

-- DropForeignKey
ALTER TABLE "ItineraireDetail" DROP CONSTRAINT "ItineraireDetail_ville_id_fkey";

-- DropForeignKey
ALTER TABLE "ItineraireRestaurant" DROP CONSTRAINT "ItineraireRestaurant_itineraire_detail_id_fkey";

-- DropForeignKey
ALTER TABLE "ItineraireRestaurant" DROP CONSTRAINT "ItineraireRestaurant_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_ville_id_fkey";

-- DropForeignKey
ALTER TABLE "Sejours" DROP CONSTRAINT "Sejours_itineraire_id_fkey";

-- DropForeignKey
ALTER TABLE "Sejours" DROP CONSTRAINT "Sejours_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Villes" DROP CONSTRAINT "Villes_pays_id_fkey";

-- DropForeignKey
ALTER TABLE "_UserOrigins" DROP CONSTRAINT "_UserOrigins_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserOrigins" DROP CONSTRAINT "_UserOrigins_B_fkey";

-- DropTable
DROP TABLE "Activite";

-- DropTable
DROP TABLE "AvisActivite";

-- DropTable
DROP TABLE "AvisHotel";

-- DropTable
DROP TABLE "AvisRestaurant";

-- DropTable
DROP TABLE "FavorisActivite";

-- DropTable
DROP TABLE "FavorisHotel";

-- DropTable
DROP TABLE "FavorisRestaurant";

-- DropTable
DROP TABLE "Hotels";

-- DropTable
DROP TABLE "Itineraire";

-- DropTable
DROP TABLE "ItineraireActivite";

-- DropTable
DROP TABLE "ItineraireDetail";

-- DropTable
DROP TABLE "ItineraireRestaurant";

-- DropTable
DROP TABLE "Pays";

-- DropTable
DROP TABLE "Restaurant";

-- DropTable
DROP TABLE "Sejours";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Villes";

-- DropEnum
DROP TYPE "CategorieActivite";

-- DropEnum
DROP TYPE "NiveauConfort";

-- DropEnum
DROP TYPE "TypeCuisine";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "diasporaCountry" TEXT NOT NULL,
    "originDetails" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "imageMap" TEXT,
    "description" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "capital" TEXT,
    "isoCode" TEXT,
    "officialLanguages" TEXT,
    "population" TEXT,
    "bestPeriod" TEXT,
    "visaRequiredFR" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "countryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pricePerNight" DOUBLE PRECISION NOT NULL,
    "comfortLevel" "ComfortLevel" NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "cityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cuisineType" "CuisineType" NOT NULL,
    "address" TEXT NOT NULL,
    "averagePrice" DOUBLE PRECISION NOT NULL,
    "openingHours" TEXT NOT NULL,
    "phone" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "cityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "openingHours" TEXT NOT NULL,
    "category" "ActivityCategory" NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "cityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itineraries" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "preferences" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "itineraries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itinerary_details" (
    "id" SERIAL NOT NULL,
    "day" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "itineraryId" INTEGER NOT NULL,
    "cityId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "itinerary_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itinerary_activities" (
    "id" SERIAL NOT NULL,
    "itineraryDetailId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "itinerary_activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itinerary_restaurants" (
    "id" SERIAL NOT NULL,
    "itineraryDetailId" INTEGER NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "itinerary_restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stays" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "itineraryId" INTEGER NOT NULL,
    "actualStartDate" TIMESTAMP(3) NOT NULL,
    "actualEndDate" TIMESTAMP(3) NOT NULL,
    "spentBudget" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel_reviews" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "reviewDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hotel_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_reviews" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "reviewDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurant_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_reviews" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "reviewDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activity_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_hotels" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "favorite_hotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_restaurants" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "favorite_restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_activities" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "favorite_activities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "itinerary_activities_itineraryDetailId_activityId_key" ON "itinerary_activities"("itineraryDetailId", "activityId");

-- CreateIndex
CREATE UNIQUE INDEX "itinerary_restaurants_itineraryDetailId_restaurantId_key" ON "itinerary_restaurants"("itineraryDetailId", "restaurantId");

-- CreateIndex
CREATE UNIQUE INDEX "hotel_reviews_userId_hotelId_key" ON "hotel_reviews"("userId", "hotelId");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_reviews_userId_restaurantId_key" ON "restaurant_reviews"("userId", "restaurantId");

-- CreateIndex
CREATE UNIQUE INDEX "activity_reviews_userId_activityId_key" ON "activity_reviews"("userId", "activityId");

-- CreateIndex
CREATE UNIQUE INDEX "favorite_hotels_userId_hotelId_key" ON "favorite_hotels"("userId", "hotelId");

-- CreateIndex
CREATE UNIQUE INDEX "favorite_restaurants_userId_restaurantId_key" ON "favorite_restaurants"("userId", "restaurantId");

-- CreateIndex
CREATE UNIQUE INDEX "favorite_activities_userId_activityId_key" ON "favorite_activities"("userId", "activityId");

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotels" ADD CONSTRAINT "hotels_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itineraries" ADD CONSTRAINT "itineraries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_details" ADD CONSTRAINT "itinerary_details_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "itineraries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_details" ADD CONSTRAINT "itinerary_details_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_activities" ADD CONSTRAINT "itinerary_activities_itineraryDetailId_fkey" FOREIGN KEY ("itineraryDetailId") REFERENCES "itinerary_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_activities" ADD CONSTRAINT "itinerary_activities_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_restaurants" ADD CONSTRAINT "itinerary_restaurants_itineraryDetailId_fkey" FOREIGN KEY ("itineraryDetailId") REFERENCES "itinerary_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_restaurants" ADD CONSTRAINT "itinerary_restaurants_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stays" ADD CONSTRAINT "stays_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stays" ADD CONSTRAINT "stays_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "itineraries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_reviews" ADD CONSTRAINT "hotel_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_reviews" ADD CONSTRAINT "hotel_reviews_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_reviews" ADD CONSTRAINT "restaurant_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_reviews" ADD CONSTRAINT "restaurant_reviews_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_reviews" ADD CONSTRAINT "activity_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_reviews" ADD CONSTRAINT "activity_reviews_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_hotels" ADD CONSTRAINT "favorite_hotels_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_hotels" ADD CONSTRAINT "favorite_hotels_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_restaurants" ADD CONSTRAINT "favorite_restaurants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_restaurants" ADD CONSTRAINT "favorite_restaurants_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_activities" ADD CONSTRAINT "favorite_activities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_activities" ADD CONSTRAINT "favorite_activities_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserOrigins" ADD CONSTRAINT "_UserOrigins_A_fkey" FOREIGN KEY ("A") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserOrigins" ADD CONSTRAINT "_UserOrigins_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
