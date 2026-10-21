import { PaymentMethod, PaymentStatus } from "@/features/payment/types/payment.type";
import { Location } from "@/lib/types/location.type";

export enum DeliveryType {
  DELIVERY = "DELIVERY",
  PICKUP = "PICKUP",
}

export enum OrderType {
  RESERVATION = "RESERVATION",
  ONLINE = "ONLINE",
  DINEIN = "DINEIN",
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PREPARING = "PREPARING",
  READY = "READY",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  REJECTED = "REJECTED",
}

export interface OrderItem {
  productId: string;
  productName: string;
  priceSnapshot: number;
  quantity: number;
  note: string | null;
}

export interface OrderItemDetail extends OrderItem {
  imageUrl: string | null;
}

export interface OrderPaymentInfo {
  status: PaymentStatus;
  method: PaymentMethod | null;
  paidAt: Date | null;
  transactionId: string | null;
}

export interface OrderPricing {
  subtotal: number;
  tax: number;
  serviceCharge: number;
  discount: number;
  total: number;
  deliveryFee: number;
}

export interface OrderCustomerAsMember {
  memberId: string | null;
}

export interface OrderCustomerAsGuest {
  guestName: string | null;
  guestEmail: string | null;
}

export type OrderCustomer = OrderCustomerAsMember | OrderCustomerAsGuest;

export interface OnlineOrderFulfillmentInfo {
  deliveryType: DeliveryType;
  deliveryLocation: Location | null;
  scheduledAt: Date | null;
}

export interface OnlineOrderDetail {
  id: string;
  type: OrderType.ONLINE;
  customer: OrderCustomer;
  fulfillment: OnlineOrderFulfillmentInfo;
  items: OrderItemDetail[];
  payment: OrderPaymentInfo;
  pricing: OrderPricing;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum ReservationStatus {
  BOOKED = "BOOKED",
  SEATED = "SEATED",
  NO_SHOW = "NO_SHOW",
  CANCELLED = "CANCELLED",
}

export interface ReservationOrderFulfillmentInfo {
  tableId: string;
  reservedAt: Date;
  partySize: number;
  durationInMinutes: number;
  reservationStatus: ReservationStatus;
  notes: string | null;
}

export interface ReservationOrderDetail {
  id: string;
  type: OrderType.RESERVATION;
  customer: OrderCustomer;
  fulfillment: ReservationOrderFulfillmentInfo;
  items: OrderItemDetail[];
  payment: OrderPaymentInfo;
  pricing: OrderPricing;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface DineInOrderFulfillmentInfo {
  tableId: string;
  tableNumber: string;
  guestCount: number;
  cashierSessionId: string | null;
}

export interface DineInOrderDetail {
  id: string;
  type: OrderType.DINEIN;
  fulfillment: DineInOrderFulfillmentInfo;
  items: OrderItemDetail[];
  payment: OrderPaymentInfo;
  pricing: OrderPricing;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderSummary {
  id: string;
  type: OrderType;
  status: OrderStatus;
  itemCount: number;
  total: number;
  createdAt: Date;
}

export interface BrowseOrdersFilter {
  type: OrderType;
  status?: OrderStatus;
  sort?: string;
}
