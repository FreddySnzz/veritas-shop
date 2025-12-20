import { z } from "zod"

export const formSchema = z.object({
  name: z.string().min(2, { message: "Seu nome deve ter no mínimo 2 caracteres." }),
  email: z.email({ message: "Digite um email válido." }),
  message: z.string().min(2, { message: "Sua mensagem deve ter no mínimo 2 caracteres." }),
});
