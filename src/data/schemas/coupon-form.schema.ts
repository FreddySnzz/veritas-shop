import { z } from "zod"

const statusOptions = ['active', 'expired'];
const typeOptions = ['percentage', 'fixed', 'free_shipping'];

export const couponFormSchema = z.object({
  code: z.string()
    .min(2, { message: "O código do cupom deve ter no mínimo 2 caracteres." }),
  type: z.enum(typeOptions, { message: "O tipo do cupom deve ser informado." }),
  product_id: z.string()
    .optional()
    .or(z.literal("")),
  percentage: z.number({ message: "O valor do desconto deve ser maior que 0." })
    .int()
    .nonnegative()
    .optional()
    .or(z.literal("")),
  fixed_value: z.number({ message: "O valor fixo do desconto deve ser maior que 0." })
    .nonnegative()
    .optional()
    .or(z.literal("")),
  quantity: z.number()
    .int()
    .nonnegative()
    .min(1, { message: "A quantidade disponível deve ser maior que 0." }),
  minimum_value: z.number({ message: "O valor mínimo deve ser informado." })
    .int()
    .nonnegative(),
  status: z.enum(statusOptions, { message: "O status do cupom deve ser informado." }),
  apply_to_category: z.boolean({ message: "Deve ser informado se o cupom será aplicado a uma categoria ou ao produto." })
    .optional()
    .or(z.literal(false)),
  valid_until: z.string().regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
    "A data deve estar no formato YYYY-MM-DDTHH:mm (ex: 2026-08-01T14:16)"
  ),
});
