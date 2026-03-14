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
  const { password, originCountryIds, ...userData } = validatedData;
  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
      origins: originCountryIds ? {
        connect: originCountryIds.map((id: number) => ({ id }))
      } : undefined
    }
  });

  const { password: _pw, ...userWithoutPassword } = user;
  return NextResponse.json(userWithoutPassword, { status: 201 });
});
