import { BaseProduct } from "./cart-products.type";

export type CouponStatus = 'active' | 'expired';
export type CouponType = 'percentage' | 'fixed' | 'free_shipping';

export type AppliedCoupon = {
  coupon_id: string;
  coupon_type: CouponType;
  coupon_percentage_value?: number;
  coupon_fixed_value?: number;
  applied_discount?: boolean;
  product?: BaseProduct;
  quantity?: number,
  discount_price?: number,
  final_price?: number,
  message?: string,
}