import { z } from "zod"

export const authFormSchema = z.object({
  name: z.string()
    .min(2, { message: "Seu nome deve ter no mínimo 2 caracteres." }),
  email: z.string({ message: "Digite um email válido." })
    .optional()
    .or(z.literal("")),
  phone: z.string()
    .length(11, { message: "Informe um telefone válido com 11 dígitos." }),
  password: z.string()
    .min(8, { message: "A senha deve conter no mínimo 8 caracteres." })
    .max(256, { message: "A senha deve conter no máximo 256 caracteres." })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: "A senha não corresponde ao padrão exigido." }),
});
