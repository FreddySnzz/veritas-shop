import { z } from "zod"

export const categoryFormSchema = z.object({
  name: z.string()
    .min(2, { message: "O nome da categoria deve ter no mínimo 2 caracteres." }),
  description: z.string({ message: "A descrição da categoria deve ter no mínimo 2 caracteres." })
    .optional()
    .or(z.literal("")),
  image_url: z.string({ message: "A URL imagem da categoria deve ser válida." })
    .optional()
    .or(z.literal("")),
});
