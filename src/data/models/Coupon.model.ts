import { CouponStatus, CouponType } from "../types/coupon.type";

export default interface CouponModel {
  id: string;
  product_id?: string;
  code: string;
  type: CouponType;
  percentage?: number;
  fixed_value?: number;
  quantity: number;
  minimum_value: number;
  status: CouponStatus;
  apply_to_category: boolean;
  updated_at: Date;
  valid_until: Date;
};