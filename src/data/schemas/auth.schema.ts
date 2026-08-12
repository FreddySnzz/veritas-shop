import { z } from "zod";

export const authUserSchema = z.object({
  phone: z.number().min(11, "Informe um telefone no formato (DDD) 9 1234-5678").max(11, "Informe um telefone válido"),
  password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres").max(256, "A senha deve conter no máximo 256 caracteres"),
});