
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

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

  console.log('Database cleared');

  // Create Countries

  const coteDIvoire = await prisma.country.create({
    data: {
      name: 'Côte d’Ivoire',
      image: '/images/landscapes/cotedivoire.png',
      imageMap: '/images/maps/cote_ivoire.png',
      description: 'La perle des lagunes, un carrefour culturel entre modernité et traditions.',
      currency: 'FCFA',
      capital: 'Yamoussoukro',
      isoCode: 'CIV',
      officialLanguages: 'Français',
      population: '26M',
      bestPeriod: 'Décembre à Février',
      visaRequiredFR: true,
    },
  });

    const senegal = await prisma.country.create({
    data: {
      name: 'Sénégal',
      image: '/images/landscapes/senegal.png',
      imageMap: '/images/maps/senegal.png',
      description: 'La Terre de la Teranga, connue pour son hospitalité et sa culture vibrante.',
      currency: 'FCFA',
      capital: 'Dakar',
      isoCode: 'SEN',
      officialLanguages: 'Français, Wolof',
      population: '19M',
      bestPeriod: 'Novembre à Mai',
      visaRequiredFR: false,
    },
  });

  const mali = await prisma.country.create({
    data: {
      name: 'Mali',
      image: '/images/landscapes/mali.png',
      imageMap: '/images/maps/mali.png',
      description: 'Un pays riche en histoire, des manuscrits de Tombouctou aux falaises Dogon.',
      currency: 'FCFA',
      capital: 'Bamako',
      isoCode: 'MLI',
      officialLanguages: 'Bambara, Français',
      population: '20M',
      bestPeriod: 'Novembre à Février',
      visaRequiredFR: true,
    },
  });

  console.log('Countries created');

  // Create Cities
  await prisma.city.createMany({
    data: [
      // Côte d'Ivoire
      { name: 'Abidjan', description: 'Le cœur économique et ville multiculturelle bouillonnante.', latitude: 5.3600, longitude: -4.0083, countryId: coteDIvoire.id },
      { name: 'Yamoussoukro', description: 'Capitale politique connue pour sa majestueuse basilique.', latitude: 6.8167, longitude: -5.2833, countryId: coteDIvoire.id },
      { name: 'Bouaké', description: 'Carrefour culturel et commercial du centre.', latitude: 7.6833, longitude: -5.0333, countryId: coteDIvoire.id },
      { name: 'San-Pédro', description: 'Deuxième grand port, porte d\'entrée régionale.', latitude: 4.7500, longitude: -6.6333, countryId: coteDIvoire.id },
      { name: 'Korhogo', description: 'La cité du Poro, grand centre culturel du nord.', latitude: 9.4500, longitude: -5.6333, countryId: coteDIvoire.id },
      { name: 'Daloa', description: 'Importante ville agricole dans l\'ouest.', latitude: 6.8833, longitude: -6.4500, countryId: coteDIvoire.id },
      { name: 'Man', description: 'La ville aux 18 montagnes, réputée pour sa cascade et sa forêt.', latitude: 7.4125, longitude: -7.5536, countryId: coteDIvoire.id },
      { name: 'Grand-Bassam', description: 'Ancienne capitale coloniale, patrimoine mondial de l\'UNESCO.', latitude: 5.2000, longitude: -3.7333, countryId: coteDIvoire.id },
      { name: 'Assinie', description: 'Station balnéaire célèbre pour ses plages paradisiaques.', latitude: 5.1333, longitude: -3.2833, countryId: coteDIvoire.id },
      { name: 'Bingerville', description: 'Ville historique proche d\'Abidjan, connue pour son jardin botanique.', latitude: 5.3500, longitude: -3.8833, countryId: coteDIvoire.id },

       // Sénégal
      { name: 'Dakar', description: 'Capitale dynamique et pôle culturel bouillonnant.', latitude: 14.7167, longitude: -17.4677, countryId: senegal.id },
      { name: 'Saint-Louis', description: 'Ville historique, ancienne capitale au charme colonial.', latitude: 16.0244, longitude: -16.5047, countryId: senegal.id },
      { name: 'Ziguinchor', description: 'Porte d\'entrée de la Casamance, région verdoyante.', latitude: 12.5833, longitude: -16.2667, countryId: senegal.id },
      { name: 'Thiès', description: 'Carrefour ferroviaire et ville de l\'artisanat tapissier.', latitude: 14.7833, longitude: -16.9333, countryId: senegal.id },
      { name: 'Touba', description: 'Ville sainte et cœur spirituel du mouridisme.', latitude: 14.8667, longitude: -15.8833, countryId: senegal.id },
      { name: 'Mbour', description: 'Pôle économique majeur de la Petite Côte, réputé pour la pêche.', latitude: 14.4167, longitude: -16.9667, countryId: senegal.id },
      { name: 'Rufisque', description: 'Ville côtière au riche patrimoine architectural.', latitude: 14.7167, longitude: -17.2667, countryId: senegal.id },
      { name: 'Kaolack', description: 'Grand centre de commerce de l\'arachide.', latitude: 14.1500, longitude: -16.0667, countryId: senegal.id },
      { name: 'Diourbel', description: 'Ville historique, ancien royaume du Baol.', latitude: 14.6500, longitude: -16.2333, countryId: senegal.id },
      { name: 'Tambacounda', description: 'Plus grande ville de l\'est, porte d\'entrée du parc Niokolo-Koba.', latitude: 13.7667, longitude: -13.7333, countryId: senegal.id },

      // Mali
      { name: 'Bamako', description: 'Capitale animée sur les rives du fleuve Niger.', latitude: 12.6392, longitude: -8.0029, countryId: mali.id },
      { name: 'Sikasso', description: 'Grand centre agricole et carrefour du grand sud.', latitude: 11.3167, longitude: -5.6667, countryId: mali.id },
      { name: 'Ségou', description: 'La majestueuse cité des balanzans sur le bord du fleuve.', latitude: 13.4333, longitude: -6.2667, countryId: mali.id },
      { name: 'Mopti', description: 'La Venise du Mali, au carrefour du Niger et du Bani.', latitude: 14.4833, longitude: -4.1833, countryId: mali.id },
      { name: 'Kayes', description: 'La cocotte-minute d\'Afrique, ville frontière vers l\'ouest.', latitude: 14.4333, longitude: -11.4333, countryId: mali.id },
      { name: 'Gao', description: 'Ancienne capitale de l\'empire songhaï, aux portes du désert.', latitude: 16.2667, longitude: -0.0500, countryId: mali.id },
      { name: 'Tombouctou', description: 'La ville aux 333 saints, mythe sahélien et carrefour des caravanes.', latitude: 16.7667, longitude: -3.0000, countryId: mali.id },
      { name: 'Koutiala', description: 'La capitale de l\'or blanc (coton).', latitude: 12.3833, longitude: -5.4667, countryId: mali.id },
      { name: 'Kati', description: 'Ville militaire et stratégique aux abords de Bamako.', latitude: 12.7333, longitude: -8.0667, countryId: mali.id },
      { name: 'Djenné', description: 'Ville historique, célèbre par sa mosquée en banco.', latitude: 13.9000, longitude: -4.5500, countryId: mali.id }
    ]
  });

  console.log('Cities created');

  // Create a Sample User
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.create({
    data: {
      lastName: 'Toure',
      firstName: 'Aminata',
      email: 'aminata.toure@example.com',
      password: hashedPassword,
      diasporaCountry: 'France',
      originDetails: 'Abidjan, Côte d\'Ivoire',
      origins: {
        connect: [{ id: coteDIvoire.id }]
      }
    },
  });

  console.log('User created with email: aminata.toure@example.com and password: password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
