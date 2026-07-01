'use server';

import { serializeFirestoreData } from "@/data/functions/firebaseSerialize";
import { 
  createOrder, 
  deleteOrder, 
  getAllOrders, 
  getAllOrdersByUser, 
  getOrderById,
  updateOrderStatus
} from "@/data/services/order.service";
import { OrderStatus } from "@/data/types/enums/orders.enum";
import { CreateOrderRequest } from "@/data/types/order.type";

export async function getAllOrdersByUserAction(userId: string) {
  try {
    const orders = await getAllOrdersByUser(userId);
    return serializeFirestoreData(orders);
  } catch (error) {
    console.error("Erro ao carregar pedidos:", error);
    return null;
  };
};

export async function getAllOrdersAdminAction() {
  try {
    const orders = await getAllOrders();
    return serializeFirestoreData(orders);
  } catch (error) {
    console.error("Erro ao carregar pedidos:", error);
    return null;
  };
};

export async function getOrderByIdAction(orderId: string) {
  try {
    const order = await getOrderById(orderId);
    return serializeFirestoreData(order);
  } catch (error) {
    console.error(`Erro ao carregar pedido ${orderId}:`, error);
    return null;
  };
};

export async function createOrderAction(data: CreateOrderRequest) {
  try {
    const order = await createOrder(data);
    return serializeFirestoreData(order);
  } catch (error) {
    console.error("Erro ao criar pedido (action):", error);
    return null;
  };
};

export async function updateOrderStatusAction(orderId: string, status: OrderStatus) {
  try {
    const order = await updateOrderStatus(orderId, status);
    return serializeFirestoreData(order);
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    return null;
  };
};

export async function deleteOrderAction(orderId: string) {
  try {
    await deleteOrder(orderId);
  } catch (error) {
    console.error("Erro ao excluir pedido:", error);
    return null;
  };
};