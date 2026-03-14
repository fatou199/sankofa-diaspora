export async function GET (request: Request) {
    return Response.json({ message: "Récupération de tout les avis"});
}

export async function POST(request: Request) {
    const body = await request.json();
    return Response.json({ message: "Création d'un nouveau avis", data: body
    })
}