export type CreateOrderRequest = {
  user_id: string;
  product_id: string;
  quantity: number;
  customization?: object | null;
  coupon_id?: string | null;
  final_price: number;
};