import OrderModel from "../models/Orders.model";

export type OrderStatusType = 
  'awaiting_confirmation' | 
  'order_confirmed' |
  'awaiting_payment' | 
  'production' | 
  'crafted' | 
  'completed' | 
  'cancelled';

export const statusMap: Record<string, OrderModel["status"]> = {
  awaiting_confirmation: "Aguardando Confirmação",
  order_confirmed: "Pedido Confirmado",
  awaiting_payment: "Aguardando Pagamento",
  production: "Em Produção",
  crafted: "Confeccionado",
  completed: "Entregue",
  cancelled: "Cancelado"
};