/*
  Warnings:

  - You are about to drop the column `ville_id` on the `Itineraire` table. All the data in the column will be lost.
  - You are about to drop the column `origin_country_id` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Itineraire" DROP CONSTRAINT "Itineraire_ville_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_origin_country_id_fkey";

-- AlterTable
ALTER TABLE "Itineraire" DROP COLUMN "ville_id";

-- AlterTable
ALTER TABLE "ItineraireDetail" ADD COLUMN     "ville_id" INTEGER;

-- AlterTable
ALTER TABLE "Pays" ADD COLUMN     "capitale" TEXT,
ADD COLUMN     "code_iso" TEXT,
ADD COLUMN     "langues_officielles" TEXT,
ADD COLUMN     "meilleure_periode" TEXT,
ADD COLUMN     "population" TEXT,
ADD COLUMN     "visa_requis_be" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "visa_requis_ca" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "visa_requis_fr" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "origin_country_id",
ADD COLUMN     "origin_details" TEXT;

-- CreateTable
CREATE TABLE "_UserOrigins" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserOrigins_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserOrigins_B_index" ON "_UserOrigins"("B");

-- AddForeignKey
ALTER TABLE "ItineraireDetail" ADD CONSTRAINT "ItineraireDetail_ville_id_fkey" FOREIGN KEY ("ville_id") REFERENCES "Villes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserOrigins" ADD CONSTRAINT "_UserOrigins_A_fkey" FOREIGN KEY ("A") REFERENCES "Pays"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserOrigins" ADD CONSTRAINT "_UserOrigins_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
