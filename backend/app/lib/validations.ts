import { z } from "zod";

export const UserSchema = z.object({
  lastName: z.string().min(2, "Le nom est trop court"),
  firstName: z.string().min(2, "Le prénom est trop court"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères"),
  diasporaCountry: z.string(),
  originDetails: z.string().optional(),
  originCountryIds: z.array(z.number().int()).optional(),
});

export const ActivitySchema = z.object({
  name: z.string().min(2),
  description: z.string(),
  price: z.number().nonnegative(),
  openingHours: z.string(),
  category: z.enum(["SPORT", "CULTURE", "GASTRONOMY", "NATURE", "LEISURE", "HISTORY", "ART", "ADVENTURE", "RELAXATION", "OTHER"]),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  cityId: z.number().int(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
