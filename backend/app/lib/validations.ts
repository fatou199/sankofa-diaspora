import { z } from "zod";

export const UserSchema = z.object({
  nom: z.string().min(2, "Le nom est trop court"),
  prenom: z.string().min(2, "Le prénom est trop court"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères"),
  diaspora_country: z.string(),
  origin_country_id: z.number().int(),
});

export const ActiviteSchema = z.object({
  nom: z.string().min(2),
  description: z.string(),
  prix: z.number().nonnegative(),
  horaire: z.string(),
  categorie: z.enum(["SPORT", "CULTURE", "GASTRONOMIE", "NATURE", "LOISIRS", "HISTOIRE", "ART", "AVENTURE", "RELAXATION", "AUTRE"]),
  adresse: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  ville_id: z.number().int(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
