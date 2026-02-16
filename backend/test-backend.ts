
const BASE_URL = "http://localhost:3000/api";

async function testBackend() {
  console.log("--- Début des tests backend ---");

  try {
    // 1. Tester la récupération des pays (Public)
    console.log("\n1. Test GET /api/pays...");
    const resPays = await fetch(`${BASE_URL}/pays`);
    console.log("Statut:", resPays.status);
    if (resPays.ok) console.log("Succès: Pays récupérés");

    // 2. Tester l'erreur de login (Cas limite)
    console.log("\n2. Test POST /api/users/login (Mauvais identifiants)...");
    const resLoginFail = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@fail.com", password: "wrong_password" })
    });
    const dataFail = await resLoginFail.json();
    console.log("Statut:", resLoginFail.status);
    console.log("Erreur attendue:", dataFail.error);

    // 3. Tester la validation (Cas limite)
    console.log("\n3. Test POST /api/users (Validation échouée)...");
    const resValFail = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "pas_un_email", nom: "" })
    });
    const dataVal = await resValFail.json();
    console.log("Statut:", resValFail.status);
    console.log("Détails validation:", JSON.stringify(dataVal.details));

    // 4. Tester la protection Middleware
    console.log("\n4. Test POST /api/activite (Sans token - Devrait échouer)...");
    const resAuthFail = await fetch(`${BASE_URL}/activite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom: "Test" })
    });
    console.log("Statut (Attendu 401):", resAuthFail.status);

  } catch (error) {
    console.error("Erreur pendant les tests:", error);
    console.log("Note: Assurez-vous que 'npm run dev' est bien lancé sur le port 3000.");
  }

  console.log("\n--- Fin des tests ---");
}

testBackend();
