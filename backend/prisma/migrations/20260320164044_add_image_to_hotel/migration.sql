-- AlterEnum
ALTER TYPE "ActivityCategory" ADD VALUE 'SHOPPING';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CuisineType" ADD VALUE 'FISH_AND_SEAFOOD';
ALTER TYPE "CuisineType" ADD VALUE 'STREET_FOOD';
ALTER TYPE "CuisineType" ADD VALUE 'HALAL';

-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "duration" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "neighborhood" TEXT,
ADD COLUMN     "status" TEXT DEFAULT 'VERIFIÉ',
ADD COLUMN     "telephone" TEXT,
ADD COLUMN     "terrainLogic" TEXT,
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "hotels" ADD COLUMN     "image" TEXT,
ADD COLUMN     "neighborhood" TEXT,
ADD COLUMN     "status" TEXT DEFAULT 'VERIFIÉ',
ADD COLUMN     "telephone" TEXT,
ADD COLUMN     "terrainLogic" TEXT,
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "itineraries" ADD COLUMN     "cityIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ADD COLUMN     "countryId" INTEGER;

-- AlterTable
ALTER TABLE "restaurants" ADD COLUMN     "image" TEXT,
ADD COLUMN     "isHalal" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "neighborhood" TEXT,
ADD COLUMN     "status" TEXT DEFAULT 'VERIFIÉ',
ADD COLUMN     "terrainLogic" TEXT,
ADD COLUMN     "website" TEXT;

-- CreateTable
CREATE TABLE "_ItineraryCities" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ItineraryCities_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ItineraryCities_B_index" ON "_ItineraryCities"("B");

-- AddForeignKey
ALTER TABLE "itineraries" ADD CONSTRAINT "itineraries_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItineraryCities" ADD CONSTRAINT "_ItineraryCities_A_fkey" FOREIGN KEY ("A") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItineraryCities" ADD CONSTRAINT "_ItineraryCities_B_fkey" FOREIGN KEY ("B") REFERENCES "itineraries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
