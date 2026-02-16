import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function withErrorHandling(handler: Function) {
  return async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (error: any) {
      console.error("API Error:", error);

      if (error instanceof ZodError) {
        return NextResponse.json(
          { 
            error: "Erreur de validation", 
            details: error.issues.map(e => ({ path: e.path, message: e.message })) 
          },
          { status: 400 }
        );
      }

      // Erreur Prisma (ex: doublon d'email)
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: "Cette ressource existe déjà (contrainte d'unicité violée)" },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: "Une erreur interne est survenue", details: error.message },
        { status: 500 }
      );
    }
  };
}
