import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { UserSchema } from "@/lib/validations";
import { withErrorHandling } from "@/lib/api-wrapper";

export const POST = withErrorHandling(async (request: Request) => {
  const body = await request.json();
  
  // Validation Zod
  const validatedData = UserSchema.parse(body);

  // Hashage du mot de passe
  const hashedPassword = await hashPassword(validatedData.password);

  const user = await prisma.user.create({
    data: {
      ...validatedData,
      password: hashedPassword
    }
  });

  const { password, ...userWithoutPassword } = user;
  return NextResponse.json(userWithoutPassword, { status: 201 });
});
