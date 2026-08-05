import { getProductByIdAction } from "@/app/actions/products.action";
import CouponModel from "../models/Coupon.model";
import { CartProductItem } from "../types/cart-products.type";
import { AppliedCoupon } from "../types/coupon.type";

interface applyCouponProps {
  coupon: CouponModel;
  cartItems: CartProductItem[];
}

export async function applyCoupon({ coupon, cartItems }: applyCouponProps) {
  const result: AppliedCoupon[] = [];

  for (const item of cartItems) {
    if (coupon.product_id === null || coupon.product_id === undefined) {
      if (coupon.type === 'percentage' && coupon.percentage && (item.product.price + item.product.customizationPrice) >= coupon.minimum_value) {
        const finalPrice = Number(((item.product.price + item.product.customizationPrice) * item.quantity).toFixed(2));
        const discountPrice = Number((finalPrice * (coupon.percentage / 100)).toFixed(2));

        result.push({
          coupon_id: coupon.id,
          coupon_type: coupon.type,
          applied_discount: true,
          product: item.product,
          discount_price: discountPrice,
          final_price: finalPrice - discountPrice,
          quantity: item.quantity,
        });
      } else if (coupon.type === 'fixed' && coupon.fixed_value && (item.product.price + item.product.customizationPrice) >= coupon.minimum_value) {
        const finalPrice = Number(((item.product.price + item.product.customizationPrice) * item.quantity).toFixed(2));
        const discountPrice = coupon.fixed_value;

        result.push({
          coupon_id: coupon.id,
          coupon_type: coupon.type,
          applied_discount: true,
          product: item.product,
          discount_price: discountPrice,
          final_price: finalPrice - discountPrice,
          quantity: item.quantity,
        });
      } else if (coupon.type === 'free_shipping' && (item.product.price + item.product.customizationPrice) >= coupon.minimum_value) {
        result.push({
          coupon_id: coupon.id,
          coupon_type: coupon.type,
          applied_discount: true,
          product: item.product,
        });
      } else {
        result.push({
          coupon_id: coupon.id,
          coupon_type: coupon.type,
          applied_discount: false,
          product: item.product,
          message: "O valor final do produto é inferior ao valor mínimo do cupom",
        });
      }
    } else {
      const cartDbProduct = await getProductByIdAction(item.product.id);
      const coupomDbProduct = await getProductByIdAction(coupon.product_id);

      if (coupon.type === 'percentage' && coupon.percentage && (item.product.price + item.product.customizationPrice) >= coupon.minimum_value) {
        const finalPrice = Number(((item.product.price + item.product.customizationPrice) * item.quantity).toFixed(2));
        const discountPrice = Number((finalPrice * (coupon.percentage / 100)).toFixed(2));

        if (coupon.apply_to_category) {
          if (coupomDbProduct.category_id === cartDbProduct.category_id) {
            result.push({
              coupon_id: coupon.id,
              coupon_type: coupon.type,
              applied_discount: true,
              product: item.product,
              discount_price: discountPrice,
              final_price: finalPrice - discountPrice,
              quantity: item.quantity,
            });
          } else {
            result.push({
              coupon_id: coupon.id,
              coupon_type: coupon.type,
              applied_discount: false,
              product: item.product,
            });
          }
        } else if (coupon.product_id === item.product.id) {
          result.push({
            coupon_id: coupon.id,
            coupon_type: coupon.type,
            applied_discount: true,
            product: item.product,
            discount_price: discountPrice,
            final_price: finalPrice - discountPrice,
            quantity: item.quantity,
          });
        }
      } else if (coupon.type === 'fixed' && coupon.fixed_value && (item.product.price + item.product.customizationPrice) >= coupon.minimum_value) {
        const finalPrice = Number(((item.product.price + item.product.customizationPrice) * item.quantity).toFixed(2));
        const discountPrice = coupon.fixed_value;

        if (coupon.apply_to_category) {
          if (coupomDbProduct.category_id === cartDbProduct.category_id) {
            result.push({
              coupon_id: coupon.id,
              coupon_type: coupon.type,
              applied_discount: true,
              product: item.product,
              discount_price: discountPrice,
              final_price: finalPrice - discountPrice,
              quantity: item.quantity,
            });
          } else {
            result.push({
              coupon_id: coupon.id,
              coupon_type: coupon.type,
              applied_discount: false,
              product: item.product,
            });
          }
        } else if (coupon.product_id === item.product.id) {
          result.push({
            coupon_id: coupon.id,
            coupon_type: coupon.type,
            applied_discount: true,
            product: item.product,
            discount_price: discountPrice,
            final_price: finalPrice - discountPrice,
            quantity: item.quantity,
          });
        }
      } else if (coupon.type === 'free_shipping' && (item.product.price + item.product.customizationPrice) >= coupon.minimum_value) {
        if (coupon.apply_to_category) {
          if (coupomDbProduct.category_id === cartDbProduct.category_id) {
            result.push({
              coupon_id: coupon.id,
              coupon_type: coupon.type,
              applied_discount: true,
              product: item.product,
            });
          } else {
            result.push({
              coupon_id: coupon.id,
              coupon_type: coupon.type,
              applied_discount: false,
              product: item.product,
            });
          }
        } else if (coupon.product_id === item.product.id) {
          result.push({
            coupon_id: coupon.id,
            coupon_type: coupon.type,
            applied_discount: true,
            product: item.product,
          });
        }
      } else {
        result.push({
          coupon_id: coupon.id,
          coupon_type: coupon.type,
          applied_discount: false,
          product: item.product,
        });
      }
    }
  }

  return result;
}