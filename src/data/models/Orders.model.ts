import { OrderStatusType } from "../types/order.type";
import ProductModel from "./Product.model";

export default interface OrderModel {
  id: string;
  user_id: string;
  product_id: string;
  product?: ProductModel;
  quantity: number;
  customization?: object | null;
  final_price: number;
  status: OrderStatusType | string;
  created_at: Date;
  updated_at: Date;
};