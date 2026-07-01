export type OrderStatusType = 
  'awaiting_payment' | 
  'production' | 
  'crafted' | 
  'completed' | 
  'cancelled';

export type CreateOrderRequest = {
  user_id: string;
  product_id: string;
  quantity: number;
  customization?: object | null;
  final_price: number;
};