-- CreateEnum
CREATE TYPE "NiveauConfort" AS ENUM ('BASIQUE', 'CONFORTABLE', 'LUXE');

-- CreateEnum
CREATE TYPE "TypeCuisine" AS ENUM ('FRANCAISE', 'ITALIENNE', 'ASIATIQUE', 'AFRICAINE', 'INDIENNE', 'VEGETARIENNE', 'AUTRE');

-- CreateEnum
CREATE TYPE "CategorieActivite" AS ENUM ('SPORT', 'CULTURE', 'GASTRONOMIE', 'NATURE', 'LOISIRS', 'HISTOIRE', 'ART', 'AVENTURE', 'RELAXATION', 'AUTRE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "date_naiss" TIMESTAMP(3),
    "diaspora_country" TEXT NOT NULL,
    "origin_country_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pays" (
    "id" SERIAL NOT NULL,
    "image" TEXT,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "monnaie" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Villes" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "pays_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Villes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hotels" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prix_nuit" DOUBLE PRECISION NOT NULL,
    "niveau_confort" "NiveauConfort" NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "ville_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cuisine" "TypeCuisine" NOT NULL,
    "adresse" TEXT NOT NULL,
    "prix_moyen" DOUBLE PRECISION NOT NULL,
    "horaires" TEXT NOT NULL,
    "telephone" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "ville_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activite" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "horaire" TEXT NOT NULL,
    "categorie" "CategorieActivite" NOT NULL,
    "adresse" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "ville_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Itineraire" (
    "id" SERIAL NOT NULL,
    "date_debut" TIMESTAMP(3) NOT NULL,
    "date_fin" TIMESTAMP(3) NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "preferences" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "ville_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Itineraire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItineraireDetail" (
    "id" SERIAL NOT NULL,
    "jour" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "itineraire_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItineraireDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItineraireActivite" (
    "id" SERIAL NOT NULL,
    "itineraire_detail_id" INTEGER NOT NULL,
    "activite_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItineraireActivite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItineraireRestaurant" (
    "id" SERIAL NOT NULL,
    "itineraire_detail_id" INTEGER NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItineraireRestaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sejours" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "itineraire_id" INTEGER NOT NULL,
    "date_debut_reel" TIMESTAMP(3) NOT NULL,
    "date_fin_reel" TIMESTAMP(3) NOT NULL,
    "budget_depense" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sejours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvisHotel" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "hotel_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "commentaire" TEXT NOT NULL,
    "date_avis" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AvisHotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvisRestaurant" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "commentaire" TEXT NOT NULL,
    "date_avis" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AvisRestaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvisActivite" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "activite_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "commentaire" TEXT NOT NULL,
    "date_avis" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AvisActivite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavorisHotel" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "hotel_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FavorisHotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavorisRestaurant" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FavorisRestaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavorisActivite" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "activite_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FavorisActivite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ItineraireActivite_itineraire_detail_id_activite_id_key" ON "ItineraireActivite"("itineraire_detail_id", "activite_id");

-- CreateIndex
CREATE UNIQUE INDEX "ItineraireRestaurant_itineraire_detail_id_restaurant_id_key" ON "ItineraireRestaurant"("itineraire_detail_id", "restaurant_id");

-- CreateIndex
CREATE UNIQUE INDEX "AvisHotel_user_id_hotel_id_key" ON "AvisHotel"("user_id", "hotel_id");

-- CreateIndex
CREATE UNIQUE INDEX "AvisRestaurant_user_id_restaurant_id_key" ON "AvisRestaurant"("user_id", "restaurant_id");

-- CreateIndex
CREATE UNIQUE INDEX "AvisActivite_user_id_activite_id_key" ON "AvisActivite"("user_id", "activite_id");

-- CreateIndex
CREATE UNIQUE INDEX "FavorisHotel_user_id_hotel_id_key" ON "FavorisHotel"("user_id", "hotel_id");

-- CreateIndex
CREATE UNIQUE INDEX "FavorisRestaurant_user_id_restaurant_id_key" ON "FavorisRestaurant"("user_id", "restaurant_id");

-- CreateIndex
CREATE UNIQUE INDEX "FavorisActivite_user_id_activite_id_key" ON "FavorisActivite"("user_id", "activite_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_origin_country_id_fkey" FOREIGN KEY ("origin_country_id") REFERENCES "Pays"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Villes" ADD CONSTRAINT "Villes_pays_id_fkey" FOREIGN KEY ("pays_id") REFERENCES "Pays"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotels" ADD CONSTRAINT "Hotels_ville_id_fkey" FOREIGN KEY ("ville_id") REFERENCES "Villes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_ville_id_fkey" FOREIGN KEY ("ville_id") REFERENCES "Villes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activite" ADD CONSTRAINT "Activite_ville_id_fkey" FOREIGN KEY ("ville_id") REFERENCES "Villes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itineraire" ADD CONSTRAINT "Itineraire_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itineraire" ADD CONSTRAINT "Itineraire_ville_id_fkey" FOREIGN KEY ("ville_id") REFERENCES "Villes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItineraireDetail" ADD CONSTRAINT "ItineraireDetail_itineraire_id_fkey" FOREIGN KEY ("itineraire_id") REFERENCES "Itineraire"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItineraireActivite" ADD CONSTRAINT "ItineraireActivite_itineraire_detail_id_fkey" FOREIGN KEY ("itineraire_detail_id") REFERENCES "ItineraireDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItineraireActivite" ADD CONSTRAINT "ItineraireActivite_activite_id_fkey" FOREIGN KEY ("activite_id") REFERENCES "Activite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItineraireRestaurant" ADD CONSTRAINT "ItineraireRestaurant_itineraire_detail_id_fkey" FOREIGN KEY ("itineraire_detail_id") REFERENCES "ItineraireDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItineraireRestaurant" ADD CONSTRAINT "ItineraireRestaurant_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sejours" ADD CONSTRAINT "Sejours_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sejours" ADD CONSTRAINT "Sejours_itineraire_id_fkey" FOREIGN KEY ("itineraire_id") REFERENCES "Itineraire"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvisHotel" ADD CONSTRAINT "AvisHotel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvisHotel" ADD CONSTRAINT "AvisHotel_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "Hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvisRestaurant" ADD CONSTRAINT "AvisRestaurant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvisRestaurant" ADD CONSTRAINT "AvisRestaurant_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvisActivite" ADD CONSTRAINT "AvisActivite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvisActivite" ADD CONSTRAINT "AvisActivite_activite_id_fkey" FOREIGN KEY ("activite_id") REFERENCES "Activite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavorisHotel" ADD CONSTRAINT "FavorisHotel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavorisHotel" ADD CONSTRAINT "FavorisHotel_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "Hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavorisRestaurant" ADD CONSTRAINT "FavorisRestaurant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavorisRestaurant" ADD CONSTRAINT "FavorisRestaurant_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavorisActivite" ADD CONSTRAINT "FavorisActivite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavorisActivite" ADD CONSTRAINT "FavorisActivite_activite_id_fkey" FOREIGN KEY ("activite_id") REFERENCES "Activite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
