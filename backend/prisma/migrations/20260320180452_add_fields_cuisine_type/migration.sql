/*
  Warnings:

  - The values [FRENCH,ITALIAN,HALAL] on the enum `CuisineType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CuisineType_new" AS ENUM ('AFRICAN', 'AMERICAN', 'ASIAN', 'EUROPEAN', 'INDIAN', 'FISH_AND_SEAFOOD', 'STREET_FOOD', 'VEGETARIAN', 'OTHER');
ALTER TABLE "restaurants" ALTER COLUMN "cuisineType" TYPE "CuisineType_new" USING ("cuisineType"::text::"CuisineType_new");
ALTER TYPE "CuisineType" RENAME TO "CuisineType_old";
ALTER TYPE "CuisineType_new" RENAME TO "CuisineType";
DROP TYPE "public"."CuisineType_old";
COMMIT;

-- AlterTable
ALTER TABLE "restaurants" ADD COLUMN     "isLocal" BOOLEAN NOT NULL DEFAULT false;
