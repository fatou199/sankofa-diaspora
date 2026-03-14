import { NextResponse } from "next/server";

// Cache en mémoire (24h)
let cachedData: Map<string, Map<string, string>> | null = null;
let cacheTime = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000;

// Source : passport-index-dataset by ilyankou (open source)
const DATA_URL = "https://raw.githubusercontent.com/ilyankou/passport-index-dataset/master/passport-index-tidy.csv";

// Mapping noms français → noms anglais du dataset
const frToEn: Record<string, string> = {
    "France": "France",
    "Belgique": "Belgium",
    "Canada": "Canada",
    "Royaume-Uni": "United Kingdom",
    "Suisse": "Switzerland",
    "États-Unis": "United States",
    "Afrique du Sud": "South Africa",
    "Algérie": "Algeria",
    "Angola": "Angola",
    "Bénin": "Benin",
    "Botswana": "Botswana",
    "Burkina Faso": "Burkina Faso",
    "Burundi": "Burundi",
    "Cabo Verde": "Cape Verde",
    "Cameroun": "Cameroon",
    "Centrafrique": "Central African Republic",
    "Comores": "Comoros",
    "Congo (Brazzaville)": "Congo",
    "Congo (RDC)": "DR Congo",
    "Côte d'Ivoire": "Ivory Coast",
    "Djibouti": "Djibouti",
    "Égypte": "Egypt",
    "Érythrée": "Eritrea",
    "Eswatini": "Swaziland",
    "Éthiopie": "Ethiopia",
    "Gabon": "Gabon",
    "Gambie": "Gambia",
    "Ghana": "Ghana",
    "Guinée": "Guinea",
    "Guinée-Bissau": "Guinea-Bissau",
    "Guinée équatoriale": "Equatorial Guinea",
    "Kenya": "Kenya",
    "Lesotho": "Lesotho",
    "Libéria": "Liberia",
    "Libye": "Libya",
    "Madagascar": "Madagascar",
    "Malawi": "Malawi",
    "Mali": "Mali",
    "Maroc": "Morocco",
    "Maurice": "Mauritius",
    "Mauritanie": "Mauritania",
    "Mozambique": "Mozambique",
    "Namibie": "Namibia",
    "Niger": "Niger",
    "Nigeria": "Nigeria",
    "Ouganda": "Uganda",
    "Rwanda": "Rwanda",
    "São Tomé-et-Príncipe": "Sao Tome and Principe",
    "Sénégal": "Senegal",
    "Seychelles": "Seychelles",
    "Sierra Leone": "Sierra Leone",
    "Somalie": "Somalia",
    "Soudan": "Sudan",
    "Soudan du Sud": "South Sudan",
    "Tanzanie": "Tanzania",
    "Tchad": "Chad",
    "Togo": "Togo",
    "Tunisie": "Tunisia",
    "Zambie": "Zambia",
    "Zimbabwe": "Zimbabwe",
};

async function getPassportData(): Promise<Map<string, Map<string, string>>> {
    if (cachedData && Date.now() - cacheTime < CACHE_DURATION) {
        return cachedData;
    }

    const res = await fetch(DATA_URL, {
        next: { revalidate: 86400 },
    });

    if (!res.ok) throw new Error(`Échec chargement passport-index : ${res.status}`);

    const text = await res.text();
    const lines = text.trim().split("\n");

    const data = new Map<string, Map<string, string>>();

    for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(",");
        if (parts.length < 3) continue;
        const passport = parts[0].trim();
        const destination = parts[1].trim();
        const requirement = parts.slice(2).join(",").trim(); // gère les virgules dans les valeurs

        if (!data.has(passport)) data.set(passport, new Map());
        data.get(passport)!.set(destination, requirement);
    }

    cachedData = data;
    cacheTime = Date.now();
    return data;
}

function mapRequirement(req: string, destFr: string): { status: string; info: string } {
    const r = req.toLowerCase().trim();

    if (r === "visa required") {
        return {
            status: "visa",
            info: `Visa obligatoire avant le départ vers ${destFr}. Contactez l'ambassade ou le consulat.`,
        };
    }
    if (r === "visa on arrival" || r === "voa") {
        return {
            status: "visa_arrivee",
            info: `Visa obtenu à l'arrivée à ${destFr}. Prévoir les documents requis et les frais.`,
        };
    }
    if (r === "e-visa" || r === "eta") {
        return {
            status: "evisa",
            info: `eVisa ou autorisation électronique requise pour entrer à ${destFr}. Demande en ligne avant le départ.`,
        };
    }
    if (r === "freedom of movement") {
        return {
            status: "libre",
            info: `Libre circulation — aucune restriction d'entrée vers ${destFr}.`,
        };
    }
    if (!isNaN(Number(r)) && Number(r) > 0) {
        return {
            status: "libre",
            info: `Accès sans visa jusqu'à ${r} jours à ${destFr}.`,
        };
    }
    return {
        status: "inconnu",
        info: `Statut : "${req}". Veuillez vérifier auprès de l'ambassade de ${destFr}.`,
    };
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const passportFr = searchParams.get("passport");
    const destinationFr = searchParams.get("destination");

    if (!passportFr || !destinationFr) {
        return NextResponse.json({ error: "Paramètres manquants: passport et destination requis." }, { status: 400 });
    }

    // Normalisation des apostrophes typographiques (’) en apostrophes droites (')
    const normalize = (str: string) => str.replace(/’/g, "'");

    const passportEn = frToEn[normalize(passportFr)];
    const destinationEn = frToEn[normalize(destinationFr)];

    if (!passportEn) {
        return NextResponse.json({ status: "inconnu", info: `Passeport "${passportFr}" non trouvé dans la base.` });
    }
    if (!destinationEn) {
        return NextResponse.json({ status: "inconnu", info: `Destination "${destinationFr}" non trouvée dans la base.` });
    }

    try {
        const data = await getPassportData();
        const passportData = data.get(passportEn);

        if (!passportData) {
            return NextResponse.json({ status: "inconnu", info: `Aucune donnée pour le passeport ${passportFr}.` });
        }

        const requirement = passportData.get(destinationEn);

        if (!requirement) {
            return NextResponse.json({ status: "inconnu", info: `Aucune donnée pour ${passportFr} → ${destinationFr}.` });
        }

        const result = mapRequirement(requirement, destinationFr);
        return NextResponse.json({ ...result, raw: requirement, source: "passport-index-dataset" });

    } catch (error: any) {
        console.error("Erreur visa-check:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
