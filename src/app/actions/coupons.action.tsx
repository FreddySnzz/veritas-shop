'use server';

import { serializeFirestoreData } from "@/data/functions/firebaseSerialize";
import { revalidatePath } from "next/cache";
import { 
  createCoupon, 
  deleteCoupon, 
  getAllCoupons, 
  getCouponByCode, 
  getCouponById, 
  updateCoupon 
} from "@/data/services/coupon.service";
import CouponModel from "@/data/models/Coupon.model";
import { formatDateByFirebase } from "@/data/functions/formatDate";

export async function getAllCouponsAction() {
  try {
    const coupons = await getAllCoupons();
    return serializeFirestoreData(coupons);
  } catch (error) {
    console.error("Erro ao buscar todos os cupons:", error);
    throw error;
  }
}

export async function getCouponByCodeAction(code: string) {
  try {
    const coupons = await getCouponByCode(code);
    return serializeFirestoreData(coupons);
  } catch (error) {
    console.error("Erro ao buscar cupom por código:", error);
    throw error;
  }
}

export async function getCouponByIdAction(id: string) {
  try {
    const coupon = await getCouponById(id);
    return serializeFirestoreData(coupon);
  } catch (error) {
    console.error("Erro ao buscar cupom por id:", error);
    throw error;
  }
}

export async function validateCouponAction(code: string) {
  try {
    const coupons = await getCouponByCodeAction(code);

    if (coupons && coupons.length > 0) {
      const updatedCoupons = await Promise.all(coupons.map(async (coupon: CouponModel) => {
        const currentDate = new Date();
        const isCouponDateInvalid = formatDateByFirebase(coupon.valid_until) < formatDateByFirebase(currentDate);

        if (isCouponDateInvalid && coupon.status === 'active') {
          await updateCoupon(
            coupon.id,
            { status: 'expired' } as CouponModel
          )
          return { ...coupon, status: 'expired' };
        }

        if (isCouponDateInvalid || coupon.status === 'expired') throw new Error("Cupom expirado.");
        if (coupon.quantity === 0) throw new Error("Cupom expirado.");

        return coupon;
      }));

      return serializeFirestoreData(updatedCoupons);
    }

    return serializeFirestoreData([]);
  } catch (error) {
    console.error("Erro ao validar cupom:", error);
    throw error;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createCouponAction(data: any) {
  try {
    const coupon = await createCoupon(data);
    revalidatePath('/admin/cupons');
    return serializeFirestoreData(coupon);
  } catch (error) {
    console.error("Erro ao criar cupom:", error);
    throw error;
  }
}

export async function updateCouponAction(
  id: string, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
) {
  try {
    const coupon = await updateCoupon(id, data);
    revalidatePath('/admin/cupons');
    return serializeFirestoreData(coupon);
  } catch (error) {
    console.error("Erro ao atualizar cupom:", error);
    throw error;
  }
}

export async function deleteCouponAction(id: string) {
  try {
    await deleteCoupon(id);
    revalidatePath('/admin/cupons');
  } catch (error) {
    console.error("Erro ao excluir cupom:", error);
  }
}