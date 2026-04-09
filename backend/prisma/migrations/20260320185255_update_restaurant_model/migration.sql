/*
  Warnings:

  - The values [FISH_AND_SEAFOOD,STREET_FOOD,VEGETARIAN] on the enum `CuisineType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `establishmentType` to the `restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EstablishmentType" AS ENUM ('RESTAURANT', 'BRUNCH', 'PATISSERIE', 'CAFE', 'STREET_FOOD', 'BAR', 'FAST_FOOD', 'GASTRONOMIC', 'BUFFET', 'FOOD_TRUCK', 'ROOFTOP');

-- CreateEnum
CREATE TYPE "DietType" AS ENUM ('NONE', 'VEGETARIAN', 'VEGAN', 'HALAL', 'KOSHER', 'PESCATARIAN', 'GLUTEN_FREE', 'ORGANIC');

-- AlterEnum
BEGIN;
CREATE TYPE "CuisineType_new" AS ENUM ('AFRICAN', 'AMERICAN', 'ASIAN', 'EUROPEAN', 'INDIAN', 'OTHER');
ALTER TABLE "restaurants" ALTER COLUMN "cuisineType" TYPE "CuisineType_new" USING ("cuisineType"::text::"CuisineType_new");
ALTER TYPE "CuisineType" RENAME TO "CuisineType_old";
ALTER TYPE "CuisineType_new" RENAME TO "CuisineType";
DROP TYPE "public"."CuisineType_old";
COMMIT;

-- AlterTable
ALTER TABLE "restaurants" ADD COLUMN     "dietTypes" "DietType"[],
ADD COLUMN     "establishmentType" "EstablishmentType" NOT NULL;
