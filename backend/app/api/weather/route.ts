import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    if (!city) {
        return NextResponse.json({ error: 'City is required' }, { status: 400 });
    }

    try {
        // 1. Obtenir les coordonnées géographiques (Geocoding API de Open-Meteo qui est gratuit et sans clé)
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=fr&format=json`);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
           return NextResponse.json({ error: 'City not found' }, { status: 404 });
        }

        const { latitude, longitude } = geoData.results[0];

        // 2. Récupérer la météo en temps réel (Forecast API de Open-Meteo)
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`);
        const weatherData = await weatherRes.json();

        const currentTemp = Math.round(weatherData.current.temperature_2m);
        const weatherCode = weatherData.current.weather_code;

        // Mapping des codes WMO vers nos icônes internes
        // 0 = Soleil, 1-3 = Nuageux, 45+ = Pluie/Orage
        let condition = "Sun";
        if (weatherCode >= 1 && weatherCode <= 3) condition = "Cloud";
        if (weatherCode >= 51) condition = "CloudRain";

        return NextResponse.json({
            temp: currentTemp,
            condition,
            code: weatherCode
        });

    } catch (error) {
        console.error("Erreur météo:", error);
        return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
    }
}
