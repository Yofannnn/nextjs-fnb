import { PaymentDetail } from "@/features/payment/types/payment.type";
import { ApiResponse } from "@/lib/types/api-response.type";

export type InitiatePaymentApiResponse = ApiResponse<{ id: string; redirectUrl: string | null; snapToken: string | null }>;
export type PaymentApiResponse = ApiResponse<{ id: string; orderId: string }>;
export type GetPaymentDetailApiResponse = ApiResponse<PaymentDetail>;
