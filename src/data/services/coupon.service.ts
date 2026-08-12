import { db } from "../firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Collections } from "../types/collections.enum";
import { ProductServiceError } from "./product.service";
import CouponModel from "../models/Coupon.model";

export async function getAllCoupons(): Promise<CouponModel[] | null> {
  const q = query(collection(
    db, 
    Collections.COUPONS_COLLECTION
  ));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      ...data,
      minimum_value: data?.minimum_value / 100,
      fixed_value: data?.fixed_value / 100,
    } as CouponModel;
  });
}

export async function getCouponByCode(
  code: string
): Promise<CouponModel[]> {
  const couponRef = collection(db, Collections.COUPONS_COLLECTION);
  const codeQuery = query(couponRef, where("code", "==", code.toLocaleUpperCase()));
  const refSnap = await getDocs(codeQuery);

  return refSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    minimum_value: doc.data()?.minimum_value / 100,
    fixed_value: doc.data()?.fixed_value / 100,
  })) as CouponModel[];
}

export async function getCouponById(
  id: string
): Promise<CouponModel | null> {
  const docSnap = await getDoc(
    doc(db, Collections.COUPONS_COLLECTION, id)
  );
  
  const data = docSnap.exists() ? (
    docSnap.data() as CouponModel
  ) : null;
  
  if (data === null) throw new Error("Coupon not exists");

  return data;
};


export async function createCoupon(
  data: CouponModel
): Promise<CouponModel | Error> {
  const existingCoupons = await getCouponByCode(data.code);

  if (existingCoupons && existingCoupons.length > 0) {
    const currentDate = new Date();
    const isCouponDateValid = new Date(data.valid_until) < currentDate;

    const isCouponAlreadyActive = existingCoupons.some((coupon) => {
      const isActiveStatus = coupon.status === 'active';

      return isActiveStatus;
    });
    
    if (isCouponAlreadyActive) {
      throw new ProductServiceError("Coupon already exists", 400);
    }

    if (isCouponDateValid) {
      throw new ProductServiceError("Coupon already expired", 400);
    }
  }

  const docRef = await addDoc(collection(db, Collections.COUPONS_COLLECTION), data);

  if (data.minimum_value) data.minimum_value = data.minimum_value * 100;
  if (data.fixed_value) data.fixed_value = data.fixed_value * 100;

  return { 
    ...data, 
    id: docRef.id 
  };
}

export async function updateCoupon(
  id: string, 
  data: CouponModel
): Promise<CouponModel> {
  const docRef = doc(db, Collections.COUPONS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    throw new ProductServiceError("Coupon not exists", 400);
  };

  if (data.minimum_value) data.minimum_value = data.minimum_value * 100;
  if (data.fixed_value) data.fixed_value = data.fixed_value * 100;

  const updatedData = {
    ...docSnap.data(),
    ...data,
  };

  await updateDoc(docRef, updatedData);

  return updatedData;
}

export async function deleteCoupon(id: string) {
  const docRef = doc(db, Collections.COUPONS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new ProductServiceError("Coupon not exists", 400);
  };

  await deleteDoc(docRef);
}