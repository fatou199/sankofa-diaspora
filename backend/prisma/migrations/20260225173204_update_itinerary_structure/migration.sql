/*
  Warnings:

  - You are about to drop the column `preferences` on the `itineraries` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ActivityCategory" ADD VALUE 'BEACH';
ALTER TYPE "ActivityCategory" ADD VALUE 'PHOTOGRAPHY';

-- AlterTable
ALTER TABLE "itineraries" DROP COLUMN "preferences",
ADD COLUMN     "adults" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "children" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "interests" "ActivityCategory"[];
