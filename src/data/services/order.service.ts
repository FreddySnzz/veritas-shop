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
import OrderModel from "../models/Orders.model";
import { getUserById } from "./user.service";
import { getProductById } from "./product.service";
import { OrderStatus } from "../types/enums/orders.enum";
import { CreateOrderRequest } from "../types/order.type";
import { generateOrderNumber } from "../functions/generateOrderNumber";

export class OrderServiceError extends Error {
  status: number;
  constructor(
    message: string, 
    status = 400
  ) {
    super(message);
    this.status = status;
  };
};

export async function getAllOrdersByUser(
  userId: string
): Promise<OrderModel[] | null> {
  const ordersRef = collection(db, Collections.ORDERS_COLLECTION);
  
  const refQuery = query(ordersRef, where("user_id", "==", userId));
  const refSnap = await getDocs(refQuery);

  return refSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as OrderModel[];
};

export async function getAllOrders(): Promise<OrderModel[] | null> {
  const q = query(collection(
    db, 
    Collections.ORDERS_COLLECTION
  ));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    } as OrderModel;
  });
};

export async function getOrderById(
  id: string
): Promise<OrderModel | null> {
  const docSnap = await getDoc(
    doc(db, Collections.ORDERS_COLLECTION, id)
  );
  
  const data = docSnap.exists() ? (
    docSnap.data() as OrderModel
  ) : null;
  
  if (data === null) throw new OrderServiceError(
    "Order not exists", 404
  );

  return data;
};

export async function getOrderByOrderNumber(
  orderNumber: string
): Promise<OrderModel[] | null> {
  const orderRef = collection(db, Collections.ORDERS_COLLECTION);
  
  const refQuery = query(orderRef, where("order_number", "==", orderNumber));
  const refSnap = await getDocs(refQuery);

  return refSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as OrderModel[];
};

export async function createOrder(
  data: CreateOrderRequest
): Promise<OrderModel> {
  const verifyUserExists = await getUserById(data.user_id);
  const verifyProductExists = await getProductById(data.product_id);

  if (!verifyUserExists || !verifyProductExists) {
    throw new OrderServiceError("User or product not exists", 400);
  };

  const orderNumber = generateOrderNumber();

  const newOrderData = {
    ...data,
    order_number: orderNumber,
    status: OrderStatus.AWAITING_CONFIRMATION,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const docRef = await addDoc(collection(
    db, 
    Collections.ORDERS_COLLECTION
  ), newOrderData);

  return { 
    ...data, 
    id: docRef.id 
  } as OrderModel;
};

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<OrderModel> {
  const docRef = doc(db, Collections.ORDERS_COLLECTION, orderId);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    throw new OrderServiceError("Order not exists", 404);
  };

  const updatedData = {
    ...docSnap.data(),
    status: status,
    updated_at: new Date(),
  };

  await updateDoc(docRef, updatedData);
  return updatedData as OrderModel;
};

export async function deleteOrder(id: string) {
  const docRef = doc(db, Collections.ORDERS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new OrderServiceError("Order not exists", 404);
  };

  await deleteDoc(docRef);
};