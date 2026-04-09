import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.reviewActivity.deleteMany({});
  await prisma.reviewRestaurant.deleteMany({});
  await prisma.reviewHotel.deleteMany({});
  await prisma.favoriteActivity.deleteMany({});
  await prisma.favoriteRestaurant.deleteMany({});
  await prisma.favoriteHotel.deleteMany({});
  await prisma.itineraryActivity.deleteMany({});
  await prisma.itineraryRestaurant.deleteMany({});
  await prisma.itineraryDetail.deleteMany({});
  await prisma.itinerary.deleteMany({});
  await prisma.activity.deleteMany({});
  await prisma.restaurant.deleteMany({});
  await prisma.hotel.deleteMany({});
  await prisma.city.deleteMany({});
  await prisma.country.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Database cleared");

  // Create Countries

  const coteDIvoire = await prisma.country.create({
    data: {
      name: "Côte d’Ivoire",
      image: "/images/landscapes/cotedivoire.png",
      imageMap: "/images/maps/cote_ivoire.png",
      description:
        "La perle des lagunes, un carrefour culturel entre modernité et traditions.",
      currency: "FCFA",
      capital: "Yamoussoukro",
      isoCode: "CIV",
      officialLanguages: "Français",
      population: "26M",
      bestPeriod: "Décembre à Février",
      visaRequiredFR: true,
    },
  });

  const senegal = await prisma.country.create({
    data: {
      name: "Sénégal",
      image: "/images/landscapes/senegal.png",
      imageMap: "/images/maps/senegal.png",
      description:
        "La Terre de la Teranga, connue pour son hospitalité et sa culture vibrante.",
      currency: "FCFA",
      capital: "Dakar",
      isoCode: "SEN",
      officialLanguages: "Français, Wolof",
      population: "19M",
      bestPeriod: "Novembre à Mai",
      visaRequiredFR: false,
    },
  });

  const mali = await prisma.country.create({
    data: {
      name: "Mali",
      image: "/images/landscapes/mali.png",
      imageMap: "/images/maps/mali.png",
      description:
        "Un pays riche en histoire, des manuscrits de Tombouctou aux falaises Dogon.",
      currency: "FCFA",
      capital: "Bamako",
      isoCode: "MLI",
      officialLanguages: "Bambara, Français",
      population: "20M",
      bestPeriod: "Novembre à Février",
      visaRequiredFR: true,
    },
  });

  console.log("Countries created");

  // Create Cities
  await prisma.city.createMany({
    data: [
      // Côte d'Ivoire
      {
        name: "Abidjan",
        description:
          "Le cœur économique et ville multiculturelle bouillonnante.",
        latitude: 5.36,
        longitude: -4.0083,
        countryId: coteDIvoire.id,
      },
      {
        name: "Yamoussoukro",
        description: "Capitale politique connue pour sa majestueuse basilique.",
        latitude: 6.8167,
        longitude: -5.2833,
        countryId: coteDIvoire.id,
      },
      {
        name: "Bouaké",
        description: "Carrefour culturel et commercial du centre.",
        latitude: 7.6833,
        longitude: -5.0333,
        countryId: coteDIvoire.id,
      },
      {
        name: "San-Pédro",
        description: "Deuxième grand port, porte d'entrée régionale.",
        latitude: 4.75,
        longitude: -6.6333,
        countryId: coteDIvoire.id,
      },
      {
        name: "Korhogo",
        description: "La cité du Poro, grand centre culturel du nord.",
        latitude: 9.45,
        longitude: -5.6333,
        countryId: coteDIvoire.id,
      },
      {
        name: "Daloa",
        description: "Importante ville agricole dans l'ouest.",
        latitude: 6.8833,
        longitude: -6.45,
        countryId: coteDIvoire.id,
      },
      {
        name: "Man",
        description:
          "La ville aux 18 montagnes, réputée pour sa cascade et sa forêt.",
        latitude: 7.4125,
        longitude: -7.5536,
        countryId: coteDIvoire.id,
      },
      {
        name: "Grand-Bassam",
        description:
          "Ancienne capitale coloniale, patrimoine mondial de l'UNESCO.",
        latitude: 5.2,
        longitude: -3.7333,
        countryId: coteDIvoire.id,
      },
      {
        name: "Assinie",
        description: "Station balnéaire célèbre pour ses plages paradisiaques.",
        latitude: 5.1333,
        longitude: -3.2833,
        countryId: coteDIvoire.id,
      },
      {
        name: "Bingerville",
        description:
          "Ville historique proche d'Abidjan, connue pour son jardin botanique.",
        latitude: 5.35,
        longitude: -3.8833,
        countryId: coteDIvoire.id,
      },

      // Sénégal
      {
        name: "Dakar",
        description: "Capitale dynamique et pôle culturel bouillonnant.",
        latitude: 14.7167,
        longitude: -17.4677,
        countryId: senegal.id,
      },
      {
        name: "Saint-Louis",
        description: "Ville historique, ancienne capitale au charme colonial.",
        latitude: 16.0244,
        longitude: -16.5047,
        countryId: senegal.id,
      },
      {
        name: "Ziguinchor",
        description: "Porte d'entrée de la Casamance, région verdoyante.",
        latitude: 12.5833,
        longitude: -16.2667,
        countryId: senegal.id,
      },
      {
        name: "Thiès",
        description: "Carrefour ferroviaire et ville de l'artisanat tapissier.",
        latitude: 14.7833,
        longitude: -16.9333,
        countryId: senegal.id,
      },
      {
        name: "Touba",
        description: "Ville sainte et cœur spirituel du mouridisme.",
        latitude: 14.8667,
        longitude: -15.8833,
        countryId: senegal.id,
      },
      {
        name: "Mbour",
        description:
          "Pôle économique majeur de la Petite Côte, réputé pour la pêche.",
        latitude: 14.4167,
        longitude: -16.9667,
        countryId: senegal.id,
      },
      {
        name: "Rufisque",
        description: "Ville côtière au riche patrimoine architectural.",
        latitude: 14.7167,
        longitude: -17.2667,
        countryId: senegal.id,
      },
      {
        name: "Kaolack",
        description: "Grand centre de commerce de l'arachide.",
        latitude: 14.15,
        longitude: -16.0667,
        countryId: senegal.id,
      },
      {
        name: "Diourbel",
        description: "Ville historique, ancien royaume du Baol.",
        latitude: 14.65,
        longitude: -16.2333,
        countryId: senegal.id,
      },
      {
        name: "Tambacounda",
        description:
          "Plus grande ville de l'est, porte d'entrée du parc Niokolo-Koba.",
        latitude: 13.7667,
        longitude: -13.7333,
        countryId: senegal.id,
      },

      // Mali
      {
        name: "Bamako",
        description: "Capitale animée sur les rives du fleuve Niger.",
        latitude: 12.6392,
        longitude: -8.0029,
        countryId: mali.id,
      },
      {
        name: "Sikasso",
        description: "Grand centre agricole et carrefour du grand sud.",
        latitude: 11.3167,
        longitude: -5.6667,
        countryId: mali.id,
      },
      {
        name: "Ségou",
        description: "La majestueuse cité des balanzans sur le bord du fleuve.",
        latitude: 13.4333,
        longitude: -6.2667,
        countryId: mali.id,
      },
      {
        name: "Mopti",
        description: "La Venise du Mali, au carrefour du Niger et du Bani.",
        latitude: 14.4833,
        longitude: -4.1833,
        countryId: mali.id,
      },
      {
        name: "Kayes",
        description:
          "La cocotte-minute d'Afrique, ville frontière vers l'ouest.",
        latitude: 14.4333,
        longitude: -11.4333,
        countryId: mali.id,
      },
      {
        name: "Gao",
        description:
          "Ancienne capitale de l'empire songhaï, aux portes du désert.",
        latitude: 16.2667,
        longitude: -0.05,
        countryId: mali.id,
      },
      {
        name: "Tombouctou",
        description:
          "La ville aux 333 saints, mythe sahélien et carrefour des caravanes.",
        latitude: 16.7667,
        longitude: -3.0,
        countryId: mali.id,
      },
      {
        name: "Koutiala",
        description: "La capitale de l'or blanc (coton).",
        latitude: 12.3833,
        longitude: -5.4667,
        countryId: mali.id,
      },
      {
        name: "Kati",
        description: "Ville militaire et stratégique aux abords de Bamako.",
        latitude: 12.7333,
        longitude: -8.0667,
        countryId: mali.id,
      },
      {
        name: "Djenné",
        description: "Ville historique, célèbre par sa mosquée en banco.",
        latitude: 13.9,
        longitude: -4.55,
        countryId: mali.id,
      },
    ],
  });

  console.log("Cities created");

  // Create a Sample User
  const hashedPassword = await bcrypt.hash("password123", 10);
  const user = await prisma.user.create({
    data: {
      lastName: "Toure",
      firstName: "Aminata",
      email: "aminata.toure@example.com",
      password: hashedPassword,
      diasporaCountry: "France",
      originDetails: "Abidjan, Côte d'Ivoire",
      origins: {
        connect: [{ id: coteDIvoire.id }],
      },
    },
  });

  const dbCities = await prisma.city.findMany();
  const getCityId = (name: string) =>
    dbCities.find((c) => c.name === name)?.id || dbCities[0]?.id || 1;

  // ── HÔTELS ──
  await prisma.hotel.createMany({
    data: [
      {
        name: "La Cabane Verte",
        description:
          "Ancienne maison familiale cachée dans un écrin de verdure en plein cœur de Cocody. Pas de télé, pas d'internet — juste le chant des oiseaux au réveil et des veillées au feu de bois.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Cocody Danga",
        latitude: 5.371,
        longitude: -3.99,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Cocody Danga, cherche la grande grille verte au bout d'une allée de manguiers. Pas d'enseigne visible — demande aux voisins « La Cabane de Mama Adjoua ».",
        image:
          "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
        pricePerNight: 35000,
        telephone: "+225 07 000 0001",
        comfortLevel: "COMFORTABLE",
      },
      {
        name: "Auberge Chez Mario",
        description:
          "Auberge insolite sur l'Île Boulay, accessible uniquement en bateau. Bungalows en bois au bord de la lagune, cuisine locale sur terrasse. Dépaysement total à 20 minutes d'Abidjan.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Île Boulay",
        latitude: 5.28,
        longitude: -4.02,
        status: "COMMUNAUTÉ",
        terrainLogic:
          "Départ depuis l'Espace Mima (Port Autonome, Zone 4). Bateau toutes les heures (500 FCFA). Dire au batelier « Chez Mario, côté nord ».",
        image:
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
        pricePerNight: 28000,
        telephone: "+225 07 000 0002",
        comfortLevel: "BASIC",
      },
      {
        name: "Maria Resort",
        description:
          "Resort de charme sur l'Île Boulay avec piscine, bungalows ombragés et restaurant en plein air. Idéal pour un week-end en famille.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Île Boulay",
        latitude: 5.275,
        longitude: -4.025,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Même départ que Chez Mario — Espace Mima, Port Autonome. Dire « Maria Resort » au batelier. Réservation obligatoire.",
        image:
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        pricePerNight: 55000,
        telephone: "+225 07 000 0003",
        comfortLevel: "COMFORTABLE",
      },
      {
        name: "Maison Palmier",
        description:
          "Premier Design Hotel d'Abidjan aux Deux Plateaux. Architecture inspirée des motifs africains, 74 chambres, bistrot gastronomique et piscine sur rooftop.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Les Deux Plateaux",
        latitude: 5.376,
        longitude: -3.998,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Deux Plateaux, rue des Jardins, à 200m du supermarché Sococé. Grande façade beige avec palmiers devant. Taxi depuis le Plateau : 2 000 FCFA.",
        image:
          "../images/hotel/maison_palmier.png",
        pricePerNight: 95000,
        telephone: "+225 27 000 0004",
        website: "https://maisonpalmier.com",
        comfortLevel: "LUXURY",
      },
    ],
  });

  // ── RESTAURANTS ──
  await prisma.restaurant.createMany({
    data: [
      {
        name: "Saakan",
        description:
          "Une des meilleures tables d'Abidjan, offrant une cuisine ivoirienne revisitée dans un cadre chic et contemporain.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Le Plateau",
        address: "Plateau, Avenue Chardy",
        latitude: 5.3245,
        longitude: -4.019,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Plateau, Avenue Chardy, en face de l'AIP. Immeuble moderne.",
        image:
          "https://images.unsplash.com/photo-1583265397029-575ae20fc53a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        averagePrice: 25000,
        phone: "+225 27 20 22 21 00",
        openingHours: "12h-15h, 19h-23h",
        cuisineType: "AFRICAN",
        establishmentType: "GASTRONOMIC",
        dietTypes: ["HALAL"],
        isHalal: true,
      },
      {
        name: "Bushman Cafe",
        description:
          "Lieu iconique mêlant art, hôtellerie et gastronomie sur un rooftop végétalisé unique.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Cocody Riviera",
        address: "Riviera 3",
        latitude: 5.352,
        longitude: -3.974,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Riviera 3, près du Lycée Français. Cherche la maison couverte de plantes.",
        image:
          "https://images.unsplash.com/photo-1621275471769-e6aa344546d5?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        averagePrice: 15000,
        phone: "+225 07 48 48 48 48",
        openingHours: "09h-02h",
        cuisineType: "AFRICAN",
        establishmentType: "ROOFTOP",
        dietTypes: [],
      },
      {
        name: "Le Débarcadère",
        description:
          "Dîner au bord de la lagune dans un jardin paisible. Spécialités ivoiriennes et poissons braisés.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Treichville",
        address: "Front lagunaire",
        latitude: 5.295,
        longitude: -4.008,
        status: "VÉRIFIÉ",
        terrainLogic: "Front lagunaire de Treichville, Avenue Christiani.",
        image:
          "../images/food/debarcadere.png",
        averagePrice: 8000,
        phone: "+225 27 21 24 15 15",
        openingHours: "12h-00h",
        cuisineType: "AFRICAN",
        establishmentType: "RESTAURANT",
        dietTypes: ["HALAL"],
      },
      {
        name: "La Case Bleue",
        description:
          "Cuisine raffinée dans une ancienne maison coloniale restaurée au cœur du quartier historique de Bassam.",
        cityId: getCityId("Grand-Bassam"),
        neighborhood: "Quartier France",
        address: "Quartier France",
        latitude: 5.195,
        longitude: -3.738,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Quartier France, sur la route de la plage. Cherche la grande maison bleue.",
        image:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
        averagePrice: 12000,
        phone: "+225 21 30 14 00",
        openingHours: "12h-22h",
        cuisineType: "EUROPEAN",
        establishmentType: "RESTAURANT",
        dietTypes: [],
      },
      {
        name: "Ô Feu de Bois",
        description:
          "Réputé pour les meilleures grillades au feu de bois de Marcory dans une ambiance conviviale.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Marcory Zone 4",
        address: "Zone 4, Boulevard de Marseille",
        latitude: 5.308,
        longitude: -3.999,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Zone 4, Boulevard de Marseille. Près de la station Shell.",
        image:
          "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80",
        averagePrice: 7000,
        phone: "+225 07 07 07 07 07",
        openingHours: "12h-23h",
        cuisineType: "AFRICAN",
        establishmentType: "RESTAURANT",
        dietTypes: [],
      },
      {
        name: "Kajazoma",
        description:
          "Restaurant niché dans un jardin rempli d'œuvres d'art. Une parenthèse enchantée de calme et de saveurs.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Deux Plateaux",
        address: "Deux Plateaux Vallon",
        latitude: 5.372,
        longitude: -3.992,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Deux Plateaux Vallon. Entrée discrète derrière un mur blanc.",
        image:
          "../images/food/kajazoma.png",
        averagePrice: 10000,
        phone: "+225 27 22 41 78 85",
        openingHours: "11h-22h",
        cuisineType: "AFRICAN",
        establishmentType: "RESTAURANT",
        dietTypes: [],
      },
      {
        name: "La Villa Alfira",
        description:
          "Cadre magnifique avec piscine et verdure, réputé pour son calme et sa cuisine de qualité.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Cocody",
        address: "Cocody II Plateaux, Rue L34",
        latitude: 5.361,
        longitude: -3.988,
        status: "VÉRIFIÉ",
        terrainLogic: "Cocody II Plateaux, Rue L34. En face de l'ENA.",
        image:
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
        averagePrice: 15000,
        phone: "+225 27 22 41 41 41",
        openingHours: "07h-23h",
        cuisineType: "EUROPEAN",
        establishmentType: "RESTAURANT",
        dietTypes: [],
      },
      {
        name: "Chez Tantie Alice",
        description:
          "Institution abobolaise depuis 1991. Foutou, sauce graine et kedjenou inimitables.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Abobo",
        address: "Abobo, derrière le marché",
        latitude: 5.42,
        longitude: -4.01,
        status: "VÉRIFIÉ",
        terrainLogic: "Abobo, derrière le marché. Sous le grand manguier.",
        image:
          "../images/food/foutou_sauce_graine.png",
        averagePrice: 2500,
        phone: "+225 07 000 0005",
        openingHours: "11h-15h",
        cuisineType: "AFRICAN",
        establishmentType: "RESTAURANT",
        dietTypes: ["HALAL"],
      },
      {
        name: "Le Petit Bateau",
        description:
          "Terrasse sur pilotis face à la lagune. Poisson braisé et ambiance détendue.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Cocody Riviera",
        address: "Cocody Riviera 2, bord de lagune",
        latitude: 5.365,
        longitude: -3.96,
        status: "VÉRIFIÉ",
        terrainLogic: "Cocody Riviera 2, bord de lagune. Cherche la jetée.",
        image:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
        averagePrice: 4500,
        phone: "+225 07 000 0006",
        openingHours: "12h-22h",
        cuisineType: "AFRICAN",
        establishmentType: "RESTAURANT",
        dietTypes: ["PESCATARIAN"], // ✅ Poisson uniquement
      },
      {
        name: "Maquis de l'École Forestière",
        description:
          "Dégustez un poulet braisé sous les arbres géants du Parc du Banco.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Parc du Banco",
        address: "Parc du Banco, près de l'école forestière",
        latitude: 5.387,
        longitude: -4.058,
        status: "VÉRIFIÉ",
        terrainLogic: "Au cœur du Parc du Banco, près de l'école forestière.",
        image:
          "../images/food/poulet_braise.png",
        averagePrice: 3000,
        phone: "+225 07 000 0007",
        openingHours: "11h-17h",
        cuisineType: "AFRICAN",
        establishmentType: "STREET_FOOD", // ✅ C'est un maquis
        dietTypes: [],
      },
      {
        name: "Chez Marcène",
        description:
          "L'institution du Plateau pour les amateurs d'Aloco et de poisson grillé. Une ambiance feutrée où se croisent hommes d'affaires et habitués depuis des décennies.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Le Plateau",
        address: "En face de la Pyramide",
        latitude: 5.325,
        longitude: -4.018,
        status: "VÉRIFIÉ",
        terrainLogic:
          "En face de la Pyramide, petite porte en bois sous les grands arbres.",
        image:
          "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
        averagePrice: 8000,
        phone: "+225 07 07 07 07 01",
        openingHours: "11h-23h",
        cuisineType: "AFRICAN",
        establishmentType: "RESTAURANT",
        dietTypes: ["HALAL"],
      },
      {
        name: "Le Grand Large",
        description:
          "Les pieds dans l'eau, littéralement. Connu pour ses écrevisses et sa carpe braisée géante. Le coucher de soleil y est légendaire.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Marcory Biétry",
        address: "Au bout de la rue des Majorettes",
        latitude: 5.295,
        longitude: -3.985,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Au bout de la rue des Majorettes, descends les escaliers vers la lagune.",
        image:
          "https://images.unsplash.com/photo-1653067406276-56e0c78e2984?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        averagePrice: 12000,
        phone: "+225 07 07 07 07 02",
        openingHours: "12h-00h",
        cuisineType: "AFRICAN",
        establishmentType: "GASTRONOMIC",
        dietTypes: ["PESCATARIAN"], // ✅ Poissons et fruits de mer
      },
      {
        name: "Allocodrome de Cocody",
        description:
          "Le cœur battant de la nuit Abidjanaise. Des dizaines de stands proposant l'authentique Aloco, l'Attiéké et les grillades au charbon de bois.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Cocody Cité des Arts",
        address: "Derrière l'Eglise St Jean",
        latitude: 5.348,
        longitude: -3.998,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Derrière l'Eglise St Jean. Suis l'odeur du piment et les chants des vendeuses.",
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
        averagePrice: 2500,
        phone: "Direct terrain",
        openingHours: "18h-03h",
        cuisineType: "AFRICAN",
        establishmentType: "STREET_FOOD",
        dietTypes: ["HALAL"],
      },
      {
        name: "Maquis Chez Bintou",
        description:
          "La pause déjeuner préférée des travailleurs du Plateau pour ses plats du jour authentiques.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Le Plateau",
        address: "Derrière la mairie du Plateau",
        latitude: 5.32,
        longitude: -4.02,
        status: "VÉRIFIÉ",
        terrainLogic: "Derrière la mairie du Plateau, 2ème impasse à droite.",
        image:
          "https://images.unsplash.com/photo-1592011432621-f7f576f44484?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        averagePrice: 1500,
        phone: "+225 07 000 000 09",
        openingHours: "11h30-14h30",
        cuisineType: "AFRICAN",
        establishmentType: "STREET_FOOD",
        dietTypes: ["HALAL"],
      },
      {
        name: "Texas Grillz",
        description:
          "Le temple du burger et de la viande grillée. Ne vous fiez pas à l'entrée discrète, la qualité est au rendez-vous pour les amateurs de vrais steaks.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Marcory Zone 4",
        address: "Zone 4, Rue du Docteur Blanchard",
        latitude: 5.305,
        longitude: -3.992,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Zone 4, Rue du Docteur Blanchard. Petite enseigne lumineuse rouge.",
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
        averagePrice: 6500,
        phone: "+225 07 58 22 22 22",
        openingHours: "11h-23h",
        cuisineType: "AMERICAN",
        establishmentType: "FAST_FOOD",
        dietTypes: [],
      },
      {
        name: "Le Méchoui",
        description:
          "L'un des meilleurs libanais d'Abidjan. Situé en bordure de lagune, c'est l'endroit idéal pour partager un assortiment de mezzes entre amis.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Marcory Zone 4",
        address: "Bord de lagune, rue des Selliers",
        latitude: 5.298,
        longitude: -3.995,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Bord de lagune, rue des Selliers. Juste après le pont de Gaulle en venant du Plateau.",
        image:
          "https://images.unsplash.com/photo-1746274394124-141a1d1c5af3?q=80&w=770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        averagePrice: 16500,
        phone: "+225 27 21 24 61 71",
        openingHours: "12h-00h",
        cuisineType: "OTHER",
        establishmentType: "RESTAURANT",
        dietTypes: ["HALAL"],
      },
      {
        name: "Maquis du Val",
        description:
          "Une étape incontournable à Abidjan. Cadre soigné tout en restant authentique, réputé pour son agouti et ses poissons braisés.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Deux Plateaux",
        address: "II Plateaux Vallon, rue des Jardins",
        latitude: 5.385,
        longitude: -4.002,
        status: "VÉRIFIÉ",
        terrainLogic:
          "II Plateaux Vallon, rue des Jardins. Grand parking surveillé à l'entrée.",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
        averagePrice: 11000,
        phone: "+225 27 22 41 41 81",
        openingHours: "11h-23h",
        cuisineType: "AFRICAN",
        establishmentType: "STREET_FOOD",
        dietTypes: [],
      },
      {
        name: "Nuit de Saigon",
        description:
          "Le doyen des restaurants vietnamiens d'Abidjan. Une cuisine constante et savoureuse dans un décor traditionnel apaisant.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Marcory Zone 4",
        address: "Zone 4, rue Pierre et Marie Curie",
        latitude: 5.312,
        longitude: -4.004,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Zone 4, rue Pierre et Marie Curie. En face de la pharmacie de la Zone 4.",
        image:
          "https://images.unsplash.com/photo-1594020292985-216a72a2c7ce?q=80&w=1762&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        averagePrice: 12500,
        phone: "+225 27 21 35 21 21",
        openingHours: "12h-14h30, 19h-22h30",
        cuisineType: "ASIAN",
        establishmentType: "RESTAURANT",
        dietTypes: [],
      },
      {
        name: "Sam's Abidjan",
        description:
          "L'endroit parfait pour les véritables amateurs de burgers artisanaux à Abidjan. Ambiance décontractée et générosité au rendez-vous.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Cocody",
        address: "Cocody, Rue Booker Washington",
        latitude: 5.348,
        longitude: -3.982,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Cocody, Rue Booker Washington. Près de la cité des arts.",
        image:
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80",
        averagePrice: 9500,
        phone: "+225 07 47 47 47 47",
        openingHours: "11h-22h",
        cuisineType: "AMERICAN",
        establishmentType: "RESTAURANT",
        dietTypes: [],
      },
      {
        name: "Le Tôa",
        description:
          "Probablement l'un des plus beaux rooftops d'Abidjan. Vue panoramique, ambiance trendy et cuisine raffinée pour une clientèle exigeante.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Marcory Zone 4",
        address: "Zone 4, Immeuble Massaï, dernier étage",
        latitude: 5.302,
        longitude: -3.998,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Zone 4, Immeuble Massaï, dernier étage. Service voiturier au pied de l'immeuble.",
        image:
          "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
        averagePrice: 25000,
        phone: "+225 27 21 21 21 21",
        openingHours: "18h-03h",
        cuisineType: "ASIAN",
        establishmentType: "ROOFTOP",
        dietTypes: [],
      },
      {
        name: "Indian Kitchen",
        description:
          "Le temple de la gastronomie indienne à Abidjan. Épices authentiques, naan traditionnels et une explosion de saveurs dans un cadre coloré.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Marcory Zone 4",
        address: "Zone 4, Boulevard de Marseille",
        latitude: 5.309,
        longitude: -4.001,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Zone 4, Boulevard de Marseille. Près du centre commercial Prima.",
        image:
          "https://images.unsplash.com/photo-1617692855027-33b14f061079?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        averagePrice: 12000,
        phone: "+225 07 09 09 09 09",
        openingHours: "12h-15h, 19h-23h",
        cuisineType: "INDIAN",
        establishmentType: "RESTAURANT",
        dietTypes: ["HALAL", "VEGETARIAN"], 
      },
      {
        name: "La Taverne Romaine",
        description:
          "Une institution italienne au Plateau. Les meilleures pizzas au feu de bois et pâtes fraîches de la ville depuis des décennies.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Le Plateau",
        address: "Plateau, Boulevard de la République",
        latitude: 5.321,
        longitude: -4.0175,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Plateau, Boulevard de la République. Juste à côté du stade Houphouët-Boigny.",
        image:
          "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80",
        averagePrice: 13000,
        phone: "+225 27 20 21 34 34",
        openingHours: "12h-15h, 19h-23h",
        cuisineType: "EUROPEAN",
        establishmentType: "RESTAURANT",
        dietTypes: [],
      },
      {
        name: "Espace Mima",
        description:
          "L'endroit idéal pour de l'attiéké-poisson braisé les pieds presque dans l'eau. Simple, authentique et très prisé le weekend.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Treichville",
        address: "Front lagunaire de Treichville, Avenue Christiani",
        latitude: 5.292,
        longitude: -3.997,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Front lagunaire de Treichville, Avenue Christiani. Suivre les drapeaux.",
        image:
          "https://images.unsplash.com/photo-1725393325387-07f0d4951528?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        averagePrice: 5000,
        phone: "+225 07 01 01 01 01",
        openingHours: "11h-00h",
        cuisineType: "AFRICAN",
        establishmentType: "RESTAURANT",
        dietTypes: ["HALAL"],
      },
      {
        name: "Meat In",
        description:
          "Pour les vrais amateurs de viande. Sélection de pièces d'exception cuites à la perfection.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Marcory Zone 4",
        address: "Zone 4, Boulevard de Marseille",
        latitude: 5.304,
        longitude: -3.99,
        status: "COMMUNAUTÉ",
        terrainLogic: "Zone 4, Boulevard de Marseille. En face de Cap Sud.",
        image:
          "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
        averagePrice: 18000,
        phone: "+225 05 05 05 05 05",
        openingHours: "12h-15h, 19h-23h",
         cuisineType: "AFRICAN",
        establishmentType: "RESTAURANT",
        dietTypes: [],
      },
      {
        name: "Le Kaiten",
        description:
          "Sushis frais et spécialités japonaises dans un cadre épuré et zen.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Cocody",
        address: "Cocody, Boulevard de France",
        latitude: 5.342,
        longitude: -4.008,
        status: "VÉRIFIÉ",
        terrainLogic: "Cocody, Boulevard de France. Immeuble Pavillon.",
        image:
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80",
        averagePrice: 14000,
        phone: "+225 27 22 41 82 82",
        openingHours: "12h-15h, 19h-23h",
         cuisineType: "ASIAN",
        establishmentType: "RESTAURANT",
        dietTypes: ["PESCATARIAN"],
      },
      {
        name: "Chez Miss Zahui",
        description:
          "L'adresse ultime pour les amateurs d'Attiéké-Poisson. Une cuisine 100% authentique dans un cadre populaire et chaleureux.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Riviera Cocody",
        address: "Riviera Cocody",
        latitude: 5.3697,
        longitude: -3.9606,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Riviera Cocody, demande l'Attiéké de Miss Zahui, tout le quartier connaît.",
        image:
          "../images/food/attieke_garba.png",
        averagePrice: 3500,
        phone: "+225 07 68 69 68 69",
        openingHours: "09h-18h",
        cuisineType: "AFRICAN",
        establishmentType: "STREET_FOOD",
        dietTypes: [],
      },
      {
        name: "Chez Ambroise",
        description:
          "Fondé en 1984, ce lieu est une légende de la nuit abidjanaise. Ouvert uniquement le soir pour des saveurs authentiques.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Marcory",
        address: "Marcory, rue F28",
        latitude: 5.3022,
        longitude: -3.9939,
        status: "VÉRIFIÉ",
        terrainLogic: "Marcory, rue F28. Demande le maquis d'Ambroise Kouakou.",
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
        averagePrice: 5000,
        phone: "+225 05 05 78 36 00",
        openingHours: "19h-02h",
        cuisineType: "AFRICAN",
        establishmentType: "STREET_FOOD",
        dietTypes: [],
      },
      {
        name: "The 414",
        description:
          "Restaurant-lounge en plein air situé à Angré. Cadre décontracté avec espace événementiel. Cuisine variée dans une ambiance tendance.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Angré",
        address: "Angré, non loin de la Pharmacie KABOD",
        latitude: 5.3833,
        longitude: -3.9667,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Angré, Cocody, non loin de la Pharmacie KABOD. Chercher l'enseigne The 414 dans la rue principale d'Angré.",
        image:
          "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80",
        averagePrice: 8500,
        openingHours: "12h-00h",
        cuisineType: "AFRICAN",
        establishmentType: "RESTAURANT",
        dietTypes: [],
      },
      {
        name: "The Jungle Restaurant",
        description:
          "Un concept végétalisé dépaysant en plein Koumassi. Une immersion nature avec une cuisine moderne.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Koumassi",
        address: "Boulevard du Gabon, Koumassi",
        latitude: 5.2989,
        longitude: -3.9811,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Boulevard du Gabon, Koumassi. Cherche la façade couverte de lianes.",
        image:
          "https://images.unsplash.com/photo-1727387563610-210b762f3d5a?q=80&w=768&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        averagePrice: 8500,
        phone: "+225 07 06 06 06 20",
        openingHours: "12h-00h",
        cuisineType: "EUROPEAN",
        establishmentType: "RESTAURANT",
        dietTypes: [],
      },
      {
        name: "Casa 60",
        description:
          "Une cuisine soignée dans un cadre agréable aux Deux Plateaux. Réputé pour son ambiance et sa carte variée.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Deux Plateaux Vallon",
        address: "Rue des Jardins, en face de la station Ola",
        latitude: 5.3761,
        longitude: -3.9933,
        status: "VÉRIFIÉ",
        terrainLogic: "Rue des Jardins, en face de la station Ola.",
        image:
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
        averagePrice: 15000,
        openingHours: "08h-23h",
        cuisineType: "EUROPEAN",
        establishmentType: "RESTAURANT",
        dietTypes: [],
      },
      {
        name: "Vandal",
        description:
          "Concept urbain et décalé au Garden Plaza. Ambiance jeune et créative dans un cadre tendance.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Angré",
        address: "Garden Plaza, Boulevard des Martyrs, Angré",
        latitude: 5.3856,
        longitude: -3.9644,
        status: "VÉRIFIÉ",
        terrainLogic:
          "Garden Plaza, Boulevard des Martyrs, Angré. Chercher Vandal Plaza.",
        image:
          "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80",
        averagePrice: 10000,
        openingHours: "12h-00h",
        cuisineType: "EUROPEAN",
        establishmentType: "RESTAURANT",
        dietTypes: [],
      },
      {
        name: "Tulum",
        description:
          "Le Mexique s'invite sur les toits d'Abidjan. Vue imprenable et saveurs latines orchestrées par Jorge Leon.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Zone 4",
        address: "Rooftop Zone 4, près de l'immeuble Massaï",
        latitude: 5.3011,
        longitude: -3.9944,
        status: "COMMUNAUTÉ",
        terrainLogic:
          "Rooftop en Zone 4, demande le 'Tulum' près de l'immeuble Massaï.",
        image:
          "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80",
        averagePrice: 18000,
        openingHours: "18h-02h",
        cuisineType: "OTHER",
        establishmentType: "ROOFTOP",
        dietTypes: [],
      },

       // ── PÂTISSERIES & DESSERTS ──
      {
        name: "Dipndip",
        description:
          "Franchise internationale spécialisée dans les desserts trempés au chocolat fondu. Crêpes, gaufres, fruits enrobés.",
        cityId: getCityId("Abidjan"),
        address: "Abidjan Mall, Cocody",
        latitude: 5.3689,
        longitude: -3.9756,
        
        cuisineType: "EUROPEAN",
        establishmentType: "PATISSERIE",
        dietTypes: [],
        
        image:
          "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
        averagePrice: 5000,
        openingHours: "10h-21h",
      },
      {
        name: "Zes't Pâtisserie",
        description:
          "Pâtisserie franco-ivoirienne du chef Mahdi Tajeddine. Forêt blanche, glaces maison et baguettes.",
        cityId: getCityId("Abidjan"),
        address: "Rue du Lycée Technique, Vieux Cocody",
        latitude: 5.3544,
        longitude: -4.0067,
        
        cuisineType: "EUROPEAN",
        establishmentType: "PATISSERIE",
        dietTypes: [],
        
        image:
          "https://images.unsplash.com/photo-1702742400971-10b0c41a11a7?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        averagePrice: 4500,
        phone: "+225 09 48 48 69",
        openingHours: "07h-20h",
      },
      {
        name: "Pâtisserie Nael Taan",
        description:
          "Pâtisserie au design scandinave épuré, fondée par un chef formé chez Pierre Hermé à Paris.",
        cityId: getCityId("Abidjan"),
        address: "Boulevard de France, Cocody",
        latitude: 5.3467,
        longitude: -3.9978,
        
        cuisineType: "EUROPEAN",
        establishmentType: "PATISSERIE",
        dietTypes: [],
        
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
        averagePrice: 8000,
        openingHours: "06h30-20h",
      },
      {
        name: "Nice Cream — Zone 4",
        description:
          "Glacier artisanal proposant des crèmes glacées originales et créatives.",
        cityId: getCityId("Abidjan"),
        address: "Rue Paul Langevin, Zone 4",
        latitude: 5.3011,
        longitude: -3.9950,
        
        cuisineType: "OTHER",
        establishmentType: "PATISSERIE",
        dietTypes: [],
        
        image:
          "https://images.unsplash.com/photo-1629385701021-fcd568a743e8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        averagePrice: 3500,
        phone: "+225 07 57 82 57 82",
        openingHours: "11h-22h",
      },
      {
        name: "Des Gâteaux et du Pain",
        description:
          "Chaîne ivoirienne bien établie. Pains artisanaux, viennoiseries et pâtisseries du quotidien.",
        cityId: getCityId("Abidjan"),
        address: "Zone 4",
        latitude: 5.3022,
        longitude: -3.9939,
        
        cuisineType: "EUROPEAN",
        establishmentType: "PATISSERIE",
        dietTypes: [],
        
        image:
          "https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        averagePrice: 2500,
        openingHours: "07h-21h",
      },
        {
        name: "La Parisienne",
        description:
          "Pour un petit-déjeuner ou un déjeuner rapide à la française. Les meilleurs croissants et pains chocolat de la ville.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Cocody",
        address: "Cocody, Cité des Arts, près du carrefour de la vie",
        latitude: 5.34,
        longitude: -4.012,
        status: "VÉRIFIÉ",
        terrainLogic: "Cocody, Cité des Arts, près du carrefour de la vie.",
        image:
          "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=800&q=80",
        averagePrice: 7000,
        phone: "+225 27 22 44 44 44",
        openingHours: "06h-21h",
        cuisineType: "EUROPEAN",
        establishmentType: "PATISSERIE",
        dietTypes: [],
      },
      {
        name: "Café des Jardins",
        description:
          "Menu saisonnier avec ingrédients frais et locaux. Cadre intimiste idéal pour le petit déjeuner ou le brunch.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Deux Plateaux",
        address: "Rue des Jardins, Deux Plateaux",
        latitude: 5.3761,
        longitude: -3.9944,
        status: "VÉRIFIÉ",
        terrainLogic: "Rue des Jardins, Deux Plateaux. Menu saisonnier.",
        image:
          "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        averagePrice: 9000,
        openingHours: "07h30-22h30",
        cuisineType: "EUROPEAN",
        establishmentType: "PATISSERIE",
        dietTypes: [],
      },
      {
        name: "Nice Cream — Deux Plateaux",
        description:
          "Deuxième adresse de Nice Cream dans la rue des Jardins.",
        cityId: getCityId("Abidjan"),
        address: "Rue des Jardins, Deux Plateaux Vallon",
        latitude: 5.3761,
        longitude: -3.9944,
        
        cuisineType: "OTHER",
        establishmentType: "PATISSERIE",
        dietTypes: [],
        
        image:
          "https://images.unsplash.com/photo-1629385701021-fcd568a743e8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        averagePrice: 3500,
        phone: "+225 07 49 00 61 00",
        openingHours: "11h-22h",
      },
    ],
  });



  // ── ACTIVITIES ──
  await prisma.activity.createMany({
    data: [
      {
        name: "Musée des Civilisations de Côte d'Ivoire",
        description:
          "Plus de 15 000 pièces retraçant l'histoire et les arts des peuples de Côte d'Ivoire.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Le Plateau",
        address: "Boulevard de la République",
        latitude: 5.323,
        longitude: -4.018,
        status: "VÉRIFIÉ",
        image:
          "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&q=80",
        price: 2000,
        telephone: "+225 27 000 0010",
        openingHours: "09h-17h",
        duration: "2h",
        category: "CULTURE",
      },
      {
        name: "Parc National du Banco",
        description:
          "Véritable poumon vert au cœur d'Abidjan, forêt tropicale dense et sentiers de randonnée.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Yopougon",
        address: "Autoroute du Nord",
        latitude: 5.387,
        longitude: -4.058,
        status: "VÉRIFIÉ",
        image:
          "https://images.unsplash.com/photo-1504198266287-1659872e6590?w=800&q=80",
        price: 1000,
        openingHours: "07h-17h",
        duration: "Demi-journée",
        category: "NATURE",
      },
      {
        name: "BBR — Boulay Beach Resort",
        description:
          "Complexe hôtelier de luxe sur 2 hectares sur l'Île Boulay. Beach-club, hôtel, jet ski, paddle.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Île Boulay",
        address: "Île Boulay",
        latitude: 5.2833,
        longitude: -4.0333,
        status: "VÉRIFIÉ",
        image:
          "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
        price: 25000,
        telephone: "+225 01 50 00 50 00",
        openingHours: "09h-18h",
        category: "BEACH",
      },
      {
        name: "Domaine Bini — Forêt",
        description:
          "Domaine écotouristique en forêt à 50 min d'Abidjan. Formule Découverte : nature et dégustation.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Autoroute du Nord",
        address: "Autoroute du Nord",
        latitude: 5.5,
        longitude: -4.0167,
        status: "VÉRIFIÉ",
        image:
          "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
        price: 18000,
        website: "https://www.domainebini.org",
        openingHours: "9h-17h",
        category: "NATURE",
      },
      {
        name: "CAVA",
        description:
          "Centre Artisanal de la Ville d'Abidjan : villages d'ateliers d'artisans locaux.",
        cityId: getCityId("Abidjan"),
        neighborhood: "Treichville",
        address: "Boulevard de Marseille",
        latitude: 5.298,
        longitude: -3.998,
        status: "VÉRIFIÉ",
        image:
          "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80",
        price: 0,
        openingHours: "08h-18h",
        duration: "2h",
        category: "SHOPPING",
      },
    ],
  });

  console.log("Hotels, Restaurants, and Activities created");

  console.log(
    "User created with email: aminata.toure@example.com and password: password123",
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
