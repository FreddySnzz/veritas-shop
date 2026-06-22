import { z } from "zod";

export const authUserSchema = z.object({
  phone: z.number().min(11, "Informe um telefone no formato (DDD) 9 1234-5678").max(11, "Informe um telefone válido"),
});

// export const registerUserSchema = z
//   .object({
//     phone: z.string().min(11, "Informe um telefone válido").max(11, "Informe um telefone válido"),
//   })

// export type RegisterUserFormData = z.infer<typeof authUserSchema>;
// export type RegisterUserFormData = z.infer<typeof registerUserSchema>;