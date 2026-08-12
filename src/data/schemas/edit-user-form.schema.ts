import { z } from "zod"

export const editUserFormSchema = z.object({
  name: z.string()
    .min(2, { message: "Seu nome deve ter no mínimo 2 caracteres." })
    .optional()
    .or(z.literal("")),
  email: z.string({ message: "Digite um email válido." })
    .optional()
    .or(z.literal("")),
  phone: z.string({ message: "Por favor, informe um telefone válido." })
    .length(11, { message: "Informe um telefone válido com 11 dígitos." })
    .optional()
    .or(z.literal("")),
  password: z.string()
    .min(8, { message: "A senha deve conter no mínimo 8 caracteres." })
    .max(256, { message: "A senha deve conter no máximo 256 caracteres." })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&=+-_#])[A-Za-z\d@$!%*?&=+-_#]{8,}$/, { message: "A senha não corresponde ao padrão exigido. Pelo menos 1 letra, 1 número e 1 caractere especial." })
    .optional()
    .or(z.literal(""))
});
