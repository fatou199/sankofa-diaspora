import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyPassword, createToken } from "@/lib/auth";
import { LoginSchema } from "@/lib/validations";
import { withErrorHandling } from "@/lib/api-wrapper";

export const POST = withErrorHandling(async (request: Request) => {
  const body = await request.json();
  
  // Validation
  const { email, password } = LoginSchema.parse(body);

  // Recherche utilisateur
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return NextResponse.json(
      { error: "Identifiants invalides" },
      { status: 401 }
    );
  }

  // Vérification mot de passe
  const isPasswordValid = await verifyPassword(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json(
      { error: "Identifiants invalides" },
      { status: 401 }
    );
  }

  // Création du Token
  const token = await createToken({ 
    userId: user.id, 
    email: user.email 
  });

  const { password: _, ...userWithoutPassword } = user;

  return NextResponse.json({
    user: userWithoutPassword,
    token
  });
});
